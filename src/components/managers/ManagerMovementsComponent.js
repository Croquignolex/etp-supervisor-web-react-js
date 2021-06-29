import PropTypes from "prop-types";
import React, {useEffect, useState} from 'react';

import ExcelFile from "react-data-export/dist/ExcelPlugin/components/ExcelFile";
import ExcelSheet from "react-data-export/dist/ExcelPlugin/elements/ExcelSheet";
import ExcelColumn from "react-data-export/dist/ExcelPlugin/elements/ExcelColumn";

import LoaderComponent from "../LoaderComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import DatePickerComponent from "../form/DatePickerComponent";
import {emitManagerMovementsFetch} from "../../redux/managers/actions";
import {storeManagerMovementsRequestReset} from "../../redux/requests/managers/actions";
import {requestFailed, requestLoading, shortDateToString} from "../../functions/generalFunctions";

// Component
function ManagerMovementsComponent({manager, movements, dispatch, request}) {
    // Local states
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Local effects
    useEffect(() => {
        dispatch(emitManagerMovementsFetch({
            id: manager.id,
            selectedDay: new Date()
        }));
        // Cleaner error alert while component did unmount without store dependency
        return () => {
            shouldResetErrorData();
        };
        // eslint-disable-next-line
    }, []);

    // Reset error alert
    const shouldResetErrorData = () => {
        dispatch(storeManagerMovementsRequestReset());
    };

    const handleSelectedDate = (selectedDay) => {
        shouldResetErrorData();
        setSelectedDate(selectedDay)
        dispatch(emitManagerMovementsFetch({id: manager.id, selectedDay}));
    }

    // Custom export button
    const ExportButton = () => {
        const tabName = `Mouvement de caisse de ${manager.name} du ${shortDateToString(selectedDate, '-')}`;

        return (
            <ExcelFile element={
                <button type="button" className="btn btn-theme mb-1 mr-1">
                    <i className="fa fa-file-export" /> Exporter en excel
                </button>
            } filename={tabName}>
                <ExcelSheet data={movements} name="Mouvements">
                    <ExcelColumn label="DATE" value="creation"/>
                    <ExcelColumn label="TYPE" value="type"/>
                    <ExcelColumn label="NATURE" value="label"/>
                    <ExcelColumn label="ENTREES" value="in"/>
                    <ExcelColumn label="SORTIES" value="out"/>
                    <ExcelColumn label="SOLDES" value="balance"/>
                </ExcelSheet>
            </ExcelFile>
        )
    }

    // Render
    return (
        <>
            {requestLoading(request)  ? <LoaderComponent /> : (
                requestFailed(request) ? <ErrorAlertComponent message={request.message} /> : (
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <ExportButton />
                            <DatePickerComponent input={selectedDate} handleInput={handleSelectedDate} />
                            <div className="card">
                                <div className="table-responsive">
                                    <table className="table table-hover text-nowrap table-bordered">
                                        <thead>
                                            <tr>
                                                <th>DATE</th>
                                                <th>TYPE</th>
                                                <th>NATURE</th>
                                                <th>ENTREES</th>
                                                <th>SORTIES</th>
                                                <th>SOLDES</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {movements.map((item, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>{item.creation}</td>
                                                        <td>{item.type}</td>
                                                        <td>{item.label}</td>
                                                        <td>{item.in}</td>
                                                        <td>{item.out}</td>
                                                        <td>{item.balance}</td>
                                                    </tr>
                                                )
                                            })}
                                            {movements.length === 0 && (
                                                <tr>
                                                    <td colSpan={6}>
                                                        <div className='alert custom-active text-center'>
                                                            Pas de mouvements de caisse
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </>
    )
}

// Prop types to ensure destroyed props data type
ManagerMovementsComponent.propTypes = {
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    manager: PropTypes.object.isRequired,
    movements: PropTypes.array.isRequired,
};

export default React.memo(ManagerMovementsComponent);
