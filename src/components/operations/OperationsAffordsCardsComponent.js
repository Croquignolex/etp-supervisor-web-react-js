import PropTypes from "prop-types";
import React, {useState} from 'react';

import LoaderComponent from "../LoaderComponent";
import OperatorComponent from "../OperatorComponent";
import FormModalComponent from "../modals/FormModalComponent";
import {fleetTypeBadgeColor} from "../../functions/typeFunctions";
import {CANCEL, DONE, PROCESSING} from "../../constants/typeConstants";
import {dateToString, formatNumber} from "../../functions/generalFunctions";
import SimDetailsContainer from "../../containers/sims/SimDetailsContainer";
import VendorDetailsContainer from "../../containers/vendors/VendorDetailsContainer";

// Component
function OperationsAffordsCardsComponent({affords, group, handleConfirmModalShow}) {
    // Local states
    const [vendorDetailsModal, setVendorSimDetailsModal] = useState({show: false, header: 'DETAIL DU FOURNISSEUR', id: ''});
    const [outgoingSimDetailsModal, setOutgoingSimDetailsModal] = useState({show: false, header: 'DETAIL DU COMPTE DE FLOTTAGE', id: ''});

    // Hide outgoing sim details modal form
    const handleOutgoingSimDetailModalHide = () => {
        setOutgoingSimDetailsModal({...outgoingSimDetailsModal, show: false})
    }

    // Hide vendor details modal form
    const handleVendorSimDetailModalHide = () => {
        setVendorSimDetailsModal({...vendorDetailsModal, show: false})
    }

    // Render
    return (
        <>
            <div className="row m-1">
                {affords.map((item, key) => {
                    return (
                        <div className={`${group ? "col-lg-6" : "col-lg-4"} col-md-6`} key={key}>
                            <div className="card">
                                {group
                                    ? <div className={`bg-secondary card-header`} />
                                    : <div className={`${fleetTypeBadgeColor(item.status).background} card-header`} />
                                }
                                <div className="card-body">
                                    <ul className="list-group list-group-unbordered">
                                        <OperatorComponent operator={item.operator} />
                                        <li className="list-group-item">
                                            <b>Création</b>
                                            <span className="float-right">{dateToString(item.creation)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Fournisseur</b>
                                            <span className="float-right">
                                                {item.vendor?.name}
                                                <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                                   onClick={() => setVendorSimDetailsModal({...vendorDetailsModal, show: true, id: item.vendor?.id})}
                                                />
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Montant</b>
                                            <span className="float-right text-success text-bold">
                                                {formatNumber(item.amount)}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Compte récepteur</b>
                                            <span className="float-right">
                                                {item.sim?.number}
                                                <i className="fa fa-question-circle small ml-1 hand-cursor text-theme"
                                                   onClick={() => setOutgoingSimDetailsModal({...outgoingSimDetailsModal, show: true, id: item.sim?.id})}
                                                />
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Responsable</b>
                                            <span className="float-right">{item.collector?.name}</span>
                                        </li>
                                        {(!group) && (
                                            <li className="list-group-item">
                                                {item.status === DONE && <b className="text-success text-bold">Confirmé</b>}
                                                {item.status === CANCEL && <b className="text-danger text-bold">Annulé</b>}
                                                {item.status === PROCESSING && <b className="text-danger text-bold">En attente de confirmation</b>}
                                            </li>
                                        )}
                                    </ul>
                                    {(!group) && (
                                        <>
                                            {(item.status === PROCESSING) && (
                                                <div className="mt-3 text-right">
                                                    {item.actionLoader ? <LoaderComponent little={true} /> : (
                                                        <button type="button"
                                                                className="btn btn-theme btn-sm"
                                                                onClick={() => handleConfirmModalShow(item)}
                                                        >
                                                            <i className="fa fa-check" /> Confirmer
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
                {affords.length === 0 && (
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas d'approvisionnement
                        </div>
                    </div>
                )}
            </div>
            {/* Modal */}
            <FormModalComponent small={true} modal={outgoingSimDetailsModal} handleClose={handleOutgoingSimDetailModalHide}>
                <SimDetailsContainer id={outgoingSimDetailsModal.id} />
            </FormModalComponent>
            <FormModalComponent small={true} modal={vendorDetailsModal} handleClose={handleVendorSimDetailModalHide}>
                <VendorDetailsContainer id={vendorDetailsModal.id} />
            </FormModalComponent>
        </>
    )
}

// Prop types to ensure destroyed props data type
OperationsAffordsCardsComponent.propTypes = {
    group: PropTypes.bool,
    affords: PropTypes.array.isRequired,
    handleConfirmModalShow: PropTypes.func,
};

// Prop types to ensure destroyed props data type
OperationsAffordsCardsComponent.defaultProps = {
    group: false
};

export default React.memo(OperationsAffordsCardsComponent);
