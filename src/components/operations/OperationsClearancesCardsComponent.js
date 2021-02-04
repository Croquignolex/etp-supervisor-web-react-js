import PropTypes from "prop-types";
import React, {useState} from 'react';

import {DONE} from "../../constants/typeConstants";
import FormModalComponent from "../modals/FormModalComponent";
import {dateToString, formatNumber} from "../../functions/generalFunctions";
import AgentDetailsContainer from "../../containers/agents/AgentDetailsContainer";

// Component
function OperationsClearancesCardsComponent({refuels}) {
    // Local states
    const [agentDetailsModal, setAgentDetailsModal] = useState({show: false, header: "DETAIL DE L'AGENT/RESSOURCE", id: ''});

    // Hide agent details modal form
    const handleAgentDetailsModalHide = () => {
        setAgentDetailsModal({...agentDetailsModal, show: false})
    }

    // Render
    return (
        <>
            <div className="row m-1">
                {refuels.map((item, key) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={key}>
                            <div className="card">
                                <div className={`card-header ${item.status === DONE ? 'bg-secondary' : 'bg-primary'}`}>
                                    <h3 className="card-title text-bold">
                                        <i className="fa fa-money-bill" /> {formatNumber(item.amount)}
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-unbordered">
                                        <li className="list-group-item">
                                            <b>Créer le</b>
                                            <span className="float-right">{dateToString(item.creation)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Agent/Ressource</b>
                                            <span className="float-right">
                                                {item.agent.name}
                                                <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                                   onClick={() => setAgentDetailsModal({...agentDetailsModal, show: true, id: item.agent.id})}
                                                />
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Puce réceptrice</b>
                                            <span className="float-right">{item.sim.number}</span>
                                        </li>
                                        <li className="list-group-item">
                                            {(item.status === DONE)
                                                ? <b className="text-success">Confirmé</b>
                                                : <b className="text-danger">En attente de confirmation</b>
                                            }
                                        </li>
                                        {item.receipt && (
                                            <li className="list-group-item text-center">
                                                <a download target='_blank' href={item.receipt} rel='noopener noreferrer' className="btn btn-theme">
                                                    <i className="fa fa-file-archive" /> Reçus
                                                </a>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {refuels.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas de déstockages
                        </div>
                    </div>
                }
            </div>
            {/* Modal */}
            <FormModalComponent modal={agentDetailsModal} handleClose={handleAgentDetailsModalHide}>
                <AgentDetailsContainer id={agentDetailsModal.id} />
            </FormModalComponent>
        </>
    )
}

// Prop types to ensure destroyed props data type
OperationsClearancesCardsComponent.propTypes = {
    refuels: PropTypes.array.isRequired
};

export default React.memo(OperationsClearancesCardsComponent);
