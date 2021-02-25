import PropTypes from "prop-types";
import React, {useState} from 'react';

import FormModalComponent from "../modals/FormModalComponent";
import {dateToString} from "../../functions/generalFunctions";
import ZoneInfoEditContainer from "../../containers/zones/ZoneInfoEditContainer";

// Component
function ZoneInfoComponent({zone}) {
    // Local states
    const [infoEditModal, setInfoEditModal]  = useState({show: false, header: 'MODIFIER LES INFO DE ' + zone.name});

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
                    <h3 className="card-title">{zone.name}</h3>
                </div>
                <div className="card-body">
                    <ul className="list-group list-group-unbordered mb-3">
                        <li className="list-group-item">
                            <b>Création</b>
                            <span className="float-right">{dateToString(zone.creation)}</span>
                        </li>
                        <li className="list-group-item">
                            <b>Reference</b>
                            <span className="float-right">{zone.reference}</span>
                        </li>
                        <li className="list-group-item">
                            <b>Responsable</b>
                            <span className="float-right">{zone.collector.name}</span>
                        </li>
                        <li className="list-group-item">
                            <b>Description</b>
                            <p>{zone.description}</p>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Modal */}
            <FormModalComponent modal={infoEditModal} handleClose={handleInfoEditModalHide}>
                <ZoneInfoEditContainer handleClose={handleInfoEditModalHide} />
            </FormModalComponent>
        </>
    )
}

// Prop types to ensure destroyed props data type
ZoneInfoComponent.propTypes = {
    zone: PropTypes.object.isRequired
};

export default React.memo(ZoneInfoComponent);
