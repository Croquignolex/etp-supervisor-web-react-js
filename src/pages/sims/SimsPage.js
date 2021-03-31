import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import {SIMS_PAGE} from "../../constants/pageNameConstants";
import {emitAllAgentsFetch} from "../../redux/agents/actions";
import LoaderComponent from "../../components/LoaderComponent";
import HeaderComponent from "../../components/HeaderComponent";
import SimNewContainer from "../../containers/sims/SimNewContainer";
import {emitAllCompaniesFetch} from "../../redux/companies/actions";
import {emitAllSimsTypesFetch} from "../../redux/simsTypes/actions";
import {emitAllOperatorsFetch} from "../../redux/operators/actions";
import AppLayoutContainer from "../../containers/AppLayoutContainer";
import {emitAllCollectorsFetch} from "../../redux/collectors/actions";
import ErrorAlertComponent from "../../components/ErrorAlertComponent";
import TableSearchComponent from "../../components/TableSearchComponent";
import {emitNextSimsFetch, emitSimsFetch} from "../../redux/sims/actions";
import SimsCardsComponent from "../../components/sims/SimsCardsComponent";
import FormModalComponent from "../../components/modals/FormModalComponent";
import SimDetailsContainer from "../../containers/sims/SimDetailsContainer";
import {storeAllAgentsRequestReset} from "../../redux/requests/agents/actions";
import {storeAllCompaniesRequestReset} from "../../redux/requests/companies/actions";
import {storeAllSimsTypesRequestReset} from "../../redux/requests/simsTypes/actions";
import {storeAllOperatorsRequestReset} from "../../redux/requests/operators/actions";
import {storeAllCollectorsRequestReset} from "../../redux/requests/collectors/actions";
import {storeNextSimsRequestReset, storeSimsRequestReset} from "../../redux/requests/sims/actions";
import {dateToString, needleSearch, requestFailed, requestLoading} from "../../functions/generalFunctions";

// Component
function SimsPage({sims, simsRequests, hasMoreData, page, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [newSimModal, setNewSimModal] = useState({show: false, header: ''});
    const [simDetailsModal, setSimDetailsModal] = useState({show: false, header: "DETAIL DE LA PUCE", id: ''});

    // Local effects
    useEffect(() => {
        dispatch(emitSimsFetch());
        dispatch(emitAllAgentsFetch());
        dispatch(emitAllCompaniesFetch());
        dispatch(emitAllSimsTypesFetch());
        dispatch(emitAllOperatorsFetch());
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
        dispatch(storeSimsRequestReset());
        dispatch(storeNextSimsRequestReset());
        dispatch(storeAllAgentsRequestReset());
        dispatch(storeAllCompaniesRequestReset());
        dispatch(storeAllSimsTypesRequestReset());
        dispatch(storeAllOperatorsRequestReset());
        dispatch(storeAllCollectorsRequestReset());
    };

    // Fetch next sims data to enhance infinite scroll
    const handleNextSimsData = () => {
        dispatch(emitNextSimsFetch({page}));
    }

    // Show new sim modal form
    const handleNewSimModalShow = () => {
        setNewSimModal({newSimModal, header: "NOUVELLE PUCE", show: true})
    }

    // Hide new sim modal form
    const handleNewSimModalHide = () => {
        setNewSimModal({...newSimModal, show: false})
    }

    // Show sim details modal form
    const handleSimDetailsModalShow = ({id}) => {
        setSimDetailsModal({...simDetailsModal, show: true, id})
    }

    // Hide sim details modal form
    const handleSimDetailsModalHide = () => {
        setSimDetailsModal({...simDetailsModal, show: false})
    }

    // Render
    return (
        <>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title={SIMS_PAGE} icon={'fa fa-sim-card'} />
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
                                            {requestFailed(simsRequests.list) && <ErrorAlertComponent message={simsRequests.list.message} />}
                                            {requestFailed(simsRequests.next) && <ErrorAlertComponent message={simsRequests.next.message} />}
                                            <button type="button"
                                                    className="btn btn-theme mr-2 mb-2"
                                                    onClick={handleNewSimModalShow}
                                            >
                                                <i className="fa fa-plus" /> Nouvelle puce
                                            </button>
                                            {/* Search result & Infinite scroll */}
                                            {(needle !== '' && needle !== undefined)
                                                ? <SimsCardsComponent sims={searchEngine(sims, needle)} handleSimDetailsModalShow={handleSimDetailsModalShow} />
                                                : (requestLoading(simsRequests.list) ? <LoaderComponent /> :
                                                        <InfiniteScroll hasMore={hasMoreData}
                                                                        dataLength={sims.length}
                                                                        next={handleNextSimsData}
                                                                        loader={<LoaderComponent />}
                                                                        style={{ overflow: 'hidden' }}
                                                        >
                                                            <SimsCardsComponent sims={sims} handleSimDetailsModalShow={handleSimDetailsModalShow} />
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
            <FormModalComponent modal={newSimModal} handleClose={handleNewSimModalHide}>
                <SimNewContainer handleClose={handleNewSimModalHide} />
            </FormModalComponent>
            <FormModalComponent small={true} modal={simDetailsModal} handleClose={handleSimDetailsModalHide}>
                <SimDetailsContainer id={simDetailsModal.id} />
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
                needleSearch(item.number, _needle) ||
                needleSearch(item.balance, _needle) ||
                needleSearch(item.type.name, _needle) ||
                needleSearch(item.agent.name, _needle) ||
                needleSearch(item.operator.name, _needle) ||
                needleSearch(dateToString(item.creation), _needle)
            )
        });
    }
    // Return data
    return data;
}

// Prop types to ensure destroyed props data type
SimsPage.propTypes = {
    sims: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    simsRequests: PropTypes.object.isRequired,
};

export default React.memo(SimsPage);