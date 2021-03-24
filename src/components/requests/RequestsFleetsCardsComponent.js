import PropTypes from "prop-types";
import React, {useState} from 'react';

import FormModalComponent from "../modals/FormModalComponent";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import {dateToString, formatNumber} from "../../functions/generalFunctions";
import AgentDetailsContainer from "../../containers/agents/AgentDetailsContainer";
import SimDetailsContainer from "../../containers/sims/SimDetailsContainer";
import CollectorDetailsContainer from "../../containers/collectors/CollectorDetailsContainer";

// Component
function RequestsFleetsCardsComponent({fleets}) {
    // Local states
    const [simDetailsModal, setSimDetailsModal] = useState({show: false, header: "DETAIL DE LA PUCE", id: ''});
    const [agentDetailsModal, setAgentDetailsModal] = useState({show: false, header: "DETAIL DE L'AGENT/RESSOURCE", id: ''});
    const [collectorDetailsModal, setCollectorDetailsModal] = useState({show: false, header: "DETAIL DU RESPONSABLE DE ZONE", id: ''});

    // Hide agent details modal form
    const handleAgentDetailsModalHide = () => {
        setAgentDetailsModal({...agentDetailsModal, show: false})
    }

    // Show sim details modal form
    const handleSimDetailsModalShow = ({id}) => {
        setSimDetailsModal({...simDetailsModal, show: true, id})
    }

    // Hide sim details modal form
    const handleSimDetailsModalHide = () => {
        setSimDetailsModal({...simDetailsModal, show: false})
    }

    // Show collector details modal form
    const handleCollectorDetailsModalShow = ({id}) => {
        setCollectorDetailsModal({...collectorDetailsModal, show: true, id})
    }

    // Hide collector details modal form
    const handleCollectorDetailsModalHide = () => {
        setCollectorDetailsModal({...collectorDetailsModal, show: false})
    }

    // Render
    return (
        <>
            <div className="row m-1">
                {fleets.map((item, key) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={key}>
                            <div className="card">
                                <div className={`${fleetTypeBadgeColor(item.status).background} card-header`}>
                                    <h3 className="card-title">{fleetTypeBadgeColor(item.status).text}</h3>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-unbordered">
                                        <li className="list-group-item">
                                            <b>Création</b>
                                            <span className="float-right">{dateToString(item.creation)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Montant demandé</b>
                                            <span className="float-right">{formatNumber(item.amount)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Reste à flotter</b>
                                            <span className="float-right text-danger text-bold">{formatNumber(item.remaining)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Puce à flotter</b>
                                            <span className="float-right">
                                                {item.sim.number}
                                                <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                                   onClick={() => setSimDetailsModal({...simDetailsModal, show: true, id: item.sim.id})}
                                                />
                                            </span>
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
                                            <b>Demandeur</b>
                                            <span className="float-right">
                                                {item.claimant.name}
                                                {(item.claimant.id === item.agent.id)
                                                    ? <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                                       onClick={() => setAgentDetailsModal({...agentDetailsModal, show: true, id: item.agent.id})}
                                                    />
                                                    : <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                                       onClick={() => setCollectorDetailsModal({...collectorDetailsModal, show: true, id: item.claimant.id})}
                                                    />
                                                }
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {fleets.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas de demandes de flotte
                        </div>
                    </div>
                }
            </div>
            {/* Modal */}
            <FormModalComponent modal={agentDetailsModal} handleClose={handleAgentDetailsModalHide}>
                <AgentDetailsContainer id={agentDetailsModal.id} />
            </FormModalComponent>
            <FormModalComponent small={true} modal={simDetailsModal} handleClose={handleSimDetailsModalHide}>
                <SimDetailsContainer id={simDetailsModal.id} />
            </FormModalComponent>
            <FormModalComponent modal={collectorDetailsModal} handleClose={handleCollectorDetailsModalHide}>
                <CollectorDetailsContainer id={collectorDetailsModal.id} />
            </FormModalComponent>
        </>
    )
}

// Prop types to ensure destroyed props data type
RequestsFleetsCardsComponent.propTypes = {
    fleets: PropTypes.array.isRequired,
    handleSupplyModalShow: PropTypes.func.isRequired
};

export default React.memo(RequestsFleetsCardsComponent);
