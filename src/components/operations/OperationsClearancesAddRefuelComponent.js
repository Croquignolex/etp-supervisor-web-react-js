import PropTypes from "prop-types";
import React, {useEffect, useMemo, useState} from 'react';

import ButtonComponent from "../form/ButtonComponent";
import AmountComponent from "../form/AmountComponent";
import SelectComponent from "../form/SelectComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import {FLEET_TYPE} from "../../constants/typeConstants";
import {emitAddRefuel} from "../../redux/refuels/actions";
import * as constants from "../../constants/defaultConstants";
import FileDocumentComponent from "../form/FileDocumentComponent";
import {DEFAULT_FORM_DATA} from "../../constants/defaultConstants";
import {playWarningSound} from "../../functions/playSoundFunctions";
import {dataToArrayForSelect, mappedSims} from "../../functions/arrayFunctions";
import {storeAddRefuelRequestReset} from "../../redux/requests/refuels/actions";
import {requiredChecker, requiredFileChecker} from "../../functions/checkerFunctions";
import {
    applySuccess,
    requestFailed,
    requestLoading,
    requestSucceeded
} from "../../functions/generalFunctions";

// Component
function OperationsClearancesAddRefuelComponent({request, sims, agents, allAgentsRequests, allSimsRequests, dispatch, handleClose}) {
    // Local state
    const [amount, setAmount] = useState(DEFAULT_FORM_DATA);
    const [doc, setDoc] = useState(constants.DEFAULT_FORM_DATA);
    const [incomingSim, setIncomingSim] = useState(DEFAULT_FORM_DATA);
    const [agent, setAgent] = useState({...DEFAULT_FORM_DATA, data: 0});

    // Local effects
    useEffect(() => {
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

    const handleIncomingSelect = (data) => {
        shouldResetErrorData();
        setIncomingSim({...incomingSim,  isValid: true, data})
    }

    const handleAgentSelect = (data) => {
        shouldResetErrorData();
        setAgent({...agent,  isValid: true, data})
    }

    const handleAmountInput = (data) => {
        shouldResetErrorData();
        setAmount({...amount, isValid: true, data})
    }

    const handleFileInput = (data) => {
        shouldResetErrorData();
        setDoc({...doc, isValid: true, data})
    }

    // Build select options
    const incomingSelectOptions = useMemo(() => {
        return dataToArrayForSelect(mappedSims(sims.filter(item => FLEET_TYPE === item.type.name)))
    }, [sims]);

    // Build select options
    const agentSelectOptions = useMemo(() => {
        return dataToArrayForSelect(agents)
    }, [agents]);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAddRefuelRequestReset());
    };

    // Trigger add supply form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _agent = requiredChecker(agent);
        const _amount = requiredChecker(amount);
        const _document = requiredFileChecker(doc);
        const _incomingSim = requiredChecker(incomingSim);
        // Set value
        setAgent(_agent);
        setDoc(_document);
        setAmount(_amount);
        setIncomingSim(_incomingSim);
        const validationOK = (
            _amount.isValid && _incomingSim.isValid &&
            _agent.isValid && _document.isValid
        );
        // Check
        if(validationOK) {
            dispatch(emitAddRefuel({
                agent: _agent.data,
                amount: _amount.data,
                sim: _incomingSim.data,
                receipt: _document.data,
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
                    <div className='col-sm-6'>
                        <AmountComponent input={amount}
                                         id='inputAmount'
                                         label='Montant à déstocker'
                                         handleInput={handleAmountInput}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <SelectComponent input={incomingSim}
                                         id='inputSimManger'
                                         label='Puce réceptrice'
                                         title='Choisir une puce'
                                         options={incomingSelectOptions}
                                         handleInput={handleIncomingSelect}
                                         requestProcessing={requestLoading(allSimsRequests)}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <FileDocumentComponent id='file'
                                               input={doc}
                                               label='Reçus'
                                               handleInput={handleFileInput}
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
OperationsClearancesAddRefuelComponent.propTypes = {
    sims: PropTypes.array.isRequired,
    agents: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    allSimsRequests: PropTypes.object.isRequired,
    allAgentsRequests: PropTypes.object.isRequired,
};

export default React.memo(OperationsClearancesAddRefuelComponent);
