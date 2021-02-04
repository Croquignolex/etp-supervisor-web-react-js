import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import * as path from "./constants/pagePathConstants";
import asyncComponent from './components/asyncComponent';
import PublicRouteContainer from "./containers/PublicRouteContainer";
import RestrictedRouteContainer from "./containers/RestrictedRouteContainer";

// Component
function AppRoutes({history}) {
    return (
        <ConnectedRouter history={history}>
            <Switch>
                {/* Available pages on guest mode */}
                <PublicRouteContainer exact path="/" component={asyncComponent(() => import('./containers/CheckUserContainer'))} />
                {/* Available pages on auth mode */}
                {/* Common pages */}
                <RestrictedRouteContainer exact path={path.PROFILE_PAGE_PATH} component={asyncComponent(() => import('./pages/ProfilePage'))} />
                <RestrictedRouteContainer exact path={path.SETTINGS_PAGE_PATH} component={asyncComponent(() => import('./containers/SettingsPageContainer'))} />
                <RestrictedRouteContainer exact path={path.DASHBOARD_PAGE_PATH} component={asyncComponent(() => import('./containers/DashboardPageContainer'))} />
                <RestrictedRouteContainer exact path={path.NOTIFICATIONS_PAGE_PATH} component={asyncComponent(() => import('./containers/notifications/NotificationsPageContainer'))} />
                {/* Requests pages */}
                <RestrictedRouteContainer exact path={path.REQUESTS_FLEETS_PAGE_PATH} component={asyncComponent(() => import('./containers/requests/RequestsFleetsPageContainer'))} />
                <RestrictedRouteContainer exact path={path.REQUESTS_CLEARANCES_PAGE_PATH} component={asyncComponent(() => import('./containers/requests/RequestsClearancesPageContainer'))} />
               {/* Recoveries */}
                <RestrictedRouteContainer exact path={path.RECOVERIES_CASH_PAGE_PATH} component={asyncComponent(() => import('./containers/recoveries/RecoveriesCashPageContainer'))} />
                <RestrictedRouteContainer exact path={path.RECOVERIES_FLEETS_PAGE_PATH} component={asyncComponent(() => import('./containers/recoveries/RecoveriesFleetsPageContainer'))} />
                {/* Operations */}
                <RestrictedRouteContainer exact path={path.OPERATIONS_FLEETS_PAGE_PATH} component={asyncComponent(() => import('./containers/operations/OperationsFleetsPageContainer'))} />
                <RestrictedRouteContainer exact path={path.OPERATION_AFFORDS_PAGE_PATH} component={asyncComponent(() => import('./containers/operations/OperationsAffordsPageContainer'))} />
                <RestrictedRouteContainer exact path={path.OPERATIONS_TRANSFERS_PAGE_PATH} component={asyncComponent(() => import('./containers/operations/OperationsTransfersPageContainer'))} />
                <RestrictedRouteContainer exact path={path.OPERATIONS_CLEARANCES_PAGE_PATH} component={asyncComponent(() => import('./containers/operations/OperationsClearancesPageContainer'))} />
                {/* Other pages */}
                <RestrictedRouteContainer exact path={path.SIMS_PAGE_PATH} component={asyncComponent(() => import('./containers/sims/SimsPageContainer'))} />
                <RestrictedRouteContainer exact path={path.AGENTS_PAGE_PATH} component={asyncComponent(() => import('./containers/agents/AgentsPageContainer'))} />
                {/* Network */}
                <RestrictedRouteContainer exact path={path.NETWORK_FLEETS_PAGE_PATH} component={asyncComponent(() => import('./containers/network/NetworkFleetsPageContainer'))} />
                {/* 404 page */}
                <Route component={asyncComponent(() => import('./pages/NotFoundPage'))} />
            </Switch>
        </ConnectedRouter>
    );
}

export default React.memo(AppRoutes);
