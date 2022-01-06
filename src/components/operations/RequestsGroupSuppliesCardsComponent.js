import PropTypes from "prop-types";
import React, {useState} from 'react';

import OperatorComponent from "../OperatorComponent";
import FormModalComponent from "../modals/FormModalComponent";
import {formatNumber} from "../../functions/generalFunctions";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import {AGENT_TYPE, PENDING, PROCESSING} from "../../constants/typeConstants";
import AgentDetailsContainer from "../../containers/agents/AgentDetailsContainer";
import ResourceDetailsContainer from "../../containers/resources/ResourceDetailsContainer";

// Component
function RequestsGroupSuppliesCardsComponent({supplies, handleGroupDetailsModalShow,
                                                 handleGroupReturnModalShow, handleGroupRecoveryModalShow}) {
    // Local states
    const [agentDetailsModal, setAgentDetailsModal] = useState({show: false, header: "DETAIL DE L'AGENT/RESSOURCE", id: ''});
    const [resourceDetailsModal, setResourceDetailsModal] = useState({show: false, header: "DETAIL DE RESSOURCE", id: ''});

    // Hide agent details modal form
    const handleAgentDetailsModalHide = () => {
        setAgentDetailsModal({...agentDetailsModal, show: false})
    }

    // Hide resource details modal form
    const handleResourceDetailsModalHide = () => {
        setResourceDetailsModal({...resourceDetailsModal, show: false})
    }

    // Render
    return (
        <>
            <div className="row m-1">
                {supplies.map((item, key) => {
                    const amountToFleet = item.reduce((acc, val) => acc + parseInt(val.amount, 10), 0);
                    const amountToRecover = item.reduce((acc, val) => acc + parseInt(val.remaining, 10), 0);
                    const pendingStatus = (amountToFleet === amountToRecover);
                    return (
                        <div className="col-lg-4 col-md-6" key={key}>
                            <div className="card">
                                <div className={`${fleetTypeBadgeColor(pendingStatus ? PENDING : PROCESSING).background} card-header`} />
                                <div className="card-body">
                                    <ul className="list-group list-group-unbordered">
                                        <OperatorComponent operator={item[0].operator} />
                                        <li className="list-group-item">
                                            <b>Flottages groupés</b>
                                            <span className="float-right">
                                                {item.length}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Montant flotté</b>
                                            <span className="float-right text-success text-bold">
                                                {formatNumber(amountToFleet)}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Reste à récouvrir</b>
                                            <span className="float-right text-danger text-bold">
                                                {formatNumber(amountToRecover)}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>{(item[0].agent?.reference === AGENT_TYPE) ? "Agent" : "Ressource"}</b>
                                            <span className="float-right">
                                                {item[0].agent.name}
                                                {(item[0].agent?.reference === AGENT_TYPE)
                                                    ? <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                                         onClick={() => setAgentDetailsModal({...agentDetailsModal, show: true, id: item[0].agent.id})}
                                                    />
                                                    : <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                                         onClick={() => setResourceDetailsModal({...resourceDetailsModal, show: true, id: item[0].agent.id})}
                                                    />
                                                }
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            {(pendingStatus)
                                                ? <b className="text-danger text-bold">En attente de recouvrement</b>
                                                : <b className="text-primary text-bold">Recouvert partiellement</b>
                                            }
                                        </li>
                                    </ul>
                                    <div className="mt-3 text-right">
                                        <button type="button"
                                                className="btn btn-theme btn-sm"
                                                onClick={() => handleGroupDetailsModalShow(item)}
                                        >
                                            <i className="fa fa-eye" /> Details
                                        </button>
                                        <br/>
                                        <button type="button"
                                                className="btn btn-sm btn-theme my-2"
                                                onClick={() => handleGroupReturnModalShow(item)}
                                        >
                                            <i className="fa fa-redo" /> Retour flotte
                                        </button>
                                        <br/>
                                        <button type="button"
                                                className="btn btn-sm btn-theme"
                                                onClick={() => handleGroupRecoveryModalShow(item)}
                                        >
                                            <i className="fa fa-hand-paper" /> Recouvrement espèce
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {supplies.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas de flottages groupés
                        </div>
                    </div>
                }
            </div>
            {/* Modal */}
            <FormModalComponent modal={agentDetailsModal} handleClose={handleAgentDetailsModalHide}>
                <AgentDetailsContainer id={agentDetailsModal.id} />
            </FormModalComponent>
            <FormModalComponent modal={resourceDetailsModal} handleClose={handleResourceDetailsModalHide}>
                <ResourceDetailsContainer id={resourceDetailsModal.id} />
            </FormModalComponent>
        </>
    )
}

// Prop types to ensure destroyed props data type
RequestsGroupSuppliesCardsComponent.propTypes = {
    supplies: PropTypes.array.isRequired,
    handleGroupReturnModalShow: PropTypes.func.isRequired,
    handleGroupDetailsModalShow: PropTypes.func.isRequired,
    handleGroupRecoveryModalShow: PropTypes.func.isRequired,
};

export default React.memo(RequestsGroupSuppliesCardsComponent);
