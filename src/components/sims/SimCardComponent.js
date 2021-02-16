import React, {useState} from 'react';
import PropTypes from "prop-types";

import FormModalComponent from "../modals/FormModalComponent";
import AgentDetailsContainer from "../../containers/agents/AgentDetailsContainer";
import {AGENT_COLLECTOR_TYPE, COLLECTOR_TYPE} from "../../constants/typeConstants";
import {dateToString, formatNumber, upperFirstCase} from "../../functions/generalFunctions";
import OperatorDetailsContainer from "../../containers/operators/OperatorDetailsContainer";

// Component
function SimCardComponent({sim}) {
    // Local states
    const [agentDetailsModal, setAgentDetailsModal] = useState({show: false, header: "DETAIL DE L'AGENT/RESSOURCE", id: ''});
    const [operatorDetailsModal, setOperatorDetailsModal] = useState({show: false, header: "DETAIL DE L'OPERATEUR", id: ''});

    // Hide agent details modal form
    const handleAgentDetailsModalHide = () => {
        setAgentDetailsModal({...agentDetailsModal, show: false})
    }

    // Hide operator details modal form
    const handleOperatorDetailsModalHide = () => {
        setOperatorDetailsModal({...operatorDetailsModal, show: false})
    }

    // Render
    return (
        <div>
            <ul className="list-group list-group-unbordered">
                <li className="list-group-item">
                    <b>Création</b>
                    <span className="float-right">{dateToString(sim.creation)}</span>
                </li>
                <li className="list-group-item">
                    <b>Nom</b>
                    <span className="float-right">{sim.name}</span>
                </li>
                <li className="list-group-item">
                    <b>Numéro</b>
                    <span className="float-right">{sim.number}</span>
                </li>
                <li className="list-group-item">
                    <b>Solde flotte</b>
                    <span className="float-right text-success text-bold">{formatNumber(sim.balance)}</span>
                </li>
                <li className="list-group-item">
                    <b>Opérateur</b>
                    <span className="float-right">
                        {sim.operator.name}
                        <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                           onClick={() => setOperatorDetailsModal({...operatorDetailsModal, show: true, id: sim.operator.id})}
                        />
                    </span>
                </li>
                {AGENT_COLLECTOR_TYPE.includes(sim.type.name) &&
                <li className="list-group-item">
                    <b>{upperFirstCase(sim.type.name)}</b>
                    <span className="float-right">
                        {sim.type.name === COLLECTOR_TYPE
                            ? sim.collector.name
                            : (
                                <>
                                    {sim.agent.name}
                                    <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                       onClick={() => setAgentDetailsModal({...agentDetailsModal, show: true, id: sim.agent.id})}
                                    />
                                </>
                            )
                        }
                    </span>
                </li>
                }
            </ul>
            {/* Modal */}
            <FormModalComponent modal={operatorDetailsModal} handleClose={handleOperatorDetailsModalHide}>
                <OperatorDetailsContainer id={operatorDetailsModal.id} />
            </FormModalComponent>
            {/* Modal */}
            <FormModalComponent modal={agentDetailsModal} handleClose={handleAgentDetailsModalHide}>
                <AgentDetailsContainer id={agentDetailsModal.id} />
            </FormModalComponent>
        </div>
    )
}

// Prop types to ensure destroyed props data type
SimCardComponent.propTypes = {
    sim: PropTypes.object.isRequired
};

export default React.memo(SimCardComponent);
