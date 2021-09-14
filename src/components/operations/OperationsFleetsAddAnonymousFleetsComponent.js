import PropTypes from "prop-types";
import React, {useEffect, useMemo, useState} from 'react';

import InputComponent from "../form/InputComponent";
import ButtonComponent from "../form/ButtonComponent";
import AmountComponent from "../form/AmountComponent";
import SelectComponent from "../form/SelectComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import CheckBoxComponent from "../form/CheckBoxComponent";
import {emitAllZonesFetch} from "../../redux/zones/actions";
import {emitAllMasterSimsFetch} from "../../redux/sims/actions";
import {DEFAULT_FORM_DATA} from "../../constants/defaultConstants";
import {playWarningSound} from "../../functions/playSoundFunctions";
import {emitAddAnonymousSupply} from "../../redux/supplies/actions";
import {phoneChecker, requiredChecker} from "../../functions/checkerFunctions";
import {dataToArrayForSelect, mappedSims} from "../../functions/arrayFunctions";
import {storeAllMasterSimsRequestReset} from "../../redux/requests/sims/actions";
import {storeAddAnonymousSupplyRequestReset} from "../../redux/requests/supplies/actions";
import {applySuccess, requestFailed, requestLoading, requestSucceeded} from "../../functions/generalFunctions";
import {storeAllZonesRequestReset} from "../../redux/requests/zones/actions";

// Component
function OperationsFleetsAddAnonymousFleetsComponent({request, sims, simsRequests, zones, zonesRequests, dispatch, handleClose}) {
    // Local state
    const [zone, setZone] = useState(DEFAULT_FORM_DATA);
    const [amount, setAmount] = useState(DEFAULT_FORM_DATA);
    const [receiver, setReceiver] = useState(DEFAULT_FORM_DATA);
    const [directPay, setDirectPay] = useState(false);
    const [outgoingSim, setOutgoingSim] = useState(DEFAULT_FORM_DATA);
    const [receiverSim, setReceiverSim] = useState(DEFAULT_FORM_DATA);

    // Local effects
    useEffect(() => {
        dispatch(emitAllZonesFetch());
        dispatch(emitAllMasterSimsFetch());
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
        setOutgoingSim({...outgoingSim,  isValid: true, data})
    }

    const handleZoneSelect = (data) => {
        shouldResetErrorData();
        setZone({...zone, isValid: true, data})
    }

    const handleDirectPaySelect = (data) => {
        shouldResetErrorData();
        setDirectPay(!data)
    }

    const handleAmountInput = (data) => {
        shouldResetErrorData();
        setAmount({...amount, isValid: true, data})
    }

    const handleReceiverInput = (data) => {
        shouldResetErrorData();
        setReceiver({...receiver, isValid: true, data})
    }

    const handleReceiverSimInput = (data) => {
        shouldResetErrorData();
        setReceiverSim({...receiverSim, isValid: true, data})
    }

    // Build select options
    const outgoingSelectOptions = useMemo(() => {
        return dataToArrayForSelect(mappedSims(sims))
    }, [sims]);

    // Build select options
    const zoneSelectOptions = useMemo(() => {
        return dataToArrayForSelect(zones)
    }, [zones]);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAllZonesRequestReset());
        dispatch(storeAllMasterSimsRequestReset());
        dispatch(storeAddAnonymousSupplyRequestReset());
    };

    // Trigger add supply form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _zone = requiredChecker(zone);
        const _amount = requiredChecker(amount);
        const _receiver = requiredChecker(receiver);
        const _receiverSim = phoneChecker(receiverSim);
        const _outgoingSim = requiredChecker(outgoingSim);
        // Set value
        setZone(_zone);
        setAmount(_amount);
        setReceiver(_receiver);
        setReceiverSim(_receiverSim);
        setOutgoingSim(_outgoingSim);
        const validationOK = (
            _amount.isValid && _receiver.isValid && _outgoingSim.isValid &&
            _receiverSim.isValid && _zone.isValid
        );
        // Check
        if(validationOK) {
            dispatch(emitAddAnonymousSupply({
                pay: directPay,
                zone: _zone.data,
                amount: _amount.data,
                sim: _outgoingSim.data,
                receiver: _receiver.data,
                receiverSim: _receiverSim.data,
            }));
        }
        else playWarningSound();
    };

    // Render
    return (
        <>
            {requestFailed(request) && <ErrorAlertComponent message={request.message} />}
            {requestFailed(simsRequests) && <ErrorAlertComponent message={simsRequests.message} />}
            {requestFailed(zonesRequests) && <ErrorAlertComponent message={zonesRequests.message} />}
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-sm-6'>
                        <SelectComponent input={outgoingSim}
                                         id='inputSimManger'
                                         label='Compte émetteur'
                                         title='Choisir un compte'
                                         options={outgoingSelectOptions}
                                         handleInput={handleOutgoingSelect}
                                         requestProcessing={requestLoading(simsRequests)}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <AmountComponent input={amount}
                                         id='inputFleet'
                                         label='Flotte à transférer'
                                         handleInput={handleAmountInput}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <InputComponent type='text'
                                        input={receiver}
                                        id='inputAnonymousName'
                                        label="Nom de l'agent anonyme"
                                        handleInput={handleReceiverInput}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <InputComponent type='text'
                                        input={receiverSim}
                                        id='inputAnonymousSim'
                                        label="Compte de l'agent anonyme"
                                        handleInput={handleReceiverSimInput}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <SelectComponent input={zone}
                                         label='Zone'
                                         id='inputZone'
                                         title='Choisir une zone'
                                         options={zoneSelectOptions}
                                         handleInput={handleZoneSelect}
                                         requestProcessing={requestLoading(zonesRequests)}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <label htmlFor="inputAutoPay">Paiement immédiat?</label>
                        <CheckBoxComponent input={directPay}
                                           id='inputAutoPay'
                                           handleInput={handleDirectPaySelect}
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
OperationsFleetsAddAnonymousFleetsComponent.propTypes = {
    sims: PropTypes.array.isRequired,
    zones: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    simsRequests: PropTypes.object.isRequired,
    zonesRequests: PropTypes.object.isRequired,
};

export default React.memo(OperationsFleetsAddAnonymousFleetsComponent);
