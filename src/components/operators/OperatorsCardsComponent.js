import React from 'react';
import PropTypes from "prop-types";

import {dateToString} from "../../functions/generalFunctions";

// Component
function OperatorsCardsComponent({operators, handleOperatorDetailsModalShow}) {
    // Render
    return (
        <>
            <div className="row m-1">
                {operators.map((item, key) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={key}>
                            <div className="card">
                                <div className="card-header bg-secondary">
                                    <h3 className="card-title">{item.name}</h3>
                                    <div className="card-tools">
                                        <button type="button"
                                                title="Détails"
                                                className=" btn-tool btn"
                                                onClick={() => handleOperatorDetailsModalShow(item)}
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
                {operators.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas d'opérateur
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
OperatorsCardsComponent.propTypes = {
    operators: PropTypes.array.isRequired,
    handleOperatorDetailsModalShow: PropTypes.func.isRequired
};

export default React.memo(OperatorsCardsComponent);
