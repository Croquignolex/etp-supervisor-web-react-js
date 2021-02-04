import React from 'react';
import PropTypes from "prop-types";

// Component
function OperatorsCardsComponent({operator}) {
    // Render
    return (
        <>
            <ul className="list-group list-group-unbordered">
                <li className="list-group-item">
                    <b>Création</b>
                    <span className="float-right">{dateToString(operator.creation)}</span>
                </li>
                <li className="list-group-item">
                    <b>Nom</b>
                    <span className="float-right">{operator.sims}</span>
                </li>
            </ul>
        </>
    )
}

// Prop types to ensure destroyed props data type
OperatorsCardsComponent.propTypes = {
    operator: PropTypes.object.isRequired
};

export default React.memo(OperatorsCardsComponent);
