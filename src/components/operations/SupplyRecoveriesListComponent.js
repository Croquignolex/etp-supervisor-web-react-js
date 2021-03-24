import React from 'react';
import PropTypes from "prop-types";

import {formatNumber} from "../../functions/generalFunctions";

// Component
function SupplyRecoveriesListComponent({recoveries}) {
    // Render
    return (
        <>
            <strong className="text-theme">RECOUVREMENT D'ESPECES</strong>
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
                            {recoveries.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>

                                            {item.name}
                                        </td>
                                        <td>{item.number}</td>
                                        <td className='text-right'>{formatNumber(item.balance)}</td>
                                    </tr>
                                )
                            })}
                            {recoveries.length === 0 && (
                                <tr>
                                    <td colSpan={3}>
                                        <div className='alert custom-active text-center'>
                                            Pas de recouvrements d'espèces
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

// Prop types to ensure destroyed props data type
SupplyRecoveriesListComponent.propTypes = {
    recoveries: PropTypes.array.isRequired
};

export default React.memo(SupplyRecoveriesListComponent);
