import PropTypes from "prop-types";
import React, {useState} from 'react';

import FormModalComponent from "../modals/FormModalComponent";
import {dateToString, formatNumber} from "../../functions/generalFunctions";
import ManagerInfoEditContainer from "../../containers/managers/ManagerInfoEditContainer";

// Component
function ManagerInfoComponent({manager}) {
    // Local states
    const [infoEditModal, setInfoEditModal] = useState({show: false, header: 'MODIFIER LES INFO DE ' + manager.name});

    // Show info edit modal form
    const handleInfoEditModalShow = () => {
        setInfoEditModal({...infoEditModal, show: true})
    }

    // Hide info edit modal form
    const handleInfoEditModalHide = () => {
        setInfoEditModal({...infoEditModal, show: false})
    }

    // Render
    return (
        <>
            <button type="button" className="btn btn-theme mb-1 mr-1" onClick={handleInfoEditModalShow}>
                <i className="fa fa-pencil" /> Modifier les info
            </button>
            <div className="card">
                <div className="card-header bg-secondary">
                    <h3 className="card-title">{manager.name}</h3>
                    <div className="card-tools">
                        {manager.status
                            ?  <span className="badge badge-success">Activé</span>
                            :  <span className="badge badge-danger">Bloqué</span>
                        }
                    </div>
                </div>
                <div className="card-body">
                    <div className="text-center mb-2">
                        <img src={manager.avatar} alt="avatar..." className="profile-user-img img-fluid img-circle" />
                    </div>
                    <ul className="list-group list-group-unbordered mb-3">
                        <li className="list-group-item">
                            <b>Création</b>
                            <span className="float-right">{dateToString(manager.creation)}</span>
                        </li>
                        <li className="list-group-item">
                            <b>Nom</b>
                            <span className="float-right">{manager.name}</span>
                        </li>
                        <li className="list-group-item">
                            <b>Téléphone</b>
                            <span className="float-right">{manager.phone}</span>
                        </li>
                        <li className="list-group-item">
                            <b>Email</b>
                            <span className="float-right">{manager.email}</span>
                        </li>
                        <li className="list-group-item">
                            <b>Solde total</b>
                            <span className="float-right text-success text-bold">{formatNumber(manager.account.balance)}</span>
                        </li>
                        <li className="list-group-item">
                            <b>Adresse</b>
                            <p>{manager.address}</p>
                        </li>
                        <li className="list-group-item">
                            <b>Description</b>
                            <p>{manager.description}</p>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Modal */}
            <FormModalComponent modal={infoEditModal} handleClose={handleInfoEditModalHide}>
                <ManagerInfoEditContainer handleClose={handleInfoEditModalHide} />
            </FormModalComponent>
        </>
    )
}

// Prop types to ensure destroyed props data type
ManagerInfoComponent.propTypes = {
    manager: PropTypes.object.isRequired
};

export default React.memo(ManagerInfoComponent);
