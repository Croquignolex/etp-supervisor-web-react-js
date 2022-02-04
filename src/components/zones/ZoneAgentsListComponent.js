import PropTypes from "prop-types";
import React, {useState} from 'react';

import FormModalComponent from "../modals/FormModalComponent";
import {AGENT_TYPE, RESOURCE_TYPE} from "../../constants/typeConstants";
import ZoneAddAgentContainer from "../../containers/zones/ZoneAddAgentContainer";
import AgentDetailsContainer from "../../containers/agents/AgentDetailsContainer";
import ResourceDetailsContainer from "../../containers/resources/ResourceDetailsContainer";

// Component
function ZoneAgentsListComponent({zone}) {
    // Local states
    const [addAgentModal, setAddAgentEditModal] = useState({show: false, header: '', type: ''});
    const [agentDetailsModal, setAgentDetailsModal] = useState({show: false, header: "DETAIL DE L'AGENT", id: ''});
    const [resourceDetailsModal, setResourceDetailsModal] = useState({show: false, header: "DETAIL DE LA RESSOURCE", id: ''});

    // Show add agent modal form
    const handleAddAgentModalShow = () => {
        setAddAgentEditModal({addAgentModal, type: AGENT_TYPE, header: 'AJOUTER UN AGENT A ' + zone.name, show: true})
    }

    // Show add resource modal form
    const handleAddResourceModalShow = () => {
        setAddAgentEditModal({addAgentModal, type: RESOURCE_TYPE, header:  'AJOUTER UNE RESSOURCE A ' + zone.name, show: true})
    }

    // Hide add sim modal form
    const handleAddAgentModalHide = () => {
        setAddAgentEditModal({...addAgentModal, show: false})
    }

    // Hide agent details modal form
    const handleAgentDetailModalHide = () => {
        setAgentDetailsModal({...agentDetailsModal, show: false})
    }

    // Hide resource details modal form
    const handleResourceDetailsModalHide = () => {
        setResourceDetailsModal({...resourceDetailsModal, show: false})
    }

    // Render
    return (
        <>
            <button type="button" className="btn btn-theme mb-1 mr-1" onClick={handleAddAgentModalShow}>
                <i className="fa fa-plus" /> Ajouter un agent
            </button>
            <button type="button" className="btn btn-theme mb-1" onClick={handleAddResourceModalShow}>
                <i className="fa fa-plus" /> Ajouter une ressource
            </button>
            <div className="card">
                <div className="table-responsive">
                    <table className="table table-hover text-nowrap table-bordered">
                        <thead>
                            <tr>
                                <th>NOM</th>
                                <th>TYPE</th>
                                <th>TELEPHONE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {zone.agents.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>
                                            {(item?.reference === AGENT_TYPE)
                                                ? <i className="fa fa-question-circle small ml-1 hand-cursor text-theme mr-1"
                                                     onClick={() => setAgentDetailsModal({...agentDetailsModal, show: true, id: item.id})}
                                                />
                                                : <i className="fa fa-question-circle small ml-1 hand-cursor text-theme mr-1"
                                                     onClick={() => setResourceDetailsModal({...resourceDetailsModal, show: true, id: item.id})}
                                                />
                                            }
                                            {item.name}
                                        </td>
                                        <td>{item.reference}</td>
                                        <td>{item.phone}</td>
                                    </tr>
                                )
                            })}
                            {zone.agents.length === 0 && (
                                <tr>
                                    <td colSpan={3}>
                                        <div className='alert custom-active text-center'>
                                            Pas d'agents
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Modal */}
            <FormModalComponent modal={addAgentModal} handleClose={handleAddAgentModalHide}>
                <ZoneAddAgentContainer handleClose={handleAddAgentModalHide} type={addAgentModal.type} />
            </FormModalComponent>
            <FormModalComponent modal={agentDetailsModal} handleClose={handleAgentDetailModalHide}>
                <AgentDetailsContainer id={agentDetailsModal.id} />
            </FormModalComponent>
            <FormModalComponent modal={resourceDetailsModal} handleClose={handleResourceDetailsModalHide}>
                <ResourceDetailsContainer id={resourceDetailsModal.id} />
            </FormModalComponent>
        </>
    )
}

// Prop types to ensure destroyed props data type
ZoneAgentsListComponent.propTypes = {
    zone: PropTypes.object.isRequired
};

export default React.memo(ZoneAgentsListComponent);
