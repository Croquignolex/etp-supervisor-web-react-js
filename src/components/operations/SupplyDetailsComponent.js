import PropTypes from "prop-types";
import React, {useEffect} from 'react';

import LoaderComponent from "../LoaderComponent";
import SupplyInfoComponent from "./SupplyInfoComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import SupplyReturnsListComponent from "./SupplyReturnsListComponent";
import SupplyRecoveriesListComponent from "./SupplyRecoveriesListComponent";
import {storeReturnsRequestReset} from "../../redux/requests/returns/actions";
import {requestFailed, requestLoading} from "../../functions/generalFunctions";
import {storeRecoveriesRequestReset} from "../../redux/requests/recoveries/actions";

// Component
function SupplyDetailsComponent({supply, returns, recoveries, returnsRequests, recoveriesRequests, dispatch}) {

    // Local effects
    useEffect(() => {
        // dispatch(emitReturnsFetch());
        // dispatch(emitRecoveriesFetch());
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeReturnsRequestReset());
        dispatch(storeRecoveriesRequestReset());
    };

    // Render
    return (
        <div className="row">
            <div className="col-lg-12 col-md-12">
                <SupplyInfoComponent supply={supply} />
            </div>
            <div className="col-lg-12 col-md-12">
                {requestLoading(recoveriesRequests)  ? <LoaderComponent /> : (
                    requestFailed(recoveriesRequests) ? <ErrorAlertComponent message={recoveriesRequests.message} /> : (
                        <SupplyRecoveriesListComponent recoveries={recoveries} />
                    )
                )}
            </div>
            <div className="col-lg-12 col-md-12">
                {requestLoading(returnsRequests)  ? <LoaderComponent /> : (
                    requestFailed(returnsRequests) ? <ErrorAlertComponent message={recoveriesRequests.message} /> : (
                        <SupplyReturnsListComponent returns={returns} />
                    )
                )}
            </div>
        </div>
    )
}

// Prop types to ensure destroyed props data type
SupplyDetailsComponent.propTypes = {
    supply: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    returns: PropTypes.array.isRequired,
    recoveries: PropTypes.array.isRequired,
    returnsRequests: PropTypes.object.isRequired,
    recoveriesRequests: PropTypes.object.isRequired,
};

export default React.memo(SupplyDetailsComponent);
