import PropTypes from "prop-types";
import React, {useEffect} from 'react';

import LoaderComponent from "../LoaderComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import {requestFailed, requestLoading} from "../../functions/generalFunctions";

// Component
function SupplyDetailsComponent({id, supply, dispatch}) {

    // Local effects
    useEffect(() => {
        // dispatch(emitZoneFetch({id}));
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Reset error alert
    const shouldResetErrorData = () => {
        // dispatch(storeShowZoneRequestReset());
    };

    // Render
    return (
        <>
            {requestLoading(request)  ? <LoaderComponent /> : (
                requestFailed(request) ? <ErrorAlertComponent message={request.message} /> : (
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            {/*<ZoneInfoComponent zone={zone} />*/}
                        </div>
                        <div className="col-lg-12 col-md-12">
                            {/*<ZoneAgentsListComponent zone={zone} />*/}
                        </div>
                    </div>
                )
            )}
        </>
    )
}

// Prop types to ensure destroyed props data type
SupplyDetailsComponent.propTypes = {
    id: PropTypes.string.isRequired,
    supply: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

export default React.memo(SupplyDetailsComponent);
