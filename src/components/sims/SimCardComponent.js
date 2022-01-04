import React, {useState} from 'react';
import PropTypes from "prop-types";

import OperatorComponent from "../OperatorComponent";
import FormModalComponent from "../modals/FormModalComponent";
import AgentDetailsContainer from "../../containers/agents/AgentDetailsContainer";
import AgencyDetailsContainer from "../../containers/agencies/AgencyDetailsContainer";
import CompanyDetailsContainer from "../../containers/companies/CompanyDetailsContainer";
import OperatorDetailsContainer from "../../containers/operators/OperatorDetailsContainer";
import {dateToString, formatNumber, upperFirstCase} from "../../functions/generalFunctions";
import CollectorDetailsContainer from "../../containers/collectors/CollectorDetailsContainer";
import {
    AGENT_TYPE,
    RESOURCE_TYPE,
    COLLECTOR_TYPE,
    CORPORATE_TYPE,
    AGENT_RESOURCE_COLLECTOR_CORPORATE_TYPE
} from "../../constants/typeConstants";

// Component
function SimCardComponent({sim}) {
    // Local states
    const [agencyDetailsModal, setAgencyDetailsModal] = useState({show: false, header: "DETAIL DE L'AGENCE", id: ''});
    const [companyDetailsModal, setCompanyDetailsModal] = useState({show: false, header: "DETAIL DE L'ENTREPRISE", id: ''});
    const [agentDetailsModal, setAgentDetailsModal] = useState({show: false, header: "DETAIL DE L'AGENT/RESSOURCE", id: ''});
    const [operatorDetailsModal, setOperatorDetailsModal] = useState({show: false, header: "DETAIL DE L'OPERATEUR", id: ''});
    const [collectorDetailsModal, setCollectorDetailsModal] = useState({show: false, header: "DETAIL DU RESPONSABLE DE ZONE", id: ''});

    // Hide agent details modal form
    const handleAgentDetailsModalHide = () => {
        setAgentDetailsModal({...agentDetailsModal, show: false})
    }

    // Hide collector details modal form
    const handleCollectorDetailsModalHide = () => {
        setCollectorDetailsModal({...collectorDetailsModal, show: false})
    }

    // Hide operator details modal form
    const handleOperatorDetailsModalHide = () => {
        setOperatorDetailsModal({...operatorDetailsModal, show: false})
    }

    // Hide company details modal form
    const handleCompanyDetailsModalHide = () => {
        setCompanyDetailsModal({...companyDetailsModal, show: false})
    }

    // Hide agency details modal form
    const handleAgencyDetailsModalHide = () => {
        setAgencyDetailsModal({...agencyDetailsModal, show: false})
    }

    // Render
    return (
        <>
            <ul className="list-group list-group-unbordered">
                <OperatorComponent operator={sim.operator} />
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
                    <span className="float-right text-success text-bold">
                        {formatNumber(sim.balance)}
                    </span>
                </li>
                {AGENT_RESOURCE_COLLECTOR_CORPORATE_TYPE.includes(sim.type.name) && (
                    <li className="list-group-item">
                        <b>{(sim.type.name === RESOURCE_TYPE) ? 'Agence' : upperFirstCase(sim.type.name)}</b>
                        <span className="float-right">
                            {sim.type.name === AGENT_TYPE && (
                                <>
                                    {sim.agent.name}
                                    <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                       onClick={() => setAgentDetailsModal({...agentDetailsModal, show: true, id: sim.agent.id})}
                                    />
                                </>
                            )}
                            {sim.type.name === RESOURCE_TYPE && (
                                <>
                                    {sim.agency.name}
                                    <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                       onClick={() => setAgencyDetailsModal({...agencyDetailsModal, show: true, id: sim.agency.id})}
                                    />
                                </>
                            )}
                            {sim.type.name === COLLECTOR_TYPE && (
                                <>
                                    {sim.collector.name}
                                    <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                        onClick={() => setCollectorDetailsModal({...collectorDetailsModal, show: true, id: sim.collector.id})}
                                    />
                                </>
                            )}
                            {sim.type.name === CORPORATE_TYPE && (
                                <>
                                    {sim.company.name}
                                    <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                       onClick={() => setCompanyDetailsModal({...companyDetailsModal, show: true, id: sim.company.id})}
                                    />
                                </>
                            )}
                        </span>
                    </li>
                )}
            </ul>
            {/* Modal */}
            <FormModalComponent modal={operatorDetailsModal} handleClose={handleOperatorDetailsModalHide}>
                <OperatorDetailsContainer id={operatorDetailsModal.id} />
            </FormModalComponent>
            <FormModalComponent modal={agentDetailsModal} handleClose={handleAgentDetailsModalHide}>
                <AgentDetailsContainer id={agentDetailsModal.id} />
            </FormModalComponent>
            <FormModalComponent modal={collectorDetailsModal} handleClose={handleCollectorDetailsModalHide}>
                <CollectorDetailsContainer id={collectorDetailsModal.id} />
            </FormModalComponent>
            <FormModalComponent modal={companyDetailsModal} handleClose={handleCompanyDetailsModalHide}>
                <CompanyDetailsContainer id={companyDetailsModal.id} />
            </FormModalComponent>
            <FormModalComponent modal={agencyDetailsModal} handleClose={handleAgencyDetailsModalHide}>
                <AgencyDetailsContainer id={agencyDetailsModal.id} />
            </FormModalComponent>
        </>
    )
}

// Prop types to ensure destroyed props data type
SimCardComponent.propTypes = {
    sim: PropTypes.object.isRequired
};

export default React.memo(SimCardComponent);
