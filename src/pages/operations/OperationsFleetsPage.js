import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import {emitAllSimsFetch} from "../../redux/sims/actions";
import {emitAllAgentsFetch} from "../../redux/agents/actions";
import HeaderComponent from "../../components/HeaderComponent";
import LoaderComponent from "../../components/LoaderComponent";
import AppLayoutContainer from "../../containers/AppLayoutContainer";
import ErrorAlertComponent from "../../components/ErrorAlertComponent";
import {OPERATIONS_FLEETS_PAGE} from "../../constants/pageNameConstants";
import TableSearchComponent from "../../components/TableSearchComponent";
import {storeAllSimsRequestReset} from "../../redux/requests/sims/actions";
import FormModalComponent from "../../components/modals/FormModalComponent";
import {storeAllAgentsRequestReset} from "../../redux/requests/agents/actions";
import {emitNextSuppliesFetch, emitSuppliesFetch} from "../../redux/supplies/actions";
import OperationsFleetsCardsComponent from "../../components/operations/OperationsFleetsCardsComponent";
import OperationsFleetsReturnContainer from "../../containers/operations/OperationsFleetsReturnContainer";
import OperationsCashRecoveryContainer from "../../containers/operations/OperationsCashRecoveryContainer";
import {storeNextSuppliesRequestReset, storeSuppliesRequestReset} from "../../redux/requests/supplies/actions";
import {
    dateToString,
    needleSearch,
    requestFailed,
    requestLoading,
} from "../../functions/generalFunctions";

// Component
function OperationsFleetsPage({supplies, suppliesRequests, hasMoreData, page, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [returnModal, setReturnModal] = useState({show: false, header: 'EFFECTUER UN RETOUR FLOTTE', item: {}});
    const [recoveryModal, setRecoveryModal] = useState({show: false, header: "EFFECTUER UN RECOUVREMENT D'ESPECE", item: {}});

    // Local effects
    useEffect(() => {
        dispatch(emitSuppliesFetch());
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
        dispatch(storeAllSimsRequestReset());
        dispatch(storeSuppliesRequestReset());
        dispatch(storeAllAgentsRequestReset());
        dispatch(storeNextSuppliesRequestReset());
    };

    // Fetch next supplies data to enhance infinite scroll
    const handleNextSuppliesData = () => {
        dispatch(emitNextSuppliesFetch({page}));
    }

    // Show return modal form
    const handleReturnModalShow = (item) => {
        setReturnModal({...returnModal, item, show: true})
    }

    // Hide return modal form
    const handleReturnModalHide = () => {
        setReturnModal({...returnModal, show: false})
    }

    // Show recovery modal form
    const handleRecoveryModalShow = (item) => {
        setRecoveryModal({...recoveryModal, item, show: true})
    }

    // Hide recovery modal form
    const handleRecoveryModalHide = () => {
        setRecoveryModal({...recoveryModal, show: false})
    }

    // Render
    return (
        <>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title={OPERATIONS_FLEETS_PAGE} icon={'fa fa-rss'} />
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
                                            {requestFailed(suppliesRequests.list) && <ErrorAlertComponent message={suppliesRequests.list.message} />}
                                            {requestFailed(suppliesRequests.next) && <ErrorAlertComponent message={suppliesRequests.next.message} />}
                                            {/* Search result & Infinite scroll */}
                                            {(needle !== '' && needle !== undefined)
                                                ? <OperationsFleetsCardsComponent supplies={searchEngine(supplies, needle)}
                                                                                  handleCashRecoveryModalShow={handleRecoveryModalShow}
                                                                                  handleFleetRecoveryModalShow={handleReturnModalShow}
                                                />
                                                : (requestLoading(suppliesRequests.list) ? <LoaderComponent /> :
                                                        <InfiniteScroll hasMore={hasMoreData}
                                                                        loader={<LoaderComponent />}
                                                                        dataLength={supplies.length}
                                                                        next={handleNextSuppliesData}
                                                                        style={{ overflow: 'hidden' }}
                                                        >
                                                            <OperationsFleetsCardsComponent supplies={supplies}
                                                                                            handleCashRecoveryModalShow={handleRecoveryModalShow}
                                                                                            handleFleetRecoveryModalShow={handleReturnModalShow}
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
            <FormModalComponent modal={returnModal} handleClose={handleReturnModalHide}>
                <OperationsFleetsReturnContainer supply={returnModal.item}
                                                 handleClose={handleReturnModalHide}
                />
            </FormModalComponent>
            <FormModalComponent modal={recoveryModal} handleClose={handleRecoveryModalHide}>
                <OperationsCashRecoveryContainer supply={recoveryModal.item}
                                                 handleClose={handleRecoveryModalHide}
                />
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
                needleSearch(item.remaining, _needle) ||
                needleSearch(item.agent.name, _needle) ||
                needleSearch(item.supplier.name, _needle) ||
                needleSearch(item.sim_incoming.number, _needle) ||
                needleSearch(item.sim_outgoing.number, _needle) ||
                needleSearch(dateToString(item.creation), _needle)
            )
        });
    }
    // Return data
    return data;
}

// Prop types to ensure destroyed props data type
OperationsFleetsPage.propTypes = {
    page: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    supplies: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    suppliesRequests: PropTypes.object.isRequired,
};

export default React.memo(OperationsFleetsPage);