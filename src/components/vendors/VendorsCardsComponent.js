import React from 'react';
import PropTypes from "prop-types";

import {dateToString} from "../../functions/generalFunctions";

// Component
function VendorsCardsComponent({vendors, handleVendorDetailsModalShow}) {
    // Render
    return (
        <>
            <div className="row m-1">
                {vendors.map((item, key) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={key}>
                            <div className="card">
                                <div className="card-header bg-secondary">
                                    <h3 className="card-title">{item.name}</h3>
                                    <div className="card-tools">
                                        <button type="button"
                                                title="Détails"
                                                className=" btn-tool btn"
                                                onClick={() => handleVendorDetailsModalShow(item)}
                                        >
                                            <i className="fa fa-eye" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-unbordered">
                                        <li className="list-group-item">
                                            <b>Création</b>
                                            <span className="float-right">{dateToString(item.creation)}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {vendors.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas de fournisseur
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
VendorsCardsComponent.propTypes = {
    vendors: PropTypes.array.isRequired,
    handleVendorDetailsModalShow: PropTypes.func.isRequired
};

export default React.memo(VendorsCardsComponent);