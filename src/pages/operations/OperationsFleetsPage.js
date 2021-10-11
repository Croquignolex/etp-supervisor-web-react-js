import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import HeaderComponent from "../../components/HeaderComponent";
import LoaderComponent from "../../components/LoaderComponent";
import AppLayoutContainer from "../../containers/AppLayoutContainer";
import ErrorAlertComponent from "../../components/ErrorAlertComponent";
import {OPERATIONS_FLEETS_PAGE} from "../../constants/pageNameConstants";
import FormModalComponent from "../../components/modals/FormModalComponent";
import DeleteModelComponent from "../../components/modals/DeleteModalComponent";
import SupplyDetailsContainer from "../../containers/operations/SupplyDetailsContainer";
import TableSearchWithButtonComponent from "../../components/TableSearchWithButtonComponent";
import OperationsFleetsCardsComponent from "../../components/operations/OperationsFleetsCardsComponent";
import OperationsFleetsReturnContainer from "../../containers/operations/OperationsFleetsReturnContainer";
import OperationsCashRecoveryContainer from "../../containers/operations/OperationsCashRecoveryContainer";
import OperationsFleetsAddSupplyContainer from "../../containers/operations/OperationsFleetsAddSupplyContainer";
import OperationsFleetsAddAnonymousSupplyContainer from "../../containers/operations/OperationsFleetsAddAnonymousSupplyContainer";
import {
    applySuccess,
    dateToString,
    formatNumber,
    needleSearch,
    requestFailed,
    requestLoading,
    requestSucceeded
} from "../../functions/generalFunctions";
import {
    emitCancelSupply,
    emitSuppliesFetch,
    emitNextSuppliesFetch,
    emitSearchSuppliesFetch
} from "../../redux/supplies/actions";
import {
    storeSuppliesRequestReset,
    storeCancelSupplyRequestReset,
    storeNextSuppliesRequestReset
} from "../../redux/requests/supplies/actions";

// Component
function OperationsFleetsPage({supplies, suppliesRequests, hasMoreData, page, user, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [cancelModal, setCancelModal] = useState({show: false, body: '', id: 0});
    const [supplyModal, setSupplyModal] = useState({show: false, header: 'EFFECTUER UN FLOTTAGE'});
    const [returnModal, setReturnModal] = useState({show: false, header: 'EFFECTUER UN RETOUR FLOTTE', item: {}});
    const [anonymousSupplyModal, setAnonymousSupplyModal] = useState({show: false, header: 'EFFECTUER UN FLOTTAGE ANONYME'});
    const [recoveryModal, setRecoveryModal] = useState({show: false, header: "EFFECTUER UN RECOUVREMENT D'ESPECE", item: {}});
    const [supplyDetailsModal, setSupplyDetailsModal] = useState({show: false, header: "DETAIL DU FLOTTAGE AGENT", supply: ''});

    // Local effects
    useEffect(() => {
        dispatch(emitSuppliesFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Local effects
    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(suppliesRequests.cancel)) {
            applySuccess(suppliesRequests.cancel.message);
        }
        // eslint-disable-next-line
    }, [suppliesRequests.cancel]);

    const handleNeedleInput = (data) => {
        setNeedle(data)
    }

    const handleSearchInput = () => {
        dispatch(emitSearchSuppliesFetch({needle}));
    }

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeSuppliesRequestReset());
        dispatch(storeCancelSupplyRequestReset());
        dispatch(storeNextSuppliesRequestReset());
    };

    // Fetch next supplies data to enhance infinite scroll
    const handleNextSuppliesData = () => {
        dispatch(emitNextSuppliesFetch({page}));
    }

    // Show supply details modal form
    const handleSupplyDetailsModalShow = (supply) => {
        setSupplyDetailsModal({...supplyDetailsModal, show: true, supply})
    }

    // Hide supply details modal form
    const handleSupplyDetailsModalHide = () => {
        setSupplyDetailsModal({...supplyDetailsModal, show: false})
    }

    // Show supply modal form
    const handleSupplyModalShow = (item) => {
        setSupplyModal({...supplyModal, item, show: true})
    }

    // Hide supply modal form
    const handleSupplyModalHide = () => {
        setSupplyModal({...supplyModal, show: false})
    }

    // Show anonymous supply modal form
    const handleAnonymousSupplyModalShow = (item) => {
        setAnonymousSupplyModal({...anonymousSupplyModal, item, show: true})
    }

    // Hide anonymous supply modal form
    const handleAnonymousSupplyModalHide = () => {
        setAnonymousSupplyModal({...anonymousSupplyModal, show: false})
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

    // Show cancel modal form
    const handleCancelModalShow = ({id, amount, agent, sim_incoming}) => {
        setCancelModal({...cancelModal, id, body: `Annuler le flottage vers ${sim_incoming.number} de l'agent ${agent.name} de ${formatNumber(amount)}?`, show: true})
    }

    // Hide cancel modal form
    const handleCancelModalHide = () => {
        setCancelModal({...cancelModal, show: false})
    }

    // Trigger when clearance cancel confirmed on modal
    const handleCancel = (id) => {
        handleCancelModalHide();
        dispatch(emitCancelSupply({id}));
    };

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
                                                <TableSearchWithButtonComponent needle={needle}
                                                                                handleNeedle={handleNeedleInput}
                                                                                handleSearch={handleSearchInput}
                                                />
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            {/* Error message */}
                                            {requestFailed(suppliesRequests.list) && <ErrorAlertComponent message={suppliesRequests.list.message} />}
                                            {requestFailed(suppliesRequests.next) && <ErrorAlertComponent message={suppliesRequests.next.message} />}
                                            {requestFailed(suppliesRequests.cancel) && <ErrorAlertComponent message={suppliesRequests.cancel.message} />}
                                            <button type="button"
                                                    className="btn btn-theme mb-2"
                                                    onClick={handleSupplyModalShow}
                                            >
                                                <i className="fa fa-rss" /> Effectuer un flottage
                                            </button>
                                            <button type="button"
                                                    className="btn btn-theme mb-2 ml-2"
                                                    onClick={handleAnonymousSupplyModalShow}
                                            >
                                                <i className="fa fa-user-slash" /> Effectuer un flottage anonyme
                                            </button>
                                            {/* Search result & Infinite scroll */}
                                            {requestLoading(suppliesRequests.list) ? <LoaderComponent /> : ((needle !== '' && needle !== undefined) ?
                                                    (
                                                        <OperationsFleetsCardsComponent user={user}
                                                                                        supplies={searchEngine(supplies, needle)}
                                                                                        handleCancelModalShow={handleCancelModalShow}
                                                                                        handleFleetRecoveryModalShow={handleReturnModalShow}
                                                                                        handleCashRecoveryModalShow={handleRecoveryModalShow}
                                                                                        handleSupplyDetailsModalShow={handleSupplyDetailsModalShow}
                                                        />
                                                    ) :
                                                    (
                                                        <InfiniteScroll hasMore={hasMoreData}
                                                                        loader={<LoaderComponent />}
                                                                        dataLength={supplies.length}
                                                                        next={handleNextSuppliesData}
                                                                        style={{ overflow: 'hidden' }}
                                                        >
                                                            <OperationsFleetsCardsComponent  user={user}
                                                                                             supplies={supplies}
                                                                                             handleCancelModalShow={handleCancelModalShow}
                                                                                             handleFleetRecoveryModalShow={handleReturnModalShow}
                                                                                             handleCashRecoveryModalShow={handleRecoveryModalShow}
                                                                                             handleSupplyDetailsModalShow={handleSupplyDetailsModalShow}
                                                            />
                                                        </InfiniteScroll>
                                                    )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </AppLayoutContainer>
            {/* Modal */}
            <DeleteModelComponent modal={cancelModal}
                                  handleModal={handleCancel}
                                  handleClose={handleCancelModalHide}
            />
            <FormModalComponent modal={supplyDetailsModal} handleClose={handleSupplyDetailsModalHide}>
                <SupplyDetailsContainer supply={supplyDetailsModal.supply} />
            </FormModalComponent>
            <FormModalComponent modal={supplyModal} handleClose={handleSupplyModalHide}>
                <OperationsFleetsAddSupplyContainer handleClose={handleSupplyModalHide} />
            </FormModalComponent>
            <FormModalComponent modal={anonymousSupplyModal} handleClose={handleAnonymousSupplyModalHide}>
                <OperationsFleetsAddAnonymousSupplyContainer handleClose={handleAnonymousSupplyModalHide} />
            </FormModalComponent>
            <FormModalComponent modal={returnModal} handleClose={handleReturnModalHide}>
                <OperationsFleetsReturnContainer supply={returnModal.item} handleClose={handleReturnModalHide} />
            </FormModalComponent>
            <FormModalComponent modal={recoveryModal} handleClose={handleRecoveryModalHide}>
                <OperationsCashRecoveryContainer supply={recoveryModal.item} handleClose={handleRecoveryModalHide} />
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
                needleSearch(item.operator.name, _needle) ||
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
    user: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    supplies: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    suppliesRequests: PropTypes.object.isRequired,
};

export default React.memo(OperationsFleetsPage);
