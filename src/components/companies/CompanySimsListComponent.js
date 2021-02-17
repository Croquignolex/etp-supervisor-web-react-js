import PropTypes from "prop-types";
import React, {useState} from 'react';

import {formatNumber} from "../../functions/generalFunctions";
import FormModalComponent from "../modals/FormModalComponent";
import CompanyAddSimContainer from "../../containers/companies/CompanyAddSimContainer";

// Component
function CompanySimsListComponent({company}) {
    // Local states
    const [addSimModal, setAddSimEditModal] = useState({show: false, header: 'AJOUTER UNE SIM A ' + company.name});

    // Show add sim modal form
    const handleAddSimModalShow = () => {
        setAddSimEditModal({...addSimModal, show: true})
    }

    // Hide add sim modal form
    const handleAddSimModalHide = () => {
        setAddSimEditModal({...addSimModal, show: false})
    }

    // Render
    return (
        <>
            <button type="button" className="btn btn-theme mb-1" onClick={handleAddSimModalShow}>
                <i className="fa fa-plus" /> Ajouter une sim
            </button>
            <div className="card">
                <div className="table-responsive">
                    <table className="table table-hover text-nowrap table-bordered">
                        <thead>
                            <tr>
                                <th>NOM</th>
                                <th>NUMERO</th>
                                <th>SOLDE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {company.sims.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{item.name}</td>
                                        <td>{item.number}</td>
                                        <td className='text-right'>{formatNumber(item.balance)}</td>
                                    </tr>
                                )
                            })}
                            {company.sims.length === 0 && (
                                <tr>
                                    <td colSpan={3}>
                                        <div className='alert custom-active text-center'>
                                            Pas de puces
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Modal */}
            <FormModalComponent modal={addSimModal} handleClose={handleAddSimModalHide}>
                <CompanyAddSimContainer handleClose={handleAddSimModalHide} />
            </FormModalComponent>
        </>
    )
}

// Prop types to ensure destroyed props data type
CompanySimsListComponent.propTypes = {
    company: PropTypes.object.isRequired
};

export default React.memo(CompanySimsListComponent);
