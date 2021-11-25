import PropTypes from 'prop-types';
import React, {useEffect, useMemo, useState} from 'react';

import * as path from "../constants/pagePathConstants";
import {emitAllSimsFetch} from "../redux/sims/actions";
import {MASTER_TYPE} from "../constants/typeConstants";
import {emitAllZonesFetch} from "../redux/zones/actions";
import * as setting from "../constants/settingsConstants";
import {emitAllAgentsFetch} from "../redux/agents/actions";
import HeaderComponent from "../components/HeaderComponent";
import LoaderComponent from "../components/LoaderComponent";
import {emitAllVendorsFetch} from "../redux/vendors/actions";
import {DASHBOARD_PAGE} from "../constants/pageNameConstants";
import {emitAllManagersFetch} from "../redux/managers/actions";
import {emitAllCompaniesFetch} from "../redux/companies/actions";
import {emitAllResourcesFetch} from "../redux/resources/actions";
import {emitAllOperatorsFetch} from "../redux/operators/actions";
import {emitAllOverseersFetch} from "../redux/overseers/actions";
import AppLayoutContainer from "../containers/AppLayoutContainer";
import {emitAllCollectorsFetch} from "../redux/collectors/actions";
import ErrorAlertComponent from "../components/ErrorAlertComponent";
import {emitAllSupervisorsFetch} from "../redux/supervisors/actions";
import {emitAllAccountantsFetch} from "../redux/accountants/actions";
import {storeAllSimsRequestReset} from "../redux/requests/sims/actions";
import {storeAllZonesRequestReset} from "../redux/requests/zones/actions";
import {emitAllAdministratorsFetch} from "../redux/administrators/actions";
import {storeAllAgentsRequestReset} from "../redux/requests/agents/actions";
import DeleteModalComponent from "../components/modals/DeleteModalComponent";
import {storeAllVendorsRequestReset} from "../redux/requests/vendors/actions";
import {storeAllManagersRequestReset} from "../redux/requests/managers/actions";
import {emitFetchUserBalance, emitUserFactoryReset} from "../redux/user/actions";
import {storeAllCompaniesRequestReset} from "../redux/requests/companies/actions";
import {storeAllOperatorsRequestReset} from "../redux/requests/operators/actions";
import {storeAllOverseersRequestReset} from "../redux/requests/overseers/actions";
import {storeAllResourcesRequestReset} from "../redux/requests/resources/actions";
import DashboardCardComponent from "../components/dashboard/DashboardCardComponent";
import {storeAllCollectorsRequestReset} from "../redux/requests/collectors/actions";
import {storeAllSupervisorsRequestReset} from "../redux/requests/supervisors/actions";
import {storeAllAccountantsRequestReset} from "../redux/requests/accountants/actions";
import {storeAllAdministratorsRequestReset} from "../redux/requests/administrators/actions";
import DashboardWithOperatorCardComponent from "../components/dashboard/DashboardWithOperatorCardComponent";
import {storeUserBalanceFetchRequestReset, storeUserFactoryResetRequestReset} from "../redux/requests/user/actions";
import {applySuccess, formatNumber, requestFailed, requestLoading, requestSucceeded} from "../functions/generalFunctions";

// Component
function DashboardPage({allResourcesRequests, resources, agents,
                           overseers, accountants, settings, dispatch,
                           balanceUserRequests, allVendorsRequests, administrators,
                           supervisors, managers, collectors, companies, sims, zones, location, vendors,
                           operators, user, allAgentsRequests, allAdministratorsRequests, allOverseersRequests,
                           allSupervisorsRequests, allManagersRequests, allCollectorsRequests, allAccountantsRequests,
                           allCompaniesRequests, allSimsRequests, allZonesRequests, allOperatorsRequests, resetUserRequests}) {
    // Local states
    const [confirmModal, setConfirmModal] = useState({show: false, body: '', id: 0});

    // Local effects
    useEffect(() => {
        fillDashboardData();
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Local effects
    useEffect(() => {
        // Reset inputs while toast (well done) into current scope
        if(requestSucceeded(resetUserRequests)) {
            applySuccess(resetUserRequests.message);
            fillDashboardData();
        }
        // eslint-disable-next-line
    }, [resetUserRequests]);

    // Fill dashboard
    const fillDashboardData = () => {
        dispatch(emitAllSimsFetch());
        dispatch(emitAllZonesFetch());
        dispatch(emitAllAgentsFetch());
        dispatch(emitAllVendorsFetch());
        dispatch(emitFetchUserBalance());
        dispatch(emitAllManagersFetch());
        dispatch(emitAllCompaniesFetch());
        dispatch(emitAllOperatorsFetch());
        dispatch(emitAllOverseersFetch());
        dispatch(emitAllResourcesFetch());
        dispatch(emitAllCollectorsFetch());
        dispatch(emitAllSupervisorsFetch());
        dispatch(emitAllAccountantsFetch());
        dispatch(emitAllAdministratorsFetch());
    }

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAllSimsRequestReset());
        dispatch(storeAllZonesRequestReset());
        dispatch(storeAllAgentsRequestReset());
        dispatch(storeAllVendorsRequestReset());
        dispatch(storeAllManagersRequestReset());
        dispatch(storeAllCompaniesRequestReset());
        dispatch(storeAllOverseersRequestReset());
        dispatch(storeAllOperatorsRequestReset());
        dispatch(storeAllResourcesRequestReset());
        dispatch(storeAllCollectorsRequestReset());
        dispatch(storeAllSupervisorsRequestReset());
        dispatch(storeAllAccountantsRequestReset());
        dispatch(storeUserFactoryResetRequestReset());
        dispatch(storeUserBalanceFetchRequestReset());
        dispatch(storeAllAdministratorsRequestReset());
    };

    // Data
    const cardsData = settings.cards;
    const mtnFleetSimsFleetsData = useMemo(() => {
        const data = sims.filter(sim => ((sim.operator.id === '1') && (sim.type.name === MASTER_TYPE)));
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.balance, 10), 0)
        return {number, value}
    }, [sims]);
    const orangeFleetSimsFleetsData = useMemo(() => {
        const data = sims.filter(sim => ((sim.operator.id === '2') && (sim.type.name === MASTER_TYPE)));
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.balance, 10), 0)
        return {number, value}
    }, [sims]);
    const yupFleetSimsFleetsData = useMemo(() => {
        const data = sims.filter(sim => ((sim.operator.id === '3') && (sim.type.name === MASTER_TYPE)));
        const number = data.length
        const value = data.reduce((acc, val) => acc + parseInt(val.balance, 10), 0)
        return {number, value}
    }, [sims]);

    // Show confirm modal form
    const handleConfirmModalShow = () => {
        setConfirmModal({
            ...confirmModal,
            body: `
                Confirmer la rémise à zéro du système?
                Toutes des transactions seront perdus.
                Pensez à les sauvegarder avant d'éffectuer la rémise à zéro
            `,
            show: true
        });
    }

    // Hide confirm modal form
    const handleConfirmModalHide = () => {
        setConfirmModal({...confirmModal, show: false})
    }

    // Trigger when clearance confirm confirmed on modal
    const handleConfirm = () => {
        handleConfirmModalHide();
        dispatch(emitUserFactoryReset());
    };

    // Render
    return (
        <div>
            <AppLayoutContainer pathname={location.pathname}>
                <div className="content-wrapper">
                    <HeaderComponent title={DASHBOARD_PAGE} icon={'fa fa-tachometer-alt'} />
                    <section className="content">
                        <div className='container-fluid'>
                            <div className="row">
                                <div className="col">
                                    {requestFailed(resetUserRequests) && <ErrorAlertComponent message={resetUserRequests.message} />}
                                    {requestLoading(resetUserRequests) ? <div className='small-box'><LoaderComponent /></div> : (
                                        <button type="button"
                                                onClick={handleConfirmModalShow}
                                                className="btn btn-theme mr-2 mb-2"
                                        >
                                            <i className="fa fa-backward" /> Rémise à zéro
                                        </button>
                                    )}
                                </div>
                            </div>
                            {!requestLoading(resetUserRequests) && (
                                <>
                                    {/* Cash */}
                                    <div className="row">
                                        {cardsData.includes(setting.CARD_BALANCE) &&
                                        <div className="col-lg-3 col-md-4 col-sm-6">
                                            <DashboardCardComponent color='bg-dark'
                                                                    icon='fa fa-coins'
                                                                    url={path.PROFILE_PAGE_PATH}
                                                                    label={setting.LABEL_BALANCE}
                                                                    request={balanceUserRequests}
                                                                    data={formatNumber(user.balance)}
                                            />
                                        </div>
                                        }
                                    </div>
                                    {/*  Fleet balance */}
                                    <div className="row">
                                        {cardsData.includes(setting.CARD_FLEET_SIMS_FLEETS_MTN) &&
                                        <div className="col-lg-3 col-md-4 col-sm-6">
                                            <DashboardWithOperatorCardComponent color='bg-secondary'
                                                                                operator={{id: '1'}}
                                                                                request={allSimsRequests}
                                                                                url={path.FLEETS_SIMS_PAGE_PATH}
                                                                                data={formatNumber(mtnFleetSimsFleetsData.value)}
                                                                                label={`${setting.LABEL_FLEET_SIMS_FLEETS_MTN} (${mtnFleetSimsFleetsData.number})`}
                                            />
                                        </div>
                                        }
                                        {cardsData.includes(setting.CARD_FLEET_SIMS_FLEETS_ORANGE) &&
                                        <div className="col-lg-3 col-md-4 col-sm-6">
                                            <DashboardWithOperatorCardComponent color='bg-secondary'
                                                                                operator={{id: '2'}}
                                                                                request={allSimsRequests}
                                                                                url={path.FLEETS_SIMS_PAGE_PATH}
                                                                                data={formatNumber(orangeFleetSimsFleetsData.value)}
                                                                                label={`${setting.LABEL_FLEET_SIMS_FLEETS_ORANGE} (${orangeFleetSimsFleetsData.number})`}
                                            />
                                        </div>
                                        }
                                        {cardsData.includes(setting.CARD_FLEET_SIMS_FLEETS_YUP) &&
                                        <div className="col-lg-3 col-md-4 col-sm-6">
                                            <DashboardWithOperatorCardComponent color='bg-secondary'
                                                                                operator={{id: '3'}}
                                                                                request={allSimsRequests}
                                                                                url={path.FLEETS_SIMS_PAGE_PATH}
                                                                                data={formatNumber(yupFleetSimsFleetsData.value)}
                                                                                label={`${setting.LABEL_FLEET_SIMS_FLEETS_YUP} (${yupFleetSimsFleetsData.number})`}
                                            />
                                        </div>
                                        }
                                    </div>
                                    {/* Others */}
                                    <div className="row">
                                        {cardsData.includes(setting.CARD_ADMINS) &&
                                        <div className="col-lg-3 col-md-4 col-sm-6">
                                            <DashboardCardComponent color='bg-danger'
                                                                    icon='fa fa-user-secret'
                                                                    url={path.ADMINS_PAGE_PATH}
                                                                    label={setting.LABEL_ADMINS}
                                                                    data={administrators.length}
                                                                    request={allAdministratorsRequests}
                                            />
                                        </div>
                                        }
                                        {cardsData.includes(setting.CARD_OVERSEERS) &&
                                        <div className="col-lg-3 col-md-4 col-sm-6">
                                            <DashboardCardComponent color='bg-success'
                                                                    data={overseers.length}
                                                                    icon='fa fa-user-astronaut'
                                                                    url={path.OVERSEERS_PAGE_PATH}
                                                                    label={setting.LABEL_OVERSEERS}
                                                                    request={allOverseersRequests}
                                            />
                                        </div>
                                        }
                                        {cardsData.includes(setting.CARD_SUPERVISORS) &&
                                        <div className="col-lg-3 col-md-4 col-sm-6">
                                            <DashboardCardComponent color='bg-warning'
                                                                    data={supervisors.length}
                                                                    icon='fa fa-user-astronaut'
                                                                    request={allSupervisorsRequests}
                                                                    url={path.SUPERVISORS_PAGE_PATH}
                                                                    label={setting.LABEL_SUPERVISORS}
                                            />
                                        </div>
                                        }
                                        {cardsData.includes(setting.CARD_ACCOUNTANTS) &&
                                        <div className="col-lg-3 col-md-4 col-sm-6">
                                            <DashboardCardComponent color='bg-primary'
                                                                    icon='fa fa-user-shield'
                                                                    data={accountants.length}
                                                                    url={path.ACCOUNTANTS_PAGE_PATH}
                                                                    request={allAccountantsRequests}
                                                                    label={setting.LABEL_ACCOUNTANTS}
                                            />
                                        </div>
                                        }
                                        {cardsData.includes(setting.CARD_MANAGERS) &&
                                        <div className="col-lg-3 col-md-4 col-sm-6">
                                            <DashboardCardComponent color='bg-success'
                                                                    icon='fa fa-user-tag'
                                                                    data={managers.length}
                                                                    request={allManagersRequests}
                                                                    url={path.MANAGERS_PAGE_PATH}
                                                                    label={setting.LABEL_MANAGERS}
                                            />
                                        </div>
                                        }
                                        {cardsData.includes(setting.CARD_COLLECTORS) &&
                                        <div className="col-lg-3 col-md-4 col-sm-6">
                                            <DashboardCardComponent color='bg-warning'
                                                                    icon='fa fa-user-clock'
                                                                    data={collectors.length}
                                                                    request={allCollectorsRequests}
                                                                    url={path.COLLECTORS_PAGE_PATH}
                                                                    label={setting.LABEL_COLLECTORS}
                                            />
                                        </div>
                                        }
                                        {cardsData.includes(setting.CARD_AGENTS) &&
                                        <div className="col-lg-3 col-md-4 col-sm-6">
                                            <DashboardCardComponent color='bg-primary'
                                                                    data={agents.length}
                                                                    icon='fa fa-user-cog'
                                                                    request={allAgentsRequests}
                                                                    url={path.AGENTS_PAGE_PATH}
                                                                    label={setting.LABEL_AGENTS}
                                            />
                                        </div>
                                        }
                                        {cardsData.includes(setting.CARD_RESOURCES) &&
                                        <div className="col-lg-3 col-md-4 col-sm-6">
                                            <DashboardCardComponent color='bg-info'
                                                                    icon='fa fa-user-lock'
                                                                    data={resources.length}
                                                                    request={allResourcesRequests}
                                                                    url={path.RESOURCES_PAGE_PATH}
                                                                    label={setting.LABEL_RESOURCES}
                                            />
                                        </div>
                                        }
                                        {cardsData.includes(setting.CARD_COMPANIES) &&
                                        <div className="col-lg-3 col-md-4 col-sm-6">
                                            <DashboardCardComponent color='bg-danger'
                                                                    data={companies.length}
                                                                    icon='fa fa-university'
                                                                    request={allCompaniesRequests}
                                                                    url={path.COMPANIES_PAGE_PATH}
                                                                    label={setting.LABEL_COMPANIES}
                                            />
                                        </div>
                                        }
                                        {cardsData.includes(setting.CARD_SIMS) &&
                                        <div className="col-lg-3 col-md-4 col-sm-6">
                                            <DashboardCardComponent color='bg-primary'
                                                                    data={sims.length}
                                                                    icon='fa fa-sim-card'
                                                                    request={allSimsRequests}
                                                                    label={setting.LABEL_SIMS}
                                                                    url={path.ALL_SIMS_PAGE_PATH}
                                            />
                                        </div>
                                        }
                                        {cardsData.includes(setting.CARD_ZONES) &&
                                        <div className="col-lg-3 col-md-4 col-sm-6">
                                            <DashboardCardComponent icon='fa fa-map'
                                                                    color='bg-success'
                                                                    data={zones.length}
                                                                    request={allZonesRequests}
                                                                    url={path.ZONES_PAGE_PATH}
                                                                    label={setting.LABEL_ZONES}
                                            />
                                        </div>
                                        }
                                        {cardsData.includes(setting.CARD_OPERATORS) &&
                                        <div className="col-lg-3 col-md-4 col-sm-6">
                                            <DashboardCardComponent color='bg-danger'
                                                                    icon='fa fa-globe'
                                                                    data={operators.length}
                                                                    request={allOperatorsRequests}
                                                                    url={path.OPERATORS_PAGE_PATH}
                                                                    label={setting.LABEL_OPERATORS}
                                            />
                                        </div>
                                        }
                                        {cardsData.includes(setting.CARD_VENDORS) &&
                                        <div className="col-lg-3 col-md-4 col-sm-6">
                                            <DashboardCardComponent color='bg-info'
                                                                    data={vendors.length}
                                                                    icon='fa fa-user-ninja'
                                                                    request={allVendorsRequests}
                                                                    url={path.VENDORS_PAGE_PATH}
                                                                    label={setting.LABEL_VENDORS}
                                            />
                                        </div>
                                        }
                                    </div>
                                </>
                            )}
                        </div>
                    </section>
                </div>
            </AppLayoutContainer>
            {/* Modal */}
            <DeleteModalComponent modal={confirmModal}
                                  handleModal={handleConfirm}
                                  handleClose={handleConfirmModalHide}
            />
        </div>
    )
}

// Prop types to ensure destroyed props data type
DashboardPage.propTypes = {
    sims: PropTypes.array.isRequired,
    zones: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    agents: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    vendors: PropTypes.array.isRequired,
    managers: PropTypes.array.isRequired,
    operators: PropTypes.array.isRequired,
    companies: PropTypes.array.isRequired,
    overseers: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    collectors: PropTypes.array.isRequired,
    supervisors: PropTypes.array.isRequired,
    accountants: PropTypes.array.isRequired,
    administrators: PropTypes.array.isRequired,
    allSimsRequests: PropTypes.object.isRequired,
    allZonesRequests: PropTypes.object.isRequired,
    resetUserRequests: PropTypes.object.isRequired,
    allAgentsRequests: PropTypes.object.isRequired,
    allVendorsRequests: PropTypes.object.isRequired,
    balanceUserRequests: PropTypes.object.isRequired,
    allManagersRequests: PropTypes.object.isRequired,
    allCompaniesRequests: PropTypes.object.isRequired,
    allOperatorsRequests: PropTypes.object.isRequired,
    allOverseersRequests: PropTypes.object.isRequired,
    allCollectorsRequests: PropTypes.object.isRequired,
    allSupervisorsRequests: PropTypes.object.isRequired,
    allAccountantsRequests: PropTypes.object.isRequired,
    allAdministratorsRequests: PropTypes.object.isRequired,
};

export default React.memo(DashboardPage);
