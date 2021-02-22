import React from 'react';
import PropTypes from "prop-types";

import LoaderComponent from "../LoaderComponent";
import {dateToString, formatNumber} from "../../functions/generalFunctions";

// Component
function CollectorsCardsComponent({collectors, handleBlock, handleBlockModalShow, handleCollectorDetailsModalShow}) {
    // Render
    return (
        <>
            <div className="row m-1">
                {collectors.map((item, key) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={key}>
                            <div className="card">
                                <div className="card-header bg-secondary">
                                    <h3 className="card-title">{item.name}</h3>
                                    <div className="card-tools">
                                        <button type="button"
                                                title="Détails"
                                                className=" btn-tool btn"
                                                onClick={() => handleCollectorDetailsModalShow(item)}
                                        >
                                            <i className="fa fa-eye" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="text-right">
                                        {item.actionLoader ? <LoaderComponent little={true} /> :(
                                            item.status
                                                ? <i onClick={() => handleBlockModalShow(item)}
                                                     className='fa fa-lock-open text-success hand-cursor'
                                                />
                                                : <i className='fa fa-lock text-danger hand-cursor'
                                                     onClick={() => handleBlock(item.id)}
                                                />
                                        )}
                                    </div>
                                    <ul className="list-group list-group-unbordered">
                                        <li className="list-group-item">
                                            <b>Création</b>
                                            <span className="float-right">{dateToString(item.creation)}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Téléphone</b>
                                            <span className="float-right">{item.phone}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Zone</b>
                                            <span className="float-right">{item.zone.name}</span>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Solde total</b>
                                            <span className="float-right text-success text-bold">{formatNumber(item.account.balance)}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {collectors.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas de responsable de zone
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
CollectorsCardsComponent.propTypes = {
    collectors: PropTypes.array.isRequired,
    handleBlock: PropTypes.func.isRequired,
    handleBlockModalShow: PropTypes.func.isRequired,
    handleCollectorDetailsModalShow: PropTypes.func.isRequired,
};

export default React.memo(CollectorsCardsComponent);
