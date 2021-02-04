import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, {useState, useMemo} from 'react';

import {APP_NAME} from "../constants/generalConstants";
import * as path from "../constants/pagePathConstants";
import * as page from "../constants/pageNameConstants";
import {formatString} from "../functions/generalFunctions";

// Component
function SideBarComponent({user, pathname}) {
    // Local states
    const [toggle, setToggle] = useState({show: false, key: 0});

    // Data
    const {name, avatar} = user;
    const authorisedMenu = useMemo(() => {
        return [
            buildDashboardMenu(),
            buildNetworkMenu(),
            buildRequestsMenu(),
            buildOperationsMenu(),
            buildRecoveriesMenu(),
            buildAgentsMenu(),
            buildSimsMenu(),
        ];
        // eslint-disable-next-line
    }, [pathname]);

    // Render
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* App logo */}
            <span className="brand-link">
                <img alt="logo..."
                     className="brand-image img-circle elevation-3 bg-white"
                     src={require('../assets/images/logo.png')}
                />
                <strong className="brand-text">{APP_NAME}</strong>
            </span>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src={avatar} className="img-circle elevation-2" alt="avatar..."/>
                    </div>
                    <div className="info">
                        <Link className="text-white" to={path.PROFILE_PAGE_PATH}>{formatString(name, 17)}</Link>
                    </div>
                </div>
                {/* Menu */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                        data-accordion="false">
                        {authorisedMenu.map((prop, key) => {
                            if (prop.sub.length === 0) {
                                return (
                                    <li className="nav-item" key={key}>
                                        <Link to={prop.path}
                                              className={`${prop.path === pathname && 'custom-active'} nav-link`}
                                        >
                                            <i className={`${prop.icon} nav-icon`}/>
                                            <p style={{fontSize: 14}}>{prop.name}</p>
                                        </Link>
                                    </li>
                                );
                            } else {
                                return (
                                    <li className={`nav-item has-treeview ${(drawer(toggle, key, prop.sub, pathname)) && 'menu-open'}`}
                                        key={key}>
                                        <a className="nav-link" href='http://'
                                           onClick={(e) => {
                                               e.preventDefault();
                                               setToggle({show: (toggle.key !== key) ? true : !toggle.show, key})
                                           }}
                                        >
                                            <i className={`${prop.icon} nav-icon`}/>
                                            <p style={{fontSize: 14}}>
                                                {prop.name}
                                                <i className="fas fa-angle-left right"/>
                                            </p>
                                        </a>
                                        <ul className="nav nav-treeview">
                                            {
                                                prop.sub.map((subProp, subKey) => {
                                                    if(subProp.name !== INVISIBLE_MENU_ITEM) {
                                                        return (
                                                            <li className="nav-item" key={subKey}>
                                                                <Link to={subProp.path}
                                                                      className={`${subProp.path === pathname && 'custom-active'} nav-link ml-3`}
                                                                >
                                                                    <i className="far fa-circle nav-icon"/>
                                                                    <p style={{fontSize: 14}}>{subProp.name}</p>
                                                                </Link>
                                                            </li>
                                                        );
                                                    }
                                                    return null;
                                                })
                                            }
                                        </ul>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

const INVISIBLE_MENU_ITEM = 'INVISIBLE_MENU_ITEM';

// Build dashboard menu
function buildDashboardMenu() {
    return {
        name: page.DASHBOARD_PAGE,
        path: path.DASHBOARD_PAGE_PATH,
        icon: 'fa fa-tachometer-alt',
        sub: []
    };
}

// Build :network menu
function buildNetworkMenu() {
    return {
        name: page.MY_NETWORK,
        icon: 'fa fa-network-wired',
        sub: [
            {name: page.MY_NETWORK_FLEET, path: path.NETWORK_FLEETS_PAGE_PATH},
        ]
    };
}

// Build requests menu
function buildRequestsMenu() {
    return {
        name: page.REQUESTS,
        icon: 'fa fa-paste',
        sub: [
            {name: page.REQUESTS_FLEETS_PAGE, path: path.REQUESTS_FLEETS_PAGE_PATH},
            {name: page.REQUESTS_CLEARANCES_PAGE, path: path.REQUESTS_CLEARANCES_PAGE_PATH}
        ]
    };
}

// Build operations menu
function buildOperationsMenu() {
    return {
        name: page.OPERATIONS,
        icon: 'fa fa-bars',
        sub: [
            {name: page.OPERATIONS_TRANSFERS_PAGE, path: path.OPERATIONS_TRANSFERS_PAGE_PATH},
            {name: page.OPERATIONS_FLEETS_PAGE, path: path.OPERATIONS_FLEETS_PAGE_PATH},
            {name: page.OPERATIONS_CLEARANCES_PAGE, path: path.OPERATIONS_CLEARANCES_PAGE_PATH},
            {name: page.OPERATIONS_AFFORDS_PAGE, path: path.OPERATION_AFFORDS_PAGE_PATH}
        ]
    }
}

// Build recoveries menu
function buildRecoveriesMenu() {
    return {
        name: page.RECOVERIES,
        icon: 'fa fa-share',
        sub: [
            {name: page.RECOVERIES_CASH_PAGE, path: path.RECOVERIES_CASH_PAGE_PATH},
            {name: page.RECOVERIES_FLEET_PAGE, path: path.RECOVERIES_FLEETS_PAGE_PATH},
        ]
    }
}

// Build agents menu
function buildAgentsMenu() {
    return {
        name: page.AGENTS,
        path: path.AGENTS_PAGE_PATH,
        icon: 'fa fa-user-cog',
        sub: []
    };
}

// Build sims menu
function buildSimsMenu() {
    return {
        name: page.SIMS_PAGE,
        path: path.SIMS_PAGE_PATH,
        icon: 'fa fa-sim-card',
        sub: []
    };
}


// Side bar drawer open
function drawer(toggle, key, sub, activePage) {
    let flag = false;
    // Event fired by page loaded
    sub.forEach(item => {
        if(item.path === activePage) flag = true;
    });
    // Event fired by mouse click
    const toggleStatus = (toggle.show && toggle.key === key);
    return (toggleStatus || flag);
}

// Prop types to ensure destroyed props data type
SideBarComponent.propTypes = {
    user: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired
};

// Connect component to Redux
export default React.memo(SideBarComponent);
