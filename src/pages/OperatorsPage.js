import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import {OPERATORS} from "../constants/pageNameConstants";
import {emitAllAgentsFetch} from "../redux/agents/actions";
import HeaderComponent from "../components/HeaderComponent";
import LoaderComponent from "../components/LoaderComponent";
import {emitAllCompaniesFetch} from "../redux/companies/actions";
import {emitAllSimsTypesFetch} from "../redux/simsTypes/actions";
import AppLayoutContainer from "../containers/AppLayoutContainer";
import {emitAllCollectorsFetch} from "../redux/collectors/actions";
import ErrorAlertComponent from "../components/ErrorAlertComponent";
import TableSearchComponent from "../components/TableSearchComponent";
import FormModalComponent from "../components/modals/FormModalComponent";
import {storeAllAgentsRequestReset} from "../redux/requests/agents/actions";
import OperatorNewContainer from "../containers/operators/OperatorNewContainer";
import {storeAllSimsTypesRequestReset} from "../redux/requests/simsTypes/actions";
import {storeAllCompaniesRequestReset} from "../redux/requests/companies/actions";
import {storeAllCollectorsRequestReset} from "../redux/requests/collectors/actions";
import OperatorsCardsComponent from "../components/operators/OperatorsCardsComponent";
import {emitNextOperatorsFetch, emitOperatorsFetch} from "../redux/operators/actions";
import OperatorDetailsContainer from "../containers/operators/OperatorDetailsContainer";
import {dateToString, needleSearch, requestFailed, requestLoading} from "../functions/generalFunctions";
import {storeNextOperatorsRequestReset, storeOperatorsRequestReset} from "../redux/requests/operators/actions";

// Component
function OperatorsPage({operators, operatorsRequests, hasMoreData, page, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [newOperatorModal, setNewOperatorModal] = useState({show: false, header: ''});
    const [operatorDetailsModal, setOperatorDetailsModal] = useState({show: false, header: "DETAIL DE L'OPERATEEUR", id: ''});

    // Local effects
    useEffect(() => {
        dispatch(emitOperatorsFetch());
        dispatch(emitAllAgentsFetch());
        dispatch(emitAllCompaniesFetch());
        dispatch(emitAllSimsTypesFetch());
        dispatch(emitAllCollectorsFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    const handleNeedleInput = (data) => {
        setNeedle(data)
    }

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeOperatorsRequestReset());
        dispatch(storeAllAgentsRequestReset());
        dispatch(storeAllCompaniesRequestReset());
        dispatch(storeAllSimsTypesRequestReset());
        dispatch(storeAllCollectorsRequestReset());
        dispatch(storeNextOperatorsRequestReset());
    };

    // Fetch next operators data to enhance infinite scroll
    const handleNextOperatorsData = () => {
        dispatch(emitNextOperatorsFetch({page}));
    }

    // Show new operator modal form
    const handleNewOperatorModalShow = () => {
        setNewOperatorModal({newOperatorModal, header: "NOUVEL OPERATEUR", show: true})
    }

    // Hide new operator modal form
    const handleNewOperatorModalHide = () => {
        setNewOperatorModal({...newOperatorModal, show: false})
    }

    // Show operator details modal form
    const handleOperatorDetailsModalShow = ({id}) => {
        setOperatorDetailsModal({...operatorDetailsModal, show: true, id})
    }

    // Hide operator details modal form
    const handleOperatorDetailsModalHide = () => {
        setOperatorDetailsModal({...operatorDetailsModal, show: false})
    }

    // Render
    return (
        <>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title={OPERATORS} icon={'fa fa-globe'} />
                    <section className="content">
                        <div className='container-fluid'>
                            <div className="row">
                                <div className="col-12">
                                    <div className="card custom-card-outline">
                                        {/* Search input */}
                                        <div className="card-header">
                                            <div className="card-tools">
                                                <TableSearchComponent needle={needle} handleNeedle={handleNeedleInput} />
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            {/* Error message */}
                                            {requestFailed(operatorsRequests.list) && <ErrorAlertComponent message={operatorsRequests.list.message} />}
                                            {requestFailed(operatorsRequests.next) && <ErrorAlertComponent message={operatorsRequests.next.message} />}
                                            <button type="button"
                                                    className="btn btn-theme mr-2 mb-2"
                                                    onClick={handleNewOperatorModalShow}
                                            >
                                                <i className="fa fa-plus" /> Nouvel opérateur
                                            </button>
                                            {/* Search result & Infinite scroll */}
                                            {(needle !== '' && needle !== undefined)
                                                ? <OperatorsCardsComponent operators={searchEngine(operators, needle)}
                                                                           handleOperatorDetailsModalShow={handleOperatorDetailsModalShow}
                                                />
                                                : (requestLoading(operatorsRequests.list) ? <LoaderComponent /> :
                                                        <InfiniteScroll hasMore={hasMoreData}
                                                                        loader={<LoaderComponent />}
                                                                        dataLength={operators.length}
                                                                        next={handleNextOperatorsData}
                                                                        style={{ overflow: 'hidden' }}
                                                        >
                                                            <OperatorsCardsComponent operators={operators}
                                                                                     handleOperatorDetailsModalShow={handleOperatorDetailsModalShow}
                                                            />
                                                        </InfiniteScroll>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </AppLayoutContainer>
            {/* Modal */}
            <FormModalComponent modal={newOperatorModal} handleClose={handleNewOperatorModalHide}>
                <OperatorNewContainer handleClose={handleNewOperatorModalHide} />
            </FormModalComponent>
            <FormModalComponent modal={operatorDetailsModal} handleClose={handleOperatorDetailsModalHide}>
                <OperatorDetailsContainer id={operatorDetailsModal.id} />
            </FormModalComponent>
        </>
    )
}

// Search engine
function searchEngine(data, _needle) {
    // Avoid empty filtering
    if(_needle !== '' && _needle !== undefined) {
        // Filter
        data = data.filter((item) => {
            return (
                needleSearch(item.name, _needle) ||
                needleSearch(item.sims, _needle) ||
                needleSearch(dateToString(item.creation), _needle)
            )
        });
    }
    // Return data
    return data;
}

// Prop types to ensure destroyed props data type
OperatorsPage.propTypes = {
    page: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    operators: PropTypes.array.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    operatorsRequests: PropTypes.object.isRequired,
};

export default React.memo(OperatorsPage);