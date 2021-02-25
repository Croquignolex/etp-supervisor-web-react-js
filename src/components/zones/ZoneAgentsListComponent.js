import PropTypes from "prop-types";
import React, {useMemo, useState} from 'react';

import * as types from "../../constants/typeConstants";
import FormModalComponent from "../modals/FormModalComponent";
import ZoneAddAgentContainer from "../../containers/zones/ZoneAddAgentContainer";

// Component
function ZoneAgentsListComponent({zone}) {
    // Local states
    const [addAgentModal, setAddAgentEditModal] = useState({show: false, header: 'AJOUTER UN AGENT A ' + zone.name});

    // Show add sim modal form
    const handleAddAgentModalShow = () => {
        setAddAgentEditModal({...addAgentModal, show: true})
    }

    // Hide add sim modal form
    const handleAddAgentModalHide = () => {
        setAddAgentEditModal({...addAgentModal, show: false})
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
                                        <td>{item.name}</td>
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
        </>
    )
}

// Prop types to ensure destroyed props data type
ZoneAgentsListComponent.propTypes = {
    zone: PropTypes.object.isRequired
};

export default React.memo(ZoneAgentsListComponent);
