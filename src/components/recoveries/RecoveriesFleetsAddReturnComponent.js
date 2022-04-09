import PropTypes from "prop-types";
import React, {useEffect, useState, useMemo} from 'react';

import ButtonComponent from "../form/ButtonComponent";
import AmountComponent from "../form/AmountComponent";
import SelectComponent from "../form/SelectComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import {emitAllSimsFetch} from "../../redux/sims/actions";
import {emitAllAgentsFetch} from "../../redux/agents/actions";
import {emitAddFleetReturn} from "../../redux/returns/actions";
import {requiredChecker} from "../../functions/checkerFunctions";
import {emitAllAgenciesFetch} from "../../redux/agencies/actions";
import {DEFAULT_FORM_DATA} from "../../constants/defaultConstants";
import {playWarningSound} from "../../functions/playSoundFunctions";
import {storeAllSimsRequestReset} from "../../redux/requests/sims/actions";
import {storeAllAgentsRequestReset} from "../../redux/requests/agents/actions";
import {dataToArrayForSelect, mappedSims} from "../../functions/arrayFunctions";
import {storeAllAgenciesRequestReset} from "../../redux/requests/agencies/actions";
import {storeAddFleetReturnRequestReset} from "../../redux/requests/returns/actions";
import {AGENT_TYPE, MASTER_TYPE, RESOURCE_TYPE} from "../../constants/typeConstants";
import {applySuccess, requestFailed, requestLoading, requestSucceeded} from "../../functions/generalFunctions";

// Component
function RecoveriesFleetsAddReturnComponent({request, agents, sims, dispatch, handleClose, allSimsRequests,
                                                allAgenciesRequests, agencies, allAgentsRequests}) {
    const [amount, setAmount] = useState(DEFAULT_FORM_DATA);
    const [agency, setAgency] = useState(DEFAULT_FORM_DATA);
    const [selectedOp, setSelectedOp] = useState('');
    const [outgoingSim, setOutgoingSim] = useState(DEFAULT_FORM_DATA);
    const [incomingSim, setIncomingSim] = useState(DEFAULT_FORM_DATA);
    const [agent, setAgent] = useState({...DEFAULT_FORM_DATA, data: 0});

    // Local effects
    useEffect(() => {
        dispatch(emitAllSimsFetch());
        dispatch(emitAllAgentsFetch());
        dispatch(emitAllAgenciesFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Local effects
    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(request)) {
            applySuccess(request.message);
            handleClose()
        }
        // eslint-disable-next-line
    }, [request]);

    const handleOutgoingSelect = (data) => {
        shouldResetErrorData();
        const foundSim = sims.find(item => item.id === data);
        setSelectedOp(foundSim && foundSim.operator.id);
        setOutgoingSim({...outgoingSim,  isValid: true, data})
    }

    const handleIncomingSelect = (data) => {
        shouldResetErrorData();
        setIncomingSim({...incomingSim,  isValid: true, data})
    }

    const handleAmountInput = (data) => {
        shouldResetErrorData();
        setAmount({...amount, isValid: true, data})
    }

    const handleAgentSelect = (data) => {
        shouldResetErrorData();
        setAgent({...agent,  isValid: true, data})
    }

    const handleAgencySelect = (data) => {
        shouldResetErrorData();
        setAgency({...agency,  isValid: true, data})
    }

    // Build select options
    const agencySelectOptions = useMemo(() => {
        return dataToArrayForSelect(agencies);
    }, [agencies]);

    // Build select options
    const incomingSelectOptions = useMemo(() => {
        return dataToArrayForSelect(mappedSims(sims.filter(
            item => (MASTER_TYPE === item.type.name) && (item.operator.id === selectedOp)
        )))
    }, [sims, selectedOp]);

    // Build select options
    const outgoingSelectOptions = useMemo(() => {
        const selectedAgent = agents.find((item) => item.id === agent.data);
        if(selectedAgent) {
            if(selectedAgent.reference === AGENT_TYPE) {
                return dataToArrayForSelect(mappedSims(sims.filter(item => item.agent.id === agent.data)));
            } else {
                return dataToArrayForSelect(mappedSims(sims.filter(
                    item => (
                        (item.type.name === RESOURCE_TYPE) &&
                        (item.agency.id === agency.data)
                    )
                )))
            }
        } else return [];
    }, [sims, agent.data, agency.data, agents]);

    // Build select options
    const agentSelectOptions = useMemo(() => {
        return dataToArrayForSelect(agents)
    }, [agents]);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAllSimsRequestReset());
        dispatch(storeAllAgentsRequestReset());
        dispatch(storeAllAgenciesRequestReset());
        dispatch(storeAddFleetReturnRequestReset());
    };

    // Trigger add supply form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _agent = requiredChecker(agent);
        const _amount = requiredChecker(amount);
        const _outgoingSim = requiredChecker(outgoingSim);
        const _incomingSim = requiredChecker(incomingSim);
        // Set value
        setAgent(_agent);
        setAmount(_amount);
        setOutgoingSim(_outgoingSim);
        setIncomingSim(_incomingSim);
        const validationOK = (_amount.isValid && _incomingSim.isValid && _outgoingSim.isValid && _agent.isValid);
        // Check
        if(validationOK) {
            dispatch(emitAddFleetReturn({
                agent: _agent.data,
                amount: _amount.data,
                agentSim: _outgoingSim.data,
                managerSim: _incomingSim.data
            }));
        }
        else playWarningSound();
    };

    // Render
    return (
        <>
            {requestFailed(request) && <ErrorAlertComponent message={request.message} />}
            {requestFailed(allSimsRequests) && <ErrorAlertComponent message={allSimsRequests.message} />}
            {requestFailed(allAgentsRequests) && <ErrorAlertComponent message={allAgentsRequests.message} />}
            {requestFailed(allAgenciesRequests) && <ErrorAlertComponent message={allAgenciesRequests.message} />}
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-sm-6'>
                        <SelectComponent input={agent}
                                         id='inputSimAgent'
                                         label='Agent/ressource'
                                         options={agentSelectOptions}
                                         handleInput={handleAgentSelect}
                                         title='Choisir un agent/ressource'
                                         requestProcessing={requestLoading(allAgentsRequests)}
                        />
                    </div>
                    {(agents.find((item) => item.id === agent.data)?.reference === RESOURCE_TYPE) && (
                        <div className='col-sm-6'>
                            <SelectComponent id='inputAgencyAgent'
                                             input={agency}
                                             label="Agence"
                                             title='Choisir une agence'
                                             options={agencySelectOptions}
                                             handleInput={handleAgencySelect}
                                             requestProcessing={requestLoading(allAgenciesRequests)}
                            />
                        </div>
                    )}
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <SelectComponent input={outgoingSim}
                                         id='inputSimAgent'
                                         label='Compte émetteur'
                                         title='Choisir un compte'
                                         options={outgoingSelectOptions}
                                         handleInput={handleOutgoingSelect}
                                         requestProcessing={requestLoading(allSimsRequests)}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <SelectComponent input={incomingSim}
                                         id='inputSimManager'
                                         label='Compte recepteur'
                                         title='Choisir un compte'
                                         options={incomingSelectOptions}
                                         handleInput={handleIncomingSelect}
                                         requestProcessing={requestLoading(allSimsRequests)}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <AmountComponent input={amount}
                                         id='inputFleet'
                                         label='Flotte à retourner'
                                         handleInput={handleAmountInput}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <ButtonComponent processing={requestLoading(request)} />
                </div>
            </form>
        </>
    )
}

// Prop types to ensure destroyed props data type
RecoveriesFleetsAddReturnComponent.propTypes = {
    sims: PropTypes.array.isRequired,
    agents: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    allSimsRequests: PropTypes.object.isRequired,
    allAgentsRequests: PropTypes.object.isRequired,
};

export default React.memo(RecoveriesFleetsAddReturnComponent);
