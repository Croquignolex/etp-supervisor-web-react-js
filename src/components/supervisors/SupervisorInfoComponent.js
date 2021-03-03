import React from 'react';
import PropTypes from "prop-types";

import {dateToString, formatNumber} from "../../functions/generalFunctions";

// Component
function SupervisorInfoComponent({supervisor}) {
    // Render
    return (
        <>
            <div className="card">
                <div className="card-header bg-secondary">
                    <h3 className="card-title">{supervisor.name}</h3>
                    <div className="card-tools">
                        {supervisor.status
                            ?  <span className="badge badge-success">Activé</span>
                            :  <span className="badge badge-danger">Bloqué</span>
                        }
                    </div>
                </div>
                <div className="card-body">
                    <div className="text-center mb-2">
                        <img src={supervisor.avatar} alt="avatar..." className="profile-user-img img-fluid img-circle" />
                    </div>
                    <ul className="list-group list-group-unbordered mb-3">
                        <li className="list-group-item">
                            <b>Création</b>
                            <span className="float-right">{dateToString(supervisor.creation)}</span>
                        </li>
                        <li className="list-group-item">
                            <b>Nom</b>
                            <span className="float-right">{supervisor.name}</span>
                        </li>
                        <li className="list-group-item">
                            <b>Téléphone</b>
                            <span className="float-right">{supervisor.phone}</span>
                        </li>
                        <li className="list-group-item">
                            <b>Email</b>
                            <span className="float-right">{supervisor.email}</span>
                        </li>
                        <li className="list-group-item">
                            <b>Solde total</b>
                            <span className="float-right text-success text-bold">{formatNumber(supervisor.account.balance)}</span>
                        </li>
                        <li className="list-group-item">
                            <b>Adresse</b>
                            <p>{supervisor.address}</p>
                        </li>
                        <li className="list-group-item">
                            <b>Description</b>
                            <p>{supervisor.description}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
SupervisorInfoComponent.propTypes = {
    supervisor: PropTypes.object.isRequired
};

export default React.memo(SupervisorInfoComponent);
