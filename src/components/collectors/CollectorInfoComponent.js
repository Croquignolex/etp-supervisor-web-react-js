import PropTypes from "prop-types";
import React, {useState} from 'react';

import FormModalComponent from "../modals/FormModalComponent";
import {dateToString, formatNumber} from "../../functions/generalFunctions";
import CollectorInfoEditContainer from "../../containers/collectors/CollectorInfoEditContainer";
import AgentZoneEditContainer from "../../containers/agents/AgentZoneEditContainer";

// Component
function CollectorInfoComponent({collector}) {
    // Local states
    const [zoneEditModal, setZoneEditModal] = useState({show: false, header: 'MODIFIER LA ZONE DE ' + collector.name});
    const [infoEditModal, setInfoEditModal] = useState({show: false, header: 'MODIFIER LES INFO DE ' + collector.name});

    // Show zone edit modal form
    const handleZoneEditModalShow = () => {
        setZoneEditModal({...zoneEditModal, show: true})
    }

    // Hide zone edit modal form
    const handleZoneEditModalHide = () => {
        setZoneEditModal({...zoneEditModal, show: false})
    }

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
            <button type="button" className="btn btn-theme mb-1" onClick={handleZoneEditModalShow}>
                <i className="fa fa-pencil" /> Modifier la zone
            </button>
            <div className="card">
                <div className="card-header bg-secondary">
                    <h3 className="card-title">{collector.name}</h3>
                    <div className="card-tools">
                        {collector.status
                            ?  <span className="badge badge-success">Activé</span>
                            :  <span className="badge badge-danger">Bloqué</span>
                        }
                    </div>
                </div>
                <div className="card-body">
                    <div className="text-center mb-2">
                        <img src={collector.avatar} alt="avatar..." className="profile-user-img img-fluid img-circle" />
                    </div>
                    <ul className="list-group list-group-unbordered mb-3">
                        <li className="list-group-item">
                            <b>Création</b>
                            <span className="float-right">{dateToString(collector.creation)}</span>
                        </li>
                        <li className="list-group-item">
                            <b>Nom</b>
                            <span className="float-right">{collector.name}</span>
                        </li>
                        <li className="list-group-item">
                            <b>Téléphone</b>
                            <span className="float-right">{collector.phone}</span>
                        </li>
                        <li className="list-group-item">
                            <b>Email</b>
                            <span className="float-right">{collector.email}</span>
                        </li>
                        <li className="list-group-item">
                            <b>Solde total</b>
                            <span className="float-right text-success text-bold">{formatNumber(collector.account.balance)}</span>
                        </li>
                        <li className="list-group-item">
                            <b>Adresse</b>
                            <p>{collector.address}</p>
                        </li>
                        <li className="list-group-item">
                            <b>Description</b>
                            <p>{collector.description}</p>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Modal */}
            <FormModalComponent modal={infoEditModal} handleClose={handleInfoEditModalHide}>
                <CollectorInfoEditContainer handleClose={handleInfoEditModalHide} />
            </FormModalComponent>
            <FormModalComponent modal={zoneEditModal} handleClose={handleZoneEditModalHide}>
                <AgentZoneEditContainer handleClose={handleZoneEditModalHide} />
            </FormModalComponent>
        </>
    )
}

// Prop types to ensure destroyed props data type
CollectorInfoComponent.propTypes = {
    collector: PropTypes.object.isRequired
};

export default React.memo(CollectorInfoComponent);
