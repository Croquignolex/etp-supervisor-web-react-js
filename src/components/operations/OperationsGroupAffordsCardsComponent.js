import React from 'react';
import PropTypes from "prop-types";

import OperatorComponent from "../OperatorComponent";
import {formatNumber} from "../../functions/generalFunctions";

// Component
function OperationsGroupAffordsCardsComponent({affords, handleGroupConfirmModalShow, handleGroupDetailsModalShow}) {
    // Render
    return (
        <>
            <div className="row m-1">
                {affords.map((item, key) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={key}>
                            <div className="card">
                                <div className={`bg-primary card-header`} />
                                <div className="card-body">
                                    <ul className="list-group list-group-unbordered">
                                        <OperatorComponent operator={item[0].operator} />
                                        <li className="list-group-item">
                                            <b>Approvisionnements groupés</b>
                                            <span className="float-right">
                                                {item.length}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Montant</b>
                                            <span className="float-right text-success text-bold">
                                                {formatNumber(item.reduce((acc, val) => acc + parseInt(val.amount, 10), 0))}
                                            </span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Responsable</b>
                                            <span className="float-right">{item[0].collector.name}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b className="text-danger text-bold">
                                                En attente de confirmation
                                            </b>
                                        </li>
                                    </ul>
                                    <div className="mt-3 text-right">
                                        <button type="button"
                                                className="btn btn-theme btn-sm"
                                                onClick={() => handleGroupDetailsModalShow(item)}
                                        >
                                            <i className="fa fa-eye" /> Details
                                        </button>
                                        <button type="button"
                                                className="btn btn-sm btn-theme ml-2"
                                                onClick={() => handleGroupConfirmModalShow(item)}
                                        >
                                            <i className="fa fa-check" /> Confirmer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {affords.length === 0 && (
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas d'approvisionnements groupés
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
OperationsGroupAffordsCardsComponent.propTypes = {
    affords: PropTypes.array.isRequired,
    handleGroupConfirmModalShow: PropTypes.func.isRequired,
    handleGroupDetailsModalShow: PropTypes.func.isRequired,
};

export default React.memo(OperationsGroupAffordsCardsComponent);
