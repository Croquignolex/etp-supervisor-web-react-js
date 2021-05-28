import PropTypes from 'prop-types';
import React, {useEffect, useMemo} from 'react';

import * as types from "../constants/typeConstants";
import * as path from "../constants/pagePathConstants";
import {emitAllSimsFetch} from "../redux/sims/actions";
import {emitAllZonesFetch} from "../redux/zones/actions";
import * as setting from "../constants/settingsConstants";
import {formatNumber} from "../functions/generalFunctions";
import {emitAllAgentsFetch} from "../redux/agents/actions";
import {emitFetchUserBalance} from "../redux/user/actions";
import HeaderComponent from "../components/HeaderComponent";
import {DASHBOARD_PAGE} from "../constants/pageNameConstants";
import {emitAllManagersFetch} from "../redux/managers/actions";
import {emitAllCompaniesFetch} from "../redux/companies/actions";
import {emitAllOperatorsFetch} from "../redux/operators/actions";
import AppLayoutContainer from "../containers/AppLayoutContainer";
import {emitAllCollectorsFetch} from "../redux/collectors/actions";
import {emitAllSupervisorsFetch} from "../redux/supervisors/actions";
import {storeAllSimsRequestReset} from "../redux/requests/sims/actions";
import {storeAllZonesRequestReset} from "../redux/requests/zones/actions";
import {emitAllAdministratorsFetch} from "../redux/administrators/actions";
import {storeAllAgentsRequestReset} from "../redux/requests/agents/actions";
import {storeAllManagersRequestReset} from "../redux/requests/managers/actions";
import {storeUserBalanceFetchRequestReset} from "../redux/requests/user/actions";
import {storeAllCompaniesRequestReset} from "../redux/requests/companies/actions";
import {storeAllOperatorsRequestReset} from "../redux/requests/operators/actions";
import DashboardCardComponent from "../components/dashboard/DashboardCardComponent";
import {storeAllCollectorsRequestReset} from "../redux/requests/collectors/actions";
import {storeAllSupervisorsRequestReset} from "../redux/requests/supervisors/actions";
import {storeAllAdministratorsRequestReset} from "../redux/requests/administrators/actions";

// Component
function DashboardPage({agents, settings, dispatch, location, administrators,
                           supervisors, managers, collectors, companies, sims, zones,
                           operators, user, allAgentsRequests, allAdministratorsRequests,
                           allSupervisorsRequests, allManagersRequests, allCollectorsRequests,
                           allCompaniesRequests, allSimsRequests, allZonesRequests, allOperatorsRequests, balanceUserRequests}) {
    // Local effects
    useEffect(() => {
        dispatch(emitAllSimsFetch());
        dispatch(emitAllZonesFetch());
        dispatch(emitAllAgentsFetch());
        dispatch(emitFetchUserBalance());
        dispatch(emitAllManagersFetch());
        dispatch(emitAllCompaniesFetch());
        dispatch(emitAllOperatorsFetch());
        dispatch(emitAllCollectorsFetch());
        dispatch(emitAllSupervisorsFetch());
        dispatch(emitAllAdministratorsFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAllSimsRequestReset());
        dispatch(storeAllZonesRequestReset());
        dispatch(storeAllAgentsRequestReset());
        dispatch(storeAllManagersRequestReset());
        dispatch(storeAllCompaniesRequestReset());
        dispatch(storeAllOperatorsRequestReset());
        dispatch(storeAllCollectorsRequestReset());
        dispatch(storeAllSupervisorsRequestReset());
        dispatch(storeUserBalanceFetchRequestReset());
        dispatch(storeAllAdministratorsRequestReset());
    };

    // Data
    const cardsData = settings.cards;
    const resourcesData = useMemo(() => {
        return agents.filter(agent => types.RESOURCE_TYPE === agent.reference).length
        // eslint-disable-next-line
    }, [agents]);

    // Render
    return (
        <AppLayoutContainer pathname={location.pathname}>
            <div className="content-wrapper">
                <HeaderComponent title={DASHBOARD_PAGE} icon={'fa fa-tachometer-alt'} />
                <section className="content">
                    <div className='container-fluid'>
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
                            {cardsData.includes(setting.CARD_SUPERVISORS) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent color='bg-warning'
                                                            data={supervisors.length}
                                                            icon='fa fa-user-astronaut'
                                                            url={path.SUPERVISORS_PAGE_PATH}
                                                            label={setting.LABEL_SUPERVISORS}
                                                            request={allSupervisorsRequests}
                                    />
                                </div>
                            }
                            {cardsData.includes(setting.CARD_MANAGERS) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent color='bg-success'
                                                            icon='fa fa-user-tag'
                                                            data={managers.length}
                                                            url={path.MANAGERS_PAGE_PATH}
                                                            label={setting.LABEL_MANAGERS}
                                                            request={allManagersRequests}
                                    />
                                </div>
                            }
                            {cardsData.includes(setting.CARD_COLLECTORS) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent color='bg-warning'
                                                            icon='fa fa-user-clock'
                                                            data={collectors.length}
                                                            url={path.COLLECTORS_PAGE_PATH}
                                                            label={setting.LABEL_COLLECTORS}
                                                            request={allCollectorsRequests}
                                    />
                                </div>
                            }
                            {cardsData.includes(setting.CARD_AGENTS) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent color='bg-primary'
                                                            icon='fa fa-user-cog'
                                                            request={allAgentsRequests}
                                                            url={path.AGENTS_PAGE_PATH}
                                                            label={setting.LABEL_AGENTS}
                                                            data={agents.length - resourcesData}
                                    />
                                </div>
                            }
                            {cardsData.includes(setting.CARD_RESOURCES) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent color='bg-info'
                                                            data={resourcesData}
                                                            icon='fa fa-user-lock'
                                                            url={path.AGENTS_PAGE_PATH}
                                                            request={allAgentsRequests}
                                                            label={setting.LABEL_RESOURCES}
                                    />
                                </div>
                            }
                            {cardsData.includes(setting.CARD_COMPANIES) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent color='bg-danger'
                                                            data={companies.length}
                                                            icon='fa fa-university'
                                                            url={path.COMPANIES_PAGE_PATH}
                                                            label={setting.LABEL_COMPANIES}
                                                            request={allCompaniesRequests}
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
                                                            url={path.ZONES_PAGE_PATH}
                                                            label={setting.LABEL_ZONES}
                                                            request={allZonesRequests}
                                    />
                                </div>
                            }
                            {cardsData.includes(setting.CARD_OPERATORS) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent color='bg-primary'
                                                            icon='fa fa-globe'
                                                            data={operators.length}
                                                            url={path.OPERATORS_PAGE_PATH}
                                                            label={setting.LABEL_OPERATORS}
                                                            request={allOperatorsRequests}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </section>
            </div>
        </AppLayoutContainer>
    )
}

// Prop types to ensure destroyed props data type
DashboardPage.propTypes = {
    sims: PropTypes.array.isRequired,
    zones: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    agents: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    managers: PropTypes.array.isRequired,
    operators: PropTypes.array.isRequired,
    companies: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    collectors: PropTypes.array.isRequired,
    supervisors: PropTypes.array.isRequired,
    administrators: PropTypes.array.isRequired,
    allSimsRequests: PropTypes.object.isRequired,
    allZonesRequests: PropTypes.object.isRequired,
    allAgentsRequests: PropTypes.object.isRequired,
    balanceUserRequests: PropTypes.object.isRequired,
    allManagersRequests: PropTypes.object.isRequired,
    allCompaniesRequests: PropTypes.object.isRequired,
    allOperatorsRequests: PropTypes.object.isRequired,
    allCollectorsRequests: PropTypes.object.isRequired,
    allSupervisorsRequests: PropTypes.object.isRequired,
    allAdministratorsRequests: PropTypes.object.isRequired,
};

export default React.memo(DashboardPage);