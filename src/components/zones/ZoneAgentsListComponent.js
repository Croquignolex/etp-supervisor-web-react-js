import PropTypes from "prop-types";
import React, {useMemo, useState} from 'react';

import * as types from "../../constants/typeConstants";
import FormModalComponent from "../modals/FormModalComponent";
import ZoneAddAgentContainer from "../../containers/zones/ZoneAddAgentContainer";
import AgentDetailsContainer from "../../containers/agents/AgentDetailsContainer";

// Component
function ZoneAgentsListComponent({zone}) {
    // Local states
    const [agentDetailsModal, setAgentDetailsModal] = useState({show: false, header: 'DETAIL DE LA AGENT', id: ''});
    const [addAgentModal, setAddAgentEditModal] = useState({show: false, header: 'AJOUTER UN AGENT A ' + zone.name});

    // Show add sim modal form
    const handleAddAgentModalShow = () => {
        setAddAgentEditModal({...addAgentModal, show: true})
    }

    // Hide add sim modal form
    const handleAddAgentModalHide = () => {
        setAddAgentEditModal({...addAgentModal, show: false})
    }

    // Hide agent details modal form
    const handleAgentDetailModalHide = () => {
        setAgentDetailsModal({...agentDetailsModal, show: false})
    }

    const agentsData = useMemo(() => {
        return zone.agents.filter(agent => types.AGENT_TYPE === agent.reference)
        // eslint-disable-next-line
    }, [zone]);

    // Render
    return (
        <>
            <button type="button" className="btn btn-theme mb-1" onClick={handleAddAgentModalShow}>
                <i className="fa fa-plus" /> Ajouter un agent
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
                            {agentsData.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>
                                            <i className="fa fa-question-circle small mr-1 hand-cursor text-theme"
                                               onClick={() => setAgentDetailsModal({...agentDetailsModal, show: true, id: item.id})}
                                            />
                                            {item.name}
                                        </td>
                                        <td>{item.reference}</td>
                                        <td>{item.phone}</td>
                                    </tr>
                                )
                            })}
                            {agentsData.length === 0 && (
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
                <ZoneAddAgentContainer handleClose={handleAddAgentModalHide} />
            </FormModalComponent>
            <FormModalComponent modal={agentDetailsModal} handleClose={handleAgentDetailModalHide}>
                <AgentDetailsContainer id={agentDetailsModal.id} />
            </FormModalComponent>
        </>
    )
}

// Prop types to ensure destroyed props data type
ZoneAgentsListComponent.propTypes = {
    zone: PropTypes.object.isRequired
};

export default React.memo(ZoneAgentsListComponent);
