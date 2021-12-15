import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import HeaderComponent from "../../components/HeaderComponent";
import LoaderComponent from "../../components/LoaderComponent";
import {agentTypeBadgeColor} from "../../functions/typeFunctions";
import AppLayoutContainer from "../../containers/AppLayoutContainer";
import ErrorAlertComponent from "../../components/ErrorAlertComponent";
import ResourceNewContainer from "../../containers/resources/ResourceNewContainer";
import FormModalComponent from "../../components/modals/FormModalComponent";
import BlockModalComponent from "../../components/modals/BlockModalComponent";
import ResourcesCardsComponent from "../../components/resources/ResourcesCardsComponent";
import ResourceDetailsContainer from "../../containers/resources/ResourceDetailsContainer";
import TableSearchWithButtonComponent from "../../components/TableSearchWithButtonComponent";
import {
    storeResourcesRequestReset,
    storeNextResourcesRequestReset,
    storeResourceStatusToggleRequestReset
} from "../../redux/requests/resources/actions";
import {
    applySuccess,
    dateToString,
    needleSearch,
    requestFailed,
    requestLoading,
    requestSucceeded
} from "../../functions/generalFunctions";
import {
    emitResourcesFetch,
    emitNextResourcesFetch,
    emitSearchResourcesFetch,
    emitToggleResourceStatus
} from "../../redux/resources/actions";

// Component
function ResourcesPage({resources, resourcesRequests, hasMoreData, page, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [blockModal, setBlockModal] = useState({show: false, body: '', id: 0});
    const [newResourceModal, setNewResourceModal] = useState({show: false, header: '', type: ''});
    const [agentDetailsModal, setResourceDetailsModal] = useState({show: false, header: '', id: ''});

    // Local effects
    useEffect(() => {
        dispatch(emitResourcesFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Local effects
    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(resourcesRequests.status)) {
            applySuccess(resourcesRequests.status.message);
        }
        // eslint-disable-next-line
    }, [resourcesRequests.status]);

    const handleNeedleInput = (data) => {
        setNeedle(data)
    }

    const handleSearchInput = () => {
        dispatch(emitSearchResourcesFetch({needle}));
    }

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeResourcesRequestReset());
        dispatch(storeNextResourcesRequestReset());
        dispatch(storeResourceStatusToggleRequestReset());
    };

    // Fetch next resources data to enhance infinite scroll
    const handleNextResourcesData = () => {
        dispatch(emitNextResourcesFetch({page}));
    }

    // Show new agent modal form
    const handleNewResourceModalShow = () => {
        setNewResourceModal({newResourceModal, header: "NOUVEL AGENT", show: true})
    }

    // Hide new agent modal form
    const handleNewResourceModalHide = () => {
        setNewResourceModal({...newResourceModal, show: false})
    }

    // Show agent details modal form
    const handleResourceDetailsModalShow = ({id, name}) => {
        setResourceDetailsModal({...agentDetailsModal, show: true, id, header: "DETAIL DE " + name})
    }

    // Hide agent details modal form
    const handleResourceDetailsModalHide = () => {
        setResourceDetailsModal({...agentDetailsModal, show: false})
    }

    // Trigger when user block status confirmed on modal
    const handleBlockModalShow = ({id, name}) => {
        setBlockModal({...blockModal, show: true, id, body: `Bloquer l'agent ${name}?`})
    };

    // Hide block confirmation modal
    const handleBlockModalHide = () => {
        setBlockModal({...blockModal, show: false})
    }

    // Trigger when user change status confirmed on modal
    const handleBlock = (id) => {
        handleBlockModalHide();
        dispatch(emitToggleResourceStatus({id}));
    };

    // Render
    return (
        <>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title="Tous les resources" icon={'fa fa-user-cog'} />
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
                                            {requestFailed(resourcesRequests.list) && <ErrorAlertComponent message={resourcesRequests.list.message} />}
                                            {requestFailed(resourcesRequests.next) && <ErrorAlertComponent message={resourcesRequests.next.message} />}
                                            {requestFailed(resourcesRequests.status) && <ErrorAlertComponent message={resourcesRequests.status.message} />}
                                            <button type="button"
                                                    className="btn btn-theme ml-2 mb-2"
                                                    onClick={handleNewResourceModalShow}
                                            >
                                                <i className="fa fa-plus" /> Nouvel agent
                                            </button>
                                            {/* Search result & Infinite scroll */}
                                            {requestLoading(resourcesRequests.list) ? <LoaderComponent /> : ((needle !== '' && needle !== undefined) ?
                                                    (
                                                        <ResourcesCardsComponent handleBlock={handleBlock}
                                                                              resources={searchEngine(resources, needle)}
                                                                              handleBlockModalShow={handleBlockModalShow}
                                                                              handleResourceDetailsModalShow={handleResourceDetailsModalShow}
                                                        />
                                                    ) :
                                                    (
                                                        <InfiniteScroll hasMore={hasMoreData}
                                                                        dataLength={resources.length}
                                                                        next={handleNextResourcesData}
                                                                        loader={<LoaderComponent />}
                                                                        style={{ overflow: 'hidden' }}
                                                        >
                                                            <ResourcesCardsComponent resources={resources}
                                                                                  handleBlock={handleBlock}
                                                                                  handleBlockModalShow={handleBlockModalShow}
                                                                                  handleResourceDetailsModalShow={handleResourceDetailsModalShow}
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
            <BlockModalComponent modal={blockModal}
                                 handleBlock={handleBlock}
                                 handleClose={handleBlockModalHide}
            />
            <FormModalComponent modal={newResourceModal} handleClose={handleNewResourceModalHide}>
                <ResourceNewContainer handleClose={handleNewResourceModalHide} />
            </FormModalComponent>
            <FormModalComponent modal={agentDetailsModal} handleClose={handleResourceDetailsModalHide}>
                <ResourceDetailsContainer id={agentDetailsModal.id} />
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
                needleSearch(item.phone, _needle) ||
                needleSearch(item.reference, _needle) ||
                needleSearch(item.zone.name, _needle) ||
                needleSearch(item.creator.name, _needle) ||
                needleSearch(item.zone.reference, _needle) ||
                needleSearch(dateToString(item.creation), _needle) ||
                needleSearch(agentTypeBadgeColor(item.reference).text, _needle)
            )
        });
    }
    // Return data
    return data;
}

// Prop types to ensure destroyed props data type
ResourcesPage.propTypes = {
    page: PropTypes.number.isRequired,
    resources: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    resourcesRequests: PropTypes.object.isRequired,
};

export default React.memo(ResourcesPage);
