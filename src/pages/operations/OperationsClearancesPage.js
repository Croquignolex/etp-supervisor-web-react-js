import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import {emitAllSimsFetch} from "../../redux/sims/actions";
import {emitAllAgentsFetch} from "../../redux/agents/actions";
import HeaderComponent from "../../components/HeaderComponent";
import LoaderComponent from "../../components/LoaderComponent";
import AppLayoutContainer from "../../containers/AppLayoutContainer";
import ErrorAlertComponent from "../../components/ErrorAlertComponent";
import TableSearchComponent from "../../components/TableSearchComponent";
import {storeAllSimsRequestReset} from "../../redux/requests/sims/actions";
import FormModalComponent from "../../components/modals/FormModalComponent";
import {OPERATIONS_CLEARANCES_PAGE} from "../../constants/pageNameConstants";
import {storeAllAgentsRequestReset} from "../../redux/requests/agents/actions";
import {emitNextRefuelsFetch, emitRefuelsFetch} from "../../redux/refuels/actions";
import {dateToString, needleSearch, requestFailed, requestLoading} from "../../functions/generalFunctions";
import {storeRefuelsRequestReset, storeNextRefuelsRequestReset} from "../../redux/requests/refuels/actions";
import OperationsClearancesCardsComponent from "../../components/operations/OperationsClearancesCardsComponent";
import OperationsClearancesAddRefuelContainer from "../../containers/operations/OperationsClearancesAddRefuelContainer";

// Component
function OperationsClearancesPage({refuels, refuelsRequests, hasMoreData, page, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [refuelModal, setRefuelModal] = useState({show: false, header: 'EFFECTUER UN DESTOCKAGE'});

    // Local effects
    useEffect(() => {
        dispatch(emitRefuelsFetch());
        dispatch(emitAllSimsFetch());
        dispatch(emitAllAgentsFetch());
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
        dispatch(storeRefuelsRequestReset());
        dispatch(storeAllSimsRequestReset());
        dispatch(storeAllAgentsRequestReset());
        dispatch(storeNextRefuelsRequestReset());
    };

    // Fetch next refuels data to enhance infinite scroll
    const handleNextRefuelsData = () => {
        dispatch(emitNextRefuelsFetch({page}));
    }

    // Show refuel modal form
    const handleRefuelModalShow = (item) => {
        setRefuelModal({...refuelModal, item, show: true})
    }

    // Hide refuel modal form
    const handleRefuelModalHide = () => {
        setRefuelModal({...refuelModal, show: false})
    }

    // Render
    return (
        <>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title={OPERATIONS_CLEARANCES_PAGE} icon={'fa fa-rss-square'} />
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
                                            {requestFailed(refuelsRequests.list) && <ErrorAlertComponent message={refuelsRequests.list.message} />}
                                            {requestFailed(refuelsRequests.next) && <ErrorAlertComponent message={refuelsRequests.next.message} />}
                                            <button type="button"
                                                    className="btn btn-theme mb-2"
                                                    onClick={handleRefuelModalShow}
                                            >
                                                <i className="fa fa-plus" /> Effectuer un déstockage
                                            </button>
                                            {/* Search result & Infinite scroll */}
                                            {(needle !== '' && needle !== undefined)
                                                ? <OperationsClearancesCardsComponent refuels={searchEngine(refuels, needle)} />
                                                : (requestLoading(refuelsRequests.list) ? <LoaderComponent /> :
                                                        <InfiniteScroll hasMore={hasMoreData}
                                                                        dataLength={refuels.length}
                                                                        loader={<LoaderComponent />}
                                                                        next={handleNextRefuelsData}
                                                                        style={{ overflow: 'hidden' }}
                                                        >
                                                            <OperationsClearancesCardsComponent refuels={refuels} />
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
            <FormModalComponent modal={refuelModal} handleClose={handleRefuelModalHide}>
                <OperationsClearancesAddRefuelContainer handleClose={handleRefuelModalHide} />
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
                needleSearch(item.amount, _needle) ||
                needleSearch(item.sim.number, _needle) ||
                needleSearch(item.agent.name, _needle) ||
                needleSearch(dateToString(item.creation), _needle)
            )
        });
    }
    // Return data
    return data;
}

// Prop types to ensure destroyed props data type
OperationsClearancesPage.propTypes = {
    page: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    refuels: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    refuelsRequests: PropTypes.object.isRequired,
};

export default React.memo(OperationsClearancesPage);