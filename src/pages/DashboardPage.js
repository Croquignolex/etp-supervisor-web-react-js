import PropTypes from 'prop-types';
import React, {useEffect, useMemo} from 'react';

import * as types from "../constants/typeConstants";
import * as path from "../constants/pagePathConstants";
import {emitAllSimsFetch} from "../redux/sims/actions";
import * as setting from "../constants/settingsConstants";
import {emitAllFleetsFetch} from "../redux/fleets/actions";
import {formatNumber} from "../functions/generalFunctions";
import {emitFetchUserBalance} from "../redux/user/actions";
import {emitAllAgentsFetch} from "../redux/agents/actions";
import HeaderComponent from "../components/HeaderComponent";
import {DASHBOARD_PAGE} from "../constants/pageNameConstants";
import AppLayoutContainer from "../containers/AppLayoutContainer";
import {emitAllClearancesFetch} from "../redux/clearances/actions";
import {storeAllSimsRequestReset} from "../redux/requests/sims/actions";
import {storeAllFleetsRequestReset} from "../redux/requests/fleets/actions";
import {storeAllAgentsRequestReset} from "../redux/requests/agents/actions";
import {storeUserBalanceFetchRequestReset} from "../redux/requests/user/actions";
import DashboardCardComponent from "../components/dashboard/DashboardCardComponent";
import {storeAllClearancesRequestReset} from "../redux/requests/clearances/actions";

// Component
function DashboardPage({user, fleets, sims, clearances, agents, settings, dispatch, location, balanceUserRequests,
                           allClearancesRequests, allAgentsRequests, allFleetsRequests, allSimsRequests}) {
    // Local effects
    useEffect(() => {
        dispatch(emitAllSimsFetch());
        dispatch(emitAllAgentsFetch());
        dispatch(emitAllFleetsFetch());
        dispatch(emitFetchUserBalance());
        dispatch(emitAllClearancesFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeAllSimsRequestReset());
        dispatch(storeAllFleetsRequestReset());
        dispatch(storeAllAgentsRequestReset());
        dispatch(storeAllClearancesRequestReset());
        dispatch(storeUserBalanceFetchRequestReset());
    };

    // Data
    const cardsData = settings.cards;
    const fleetSimsFleetsData = useMemo(() => {
        return formatNumber(sims.filter(sim => user.id === sim.collector.id).reduce((acc, val) => acc + val.balance, 0))
        // eslint-disable-next-line
    }, [sims]);
    const resourcesData = useMemo(() => {
        return formatNumber(agents.filter(agent => types.RESOURCE_TYPE === agent.reference).length)
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
                                                            icon='fa fa-coin'
                                                            url={path.PROFILE_PAGE_PATH}
                                                            label={setting.LABEL_BALANCE}
                                                            request={balanceUserRequests}
                                                            data={formatNumber(user.balance)}
                                    />
                                </div>
                            }
                            {cardsData.includes(setting.CARD_FLEET_SIMS_FLEETS) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent icon='fa fa-phone'
                                                            color='bg-secondary'
                                                            url={path.SIMS_PAGE_PATH}
                                                            request={allSimsRequests}
                                                            data={fleetSimsFleetsData}
                                                            label={setting.LABEL_FLEET_SIMS_FLEETS}
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
                                                            icon='fa fa-user-clock'
                                                            url={path.AGENTS_PAGE_PATH}
                                                            request={allAgentsRequests}
                                                            label={setting.LABEL_RESOURCES}
                                    />
                                </div>
                            }
                            {/*{cardsData.includes(setting.CARD_FLEETS_REQUESTS) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent icon='fa fa-rss'
                                                            color='bg-danger'
                                                            data={fleets.length}
                                                            request={allFleetsRequests}
                                                            url={path.REQUESTS_FLEETS_PAGE_PATH}
                                                            label={setting.LABEL_FLEETS_REQUESTS}
                                    />
                                </div>
                            }*/}
                            {cardsData.includes(setting.CARD_CLEARANCES_REQUEST) &&
                                <div className="col-lg-3 col-md-4 col-sm-6">
                                    <DashboardCardComponent color='bg-warning'
                                                            icon='fa fa-rss-square'
                                                            data={clearances.length}
                                                            request={allClearancesRequests}
                                                            url={path.REQUESTS_CLEARANCES_PAGE_PATH}
                                                            label={setting.LABEL_CLEARANCES_REQUEST}
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
    user: PropTypes.object.isRequired,
    fleets: PropTypes.array.isRequired,
    agents: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
    clearances: PropTypes.array.isRequired,
    allSimsRequests: PropTypes.object.isRequired,
    allAgentsRequests: PropTypes.object.isRequired,
    allFleetsRequests: PropTypes.object.isRequired,
    balanceUserRequests: PropTypes.object.isRequired,
    allClearancesRequests: PropTypes.object.isRequired,
};

export default React.memo(DashboardPage);