import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import {emitAllSimsFetch} from "../../redux/sims/actions";
import {emitAllAgentsFetch} from "../../redux/agents/actions";
import HeaderComponent from "../../components/HeaderComponent";
import LoaderComponent from "../../components/LoaderComponent";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import AppLayoutContainer from "../../containers/AppLayoutContainer";
import ErrorAlertComponent from "../../components/ErrorAlertComponent";
import TableSearchComponent from "../../components/TableSearchComponent";
import {storeAllSimsRequestReset} from "../../redux/requests/sims/actions";
import FormModalComponent from "../../components/modals/FormModalComponent";
import {storeAllAgentsRequestReset} from "../../redux/requests/agents/actions";
import {emitFleetsFetch, emitNextFleetsFetch} from "../../redux/fleets/actions";
import RequestsFleetsCardsComponent from "../../components/requests/RequestsFleetsCardsComponent";
import RequestsFleetsAddFleetContainer from "../../containers/requests/RequestsFleetsAddFleetContainer";
import {storeFleetsRequestReset, storeNextFleetsRequestReset} from "../../redux/requests/fleets/actions";
import {
    dateToString,
    needleSearch,
    requestFailed,
    requestLoading,
} from "../../functions/generalFunctions";

// Component
function RequestsFleetsPage({fleets, fleetsRequests, hasMoreData, page, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [fleetModal, setFleetModal] = useState({show: false, header: 'PASSER UNE DEMANDE DE FLOTTE'});

    // Local effects
    useEffect(() => {
        dispatch(emitFleetsFetch());
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
        dispatch(storeFleetsRequestReset());
        dispatch(storeAllSimsRequestReset());
        dispatch(storeAllAgentsRequestReset());
        dispatch(storeNextFleetsRequestReset());
    };

    // Fetch next fleets data to enhance infinite scroll
    const handleNextFleetsData = () => {
        dispatch(emitNextFleetsFetch({page}));
    }

    // Show fleet modal form
    const handleFleetModalShow = (item) => {
        setFleetModal({...fleetModal, item, show: true})
    }

    // Hide fleet modal form
    const handleFleetModalHide = () => {
        setFleetModal({...fleetModal, show: false})
    }

    // Render
    return (
        <>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title="Demandes de flottes" icon={'fa fa-rss'} />
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
                                            {requestFailed(fleetsRequests.list) && <ErrorAlertComponent message={fleetsRequests.list.message} />}
                                            {requestFailed(fleetsRequests.next) && <ErrorAlertComponent message={fleetsRequests.next.message} />}
                                            <button type="button"
                                                    className="btn btn-theme mb-2"
                                                    onClick={handleFleetModalShow}
                                            >
                                                <i className="fa fa-plus" /> Passe une demande de flotte
                                            </button>
                                            {/* Search result & Infinite scroll */}
                                            {(needle !== '' && needle !== undefined)
                                                ? <RequestsFleetsCardsComponent fleets={searchEngine(fleets, needle)} />
                                                : (requestLoading(fleetsRequests.list) ? <LoaderComponent /> :
                                                        <InfiniteScroll hasMore={hasMoreData}
                                                                        dataLength={fleets.length}
                                                                        next={handleNextFleetsData}
                                                                        loader={<LoaderComponent />}
                                                                        style={{ overflow: 'hidden' }}
                                                        >
                                                            <RequestsFleetsCardsComponent fleets={fleets} />
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
            <FormModalComponent modal={fleetModal} handleClose={handleFleetModalHide}>
                <RequestsFleetsAddFleetContainer handleClose={handleFleetModalHide} />
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
                needleSearch(item.sim.number, _needle) ||
                needleSearch(item.agent.name, _needle) ||
                needleSearch(dateToString(item.creation), _needle) ||
                needleSearch(fleetTypeBadgeColor(item.status).text, _needle)
            )
        });
    }
    // Return data
    return data;
}

// Prop types to ensure destroyed props data type
RequestsFleetsPage.propTypes = {
    page: PropTypes.number.isRequired,
    fleets: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    fleetsRequests: PropTypes.object.isRequired,
};

export default React.memo(RequestsFleetsPage);