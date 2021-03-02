import React, {useState} from 'react';
import PropTypes from "prop-types";

import LoaderComponent from "../LoaderComponent";
import FormModalComponent from "../modals/FormModalComponent";
import {dateToString, formatNumber} from "../../functions/generalFunctions";
import ZoneDetailsContainer from "../../containers/zones/ZoneDetailsContainer";

// Component
function ManagersCardsComponent({managers, handleBlock, handleBlockModalShow, handleManagerDetailsModalShow}) {
    // Render
    return (
        <>
            <div className="row m-1">
                {managers.map((item, key) => {
                    return (
                        <div className="col-lg-4 col-md-6" key={key}>
                            <div className="card">
                                <div className="card-header bg-secondary">
                                    <h3 className="card-title">{item.name}</h3>
                                    <div className="card-tools">
                                        <button type="button"
                                                title="Détails"
                                                className=" btn-tool btn"
                                                onClick={() => handleManagerDetailsModalShow(item)}
                                        >
                                            <i className="fa fa-eye" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="text-center mb-3">
                                        <img src={item.avatar} alt="avatar..." className="profile-user-img img-fluid img-circle" />
                                        <div className="float-right">
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
                                            <b>Solde total</b>
                                            <span className="float-right text-success text-bold">{formatNumber(item.account.balance)}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {managers.length === 0 &&
                    <div className="col-12">
                        <div className='alert custom-active text-center'>
                            Pas de gestionnaires de flottes
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
ManagersCardsComponent.propTypes = {
    managers: PropTypes.array.isRequired,
    handleBlock: PropTypes.func.isRequired,
    handleBlockModalShow: PropTypes.func.isRequired,
    handleManagerDetailsModalShow: PropTypes.func.isRequired,
};

export default React.memo(ManagersCardsComponent);
