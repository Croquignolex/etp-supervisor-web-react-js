import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import {emitAllZonesFetch} from "../../redux/zones/actions";
import HeaderComponent from "../../components/HeaderComponent";
import LoaderComponent from "../../components/LoaderComponent";
import {agentTypeBadgeColor} from "../../functions/typeFunctions";
import {emitAllOperatorsFetch} from "../../redux/operators/actions";
import AppLayoutContainer from "../../containers/AppLayoutContainer";
import ErrorAlertComponent from "../../components/ErrorAlertComponent";
import {AGENT_TYPE, RESOURCE_TYPE} from "../../constants/typeConstants";
import TableSearchComponent from "../../components/TableSearchComponent";
import AgentNewContainer from "../../containers/agents/AgentNewContainer";
import FormModalComponent from "../../components/modals/FormModalComponent";
import {storeAllZonesRequestReset} from "../../redux/requests/zones/actions";
import BlockModalComponent from "../../components/modals/BlockModalComponent";
import AgentsCardsComponent from "../../components/agents/AgentsCardsComponent";
import AgentDetailsContainer from "../../containers/agents/AgentDetailsContainer";
import {storeAllOperatorsRequestReset} from "../../redux/requests/operators/actions";
import {emitAgentsFetch, emitNextAgentsFetch, emitToggleAgentStatus} from "../../redux/agents/actions";
import {
    applySuccess,
    dateToString,
    needleSearch,
    requestFailed,
    requestLoading,
    requestSucceeded
} from "../../functions/generalFunctions";
import {
    storeAgentsRequestReset,
    storeNextAgentsRequestReset,
    storeAgentStatusToggleRequestReset
} from "../../redux/requests/agents/actions";

// Component
function AgentsPage({agents, agentsRequests, hasMoreData, page, dispatch, location}) {
    // Local states
    const [needle, setNeedle] = useState('');
    const [blockModal, setBlockModal] = useState({show: false, body: '', id: 0});
    const [newAgentModal, setNewAgentModal] = useState({show: false, header: '', type: ''});
    const [agentDetailsModal, setAgentDetailsModal] = useState({show: false, header: "DETAIL DE L'AGENT/RESSOURCE", id: ''});

    // Local effects
    useEffect(() => {
        dispatch(emitAgentsFetch());
        dispatch(emitAllZonesFetch());
        dispatch(emitAllOperatorsFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Local effects
    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(agentsRequests.status)) {
            applySuccess(agentsRequests.status.message);
        }
        // eslint-disable-next-line
    }, [agentsRequests.status]);

    const handleNeedleInput = (data) => {
        setNeedle(data)
    }

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAgentsRequestReset());
        dispatch(storeAllZonesRequestReset());
        dispatch(storeNextAgentsRequestReset());
        dispatch(storeAllOperatorsRequestReset());
        dispatch(storeAgentStatusToggleRequestReset());
    };

    // Fetch next agents data to enhance infinite scroll
    const handleNextAgentsData = () => {
        dispatch(emitNextAgentsFetch({page}));
    }

    // Show new agent modal form
    const handleNewAgentModalShow = () => {
        setNewAgentModal({newAgentModal, type: AGENT_TYPE, header: "NOUVEL AGENT", show: true})
    }

    // Show new resource modal form
    const handleNewResourceModalShow = () => {
        setNewAgentModal({newAgentModal, type: RESOURCE_TYPE, header: "NOUVELLE RESSOURCE", show: true})
    }

    // Hide new agent modal form
    const handleNewAgentModalHide = () => {
        setNewAgentModal({...newAgentModal, show: false})
    }

    // Show agent details modal form
    const handleAgentDetailsModalShow = ({id}) => {
        setAgentDetailsModal({...agentDetailsModal, show: true, id})
    }

    // Hide agent details modal form
    const handleAgentDetailsModalHide = () => {
        setAgentDetailsModal({...agentDetailsModal, show: false})
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
        dispatch(emitToggleAgentStatus({id}));
    };

    // Render
    return (
        <>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title="Tous les agents/ressources" icon={'fa fa-user-cog'} />
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
                                            {requestFailed(agentsRequests.list) && <ErrorAlertComponent message={agentsRequests.list.message} />}
                                            {requestFailed(agentsRequests.next) && <ErrorAlertComponent message={agentsRequests.next.message} />}
                                            {requestFailed(agentsRequests.status) && <ErrorAlertComponent message={agentsRequests.status.message} />}
                                            <button type="button"
                                                    className="btn btn-primary mr-2 mb-2"
                                                    onClick={handleNewAgentModalShow}
                                            >
                                                <i className="fa fa-plus" /> Nouvel agent
                                            </button>
                                            <button type="button"
                                                    className="btn btn-info mb-2"
                                                    onClick={handleNewResourceModalShow}
                                            >
                                                <i className="fa fa-plus" /> Nouvelle ressource
                                            </button>
                                            {/* Search result & Infinite scroll */}
                                            {(needle !== '' && needle !== undefined)
                                                ? <AgentsCardsComponent handleBlock={handleBlock}
                                                                        agents={searchEngine(agents, needle)}
                                                                        handleBlockModalShow={handleBlockModalShow}
                                                                        handleAgentDetailsModalShow={handleAgentDetailsModalShow}
                                                />
                                                : (requestLoading(agentsRequests.list) ? <LoaderComponent /> :
                                                        <InfiniteScroll hasMore={hasMoreData}
                                                                        dataLength={agents.length}
                                                                        next={handleNextAgentsData}
                                                                        loader={<LoaderComponent />}
                                                                        style={{ overflow: 'hidden' }}
                                                        >
                                                            <AgentsCardsComponent agents={agents}
                                                                                  handleBlock={handleBlock}
                                                                                  handleBlockModalShow={handleBlockModalShow}
                                                                                  handleAgentDetailsModalShow={handleAgentDetailsModalShow}
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
            <BlockModalComponent modal={blockModal}
                                 handleBlock={handleBlock}
                                 handleClose={handleBlockModalHide}
            />
            <FormModalComponent modal={newAgentModal} handleClose={handleNewAgentModalHide}>
                <AgentNewContainer type={newAgentModal.type}
                                   handleClose={handleNewAgentModalHide}
                />
            </FormModalComponent>
            <FormModalComponent modal={agentDetailsModal} handleClose={handleAgentDetailsModalHide}>
                <AgentDetailsContainer id={agentDetailsModal.id} />
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
AgentsPage.propTypes = {
    page: PropTypes.number.isRequired,
    agents: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    hasMoreData: PropTypes.bool.isRequired,
    agentsRequests: PropTypes.object.isRequired,
};

export default React.memo(AgentsPage);