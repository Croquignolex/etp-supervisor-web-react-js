import PropTypes from "prop-types";
import React, {useEffect, useMemo, useState} from 'react';

import InputComponent from "../form/InputComponent";
import {emitNewSim} from "../../redux/sims/actions";
import ButtonComponent from "../form/ButtonComponent";
import SelectComponent from "../form/SelectComponent";
import * as types from "../../constants/typeConstants";
import ErrorAlertComponent from "../ErrorAlertComponent";
import TextareaComponent from "../form/TextareaComponent";
import {emitAllAgentsFetch} from "../../redux/agents/actions";
import {emitAllAgenciesFetch} from "../../redux/agencies/actions";
import {DEFAULT_FORM_DATA} from "../../constants/defaultConstants";
import {playWarningSound} from "../../functions/playSoundFunctions";
import {dataToArrayForSelect} from "../../functions/arrayFunctions";
import {emitAllCompaniesFetch} from "../../redux/companies/actions";
import {emitAllSimsTypesFetch} from "../../redux/simsTypes/actions";
import {emitAllOperatorsFetch} from "../../redux/operators/actions";
import {emitAllCollectorsFetch} from "../../redux/collectors/actions";
import {storeAddSimRequestReset} from "../../redux/requests/sims/actions";
import {phoneChecker, requiredChecker} from "../../functions/checkerFunctions";
import {storeAllAgentsRequestReset} from "../../redux/requests/agents/actions";
import {storeAllAgenciesRequestReset} from "../../redux/requests/agencies/actions";
import {storeAllCompaniesRequestReset} from "../../redux/requests/companies/actions";
import {storeAllSimsTypesRequestReset} from "../../redux/requests/simsTypes/actions";
import {storeAllOperatorsRequestReset} from "../../redux/requests/operators/actions";
import {storeAllCollectorsRequestReset} from "../../redux/requests/collectors/actions";
import {applySuccess, requestFailed, requestLoading, requestSucceeded} from "../../functions/generalFunctions";

// Component
function SimNewComponent({request, agents, simsTypes, companies, collectors, operators,
                             agencies, dispatch, handleClose, allAgentsRequests, allSimsTypesRequests,
                             allCompaniesRequests, allCollectorsRequests, allAgenciesRequests, allOperatorsRequests}) {
    // Local state
    const [name, setName] = useState(DEFAULT_FORM_DATA);
    const [agent, setAgent] = useState(DEFAULT_FORM_DATA);
    const [number, setNumber] = useState(DEFAULT_FORM_DATA);
    const [agency, setAgency] = useState(DEFAULT_FORM_DATA);
    const [company, setCompany] = useState(DEFAULT_FORM_DATA);
    const [operator, setOperator] = useState(DEFAULT_FORM_DATA);
    const [simsType, setSimsType] = useState(DEFAULT_FORM_DATA);
    const [collector, setCollector] = useState(DEFAULT_FORM_DATA);
    const [simsTypeData, setSimsTypeData] = useState({});
    const [description, setDescription] = useState(DEFAULT_FORM_DATA);

    // Local effects
    useEffect(() => {
        dispatch(emitAllAgentsFetch());
        dispatch(emitAllAgenciesFetch());
        dispatch(emitAllCompaniesFetch());
        dispatch(emitAllSimsTypesFetch());
        dispatch(emitAllOperatorsFetch());
        dispatch(emitAllCollectorsFetch());
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

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAddSimRequestReset());
        dispatch(storeAllAgentsRequestReset());
        dispatch(storeAllAgenciesRequestReset());
        dispatch(storeAllCompaniesRequestReset());
        dispatch(storeAllSimsTypesRequestReset());
        dispatch(storeAllOperatorsRequestReset());
        dispatch(storeAllCollectorsRequestReset());
    };

    const handleDescriptionInput = (data) => {
        shouldResetErrorData();
        setDescription({...description, isValid: true, data})
    }

    const handleNameInput = (data) => {
        shouldResetErrorData();
        setName({...name, isValid: true, data})
    }

    const handleNumberInput = (data) => {
        shouldResetErrorData();
        setNumber({...number, isValid: true, data})
    }

    const handleTypeSelect = (data) => {
        shouldResetErrorData();
        // reinitialize selects
        setAgent(DEFAULT_FORM_DATA)
        setAgency(DEFAULT_FORM_DATA)
        setCompany(DEFAULT_FORM_DATA)
        setCollector(DEFAULT_FORM_DATA)

        setSimsType({...simsType,  isValid: true, data})
        setSimsTypeData(simsTypes.find(item => item.id === data))
    }

    const handleAgentSelect = (data) => {
        shouldResetErrorData();
        setAgent({...agent,  isValid: true, data})
    }

    const handleCompanySelect = (data) => {
        shouldResetErrorData();
        setCompany({...company,  isValid: true, data})
    }

    const handleAgencySelect = (data) => {
        shouldResetErrorData();
        setAgency({...agency,  isValid: true, data})
    }

    const handleCollectorSelect = (data) => {
        shouldResetErrorData();
        setCollector({...collector,  isValid: true, data})
    }

    const handleOperatorSelect = (data) => {
        shouldResetErrorData();
        setOperator({...operator, isValid: true, data})
    }

    // Build select options
    const typeSelectOptions = useMemo(() => {
        return dataToArrayForSelect(simsTypes);
    }, [simsTypes]);

    // Build select options
    const agentSelectOptions = useMemo(() => {
        return dataToArrayForSelect(agents.filter(agent => types.AGENT_TYPE === agent.reference));
    }, [agents]);

    // Build select options
    const companySelectOptions = useMemo(() => {
        return dataToArrayForSelect(companies);
    }, [companies]);

    // Build select options
    const agencySelectOptions = useMemo(() => {
        return dataToArrayForSelect(agencies);
    }, [agencies]);

    // Build select options
    const collectorSelectOptions = useMemo(() => {
        return dataToArrayForSelect(collectors);
    }, [collectors]);

    // Build select options
    const operatorSelectOptions = useMemo(() => {
        return dataToArrayForSelect(operators);
    }, [operators]);

    // Trigger user information form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        shouldResetErrorData();
        const _name = requiredChecker(name);
        const _number = phoneChecker(number);
        const _agent = requiredChecker(agent);
        const _agency = requiredChecker(agency);
        const _company = requiredChecker(company);
        const _simsType = requiredChecker(simsType);
        const _operator = requiredChecker(operator);
        const _collector = requiredChecker(collector);
        // Set value
        setName(_name);
        setAgent(_agent);
        setNumber(_number);
        setAgency(_agency);
        setCompany(_company);
        setSimsType(_simsType);
        setOperator(_operator);
        setCollector(_collector);

        let reference = null;
        let validationOK = _simsType.isValid && _name.isValid && _number.isValid && _operator.isValid;

        if(simsTypeData.needAgent) {
            validationOK = validationOK && _agent.isValid;
            reference = types.AGENT_TYPE;
        } else if(simsTypeData.needResource) {
            validationOK = validationOK && _agency.isValid;
        } else if(simsTypeData.needCollector) {
            validationOK = validationOK && _collector.isValid
        } else if(simsTypeData.needCompany) {
            validationOK = validationOK && _company.isValid
        }

        // Check
        if(validationOK) {
            dispatch(emitNewSim({
                reference,
                name: _name.data,
                agent: _agent.data,
                agency: _agency.data,
                number: _number.data,
                company: _company.data,
                simType: _simsType.data,
                operator: _operator.data,
                collector: _collector.data,
                description: description.data,
            }));
        }
        else playWarningSound();
    };

    // Render
    return (
        <div>
            {requestFailed(request) && <ErrorAlertComponent message={request.message} />}
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className='col-sm-6'>
                        <SelectComponent label='Type'
                                         id='inputType'
                                         input={simsType}
                                         title='Choisir un type'
                                         options={typeSelectOptions}
                                         handleInput={handleTypeSelect}
                                         requestProcessing={requestLoading(allSimsTypesRequests)}
                        />
                    </div>
                    {simsTypeData.needAgent &&  (
                        <div className='col-sm-6'>
                            <SelectComponent label='Agent'
                                             input={agent}
                                             id='inputAgent'
                                             title='Choisir un agent'
                                             options={agentSelectOptions}
                                             handleInput={handleAgentSelect}
                                             requestProcessing={requestLoading(allAgentsRequests)}
                            />
                        </div>
                    )}
                    {simsTypeData.needResource &&  (
                        <div className='col-sm-6'>
                            <SelectComponent label='Agence'
                                             input={agency}
                                             id='inputResource'
                                             title='Choisir une agence'
                                             options={agencySelectOptions}
                                             handleInput={handleAgencySelect}
                                             requestProcessing={requestLoading(allAgenciesRequests)}
                            />
                        </div>
                    )}
                    {simsTypeData.needCompany &&  (
                        <div className='col-sm-6'>
                            <SelectComponent label='Entreprise'
                                             input={company}
                                             id='inputCompany'
                                             title='Choisir une entreprise'
                                             options={companySelectOptions}
                                             handleInput={handleCompanySelect}
                                             requestProcessing={requestLoading(allCompaniesRequests)}
                            />
                        </div>
                    )}
                    {simsTypeData.needCollector &&  (
                        <div className='col-sm-6'>
                            <SelectComponent input={collector}
                                             label='Responsable de zone'
                                             id='inputCollector'
                                             options={collectorSelectOptions}
                                             handleInput={handleCollectorSelect}
                                             title='Choisir un responsable de zone'
                                             requestProcessing={requestLoading(allCollectorsRequests)}
                            />
                        </div>
                    )}
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <InputComponent label='Nom'
                                        type='text'
                                        input={name}
                                        id='inputName'
                                        handleInput={handleNameInput}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <InputComponent type='text'
                                        label='Numéro'
                                        input={number}
                                        id='inputNumber'
                                        handleInput={handleNumberInput}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-6'>
                        <SelectComponent input={operator}
                                         label='Opérateur'
                                         id='inputOperator'
                                         title='Choisir un opérateur'
                                         options={operatorSelectOptions}
                                         handleInput={handleOperatorSelect}
                                         requestProcessing={requestLoading(allOperatorsRequests)}
                        />
                    </div>
                    <div className='col-sm-6'>
                        <TextareaComponent label='Description'
                                           input={description}
                                           id='inputDescription'
                                           handleInput={handleDescriptionInput}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <ButtonComponent processing={requestLoading(request)} />
                </div>
            </form>
        </div>
    )
}

// Prop types to ensure destroyed props data type
SimNewComponent.propTypes = {
    agents: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    agencies: PropTypes.array.isRequired,
    request: PropTypes.object.isRequired,
    simsTypes: PropTypes.array.isRequired,
    companies: PropTypes.array.isRequired,
    operators: PropTypes.array.isRequired,
    collectors: PropTypes.array.isRequired,
    handleClose: PropTypes.func.isRequired,
    allAgentsRequests: PropTypes.object.isRequired,
    allAgenciesRequests: PropTypes.object.isRequired,
    allSimsTypesRequests: PropTypes.object.isRequired,
    allCompaniesRequests: PropTypes.object.isRequired,
    allOperatorsRequests: PropTypes.object.isRequired,
    allCollectorsRequests: PropTypes.object.isRequired,
};

export default React.memo(SimNewComponent);
