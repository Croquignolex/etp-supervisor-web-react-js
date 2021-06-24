import PropTypes from "prop-types";
import React, {useEffect} from 'react';

import LoaderComponent from "../LoaderComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import {emitManagerMovementsFetch} from "../../redux/managers/actions";
import {requestFailed, requestLoading} from "../../functions/generalFunctions";
import {storeManagerMovementsRequestReset} from "../../redux/requests/managers/actions";

// Component
function ManagerMovementsComponent({manager, dispatch, request}) {
    // Local effects
    useEffect(() => {
        dispatch(emitManagerMovementsFetch({manager}));
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeManagerMovementsRequestReset());
    };

    // Render
    return (
        <>
            {requestLoading(request)  ? <LoaderComponent /> : (
                requestFailed(request) ? <ErrorAlertComponent message={request.message} /> : (
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <button type="button" className="btn btn-theme mb-1 mr-1">
                                <i className="fa fa-file-excel" /> Exporter en excel
                            </button>
                            <div className="card">
                                <div className="table-responsive">
                                    <table className="table table-hover text-nowrap table-bordered">
                                        <thead>
                                        <tr>
                                            <th>NOM</th>
                                            <th>NUMERO</th>
                                            <th>SOLDE</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </>
    )
}

// Prop types to ensure destroyed props data type
ManagerMovementsComponent.propTypes = {
    id: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    manager: PropTypes.object.isRequired,
};

export default React.memo(ManagerMovementsComponent);
