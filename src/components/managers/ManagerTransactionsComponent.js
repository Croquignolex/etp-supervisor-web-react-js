import PropTypes from "prop-types";
import React, {useEffect, useState} from 'react';

import ExcelFile from "react-data-export/dist/ExcelPlugin/components/ExcelFile";
import ExcelSheet from "react-data-export/dist/ExcelPlugin/elements/ExcelSheet";
import ExcelColumn from "react-data-export/dist/ExcelPlugin/elements/ExcelColumn";

import LoaderComponent from "../LoaderComponent";
import ErrorAlertComponent from "../ErrorAlertComponent";
import DatePickerComponent from "../form/DatePickerComponent";
import {emitManagerTransactionsFetch} from "../../redux/managers/actions";
import {storeManagerTransactionsRequestReset} from "../../redux/requests/managers/actions";
import {formatString, requestFailed, requestLoading, shortDateToString} from "../../functions/generalFunctions";

// Component
function ManagerTransactionsComponent({manager, transactions, dispatch, request}) {
    // Local states
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Local effects
    useEffect(() => {
        dispatch(emitManagerTransactionsFetch({
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
        dispatch(storeManagerTransactionsRequestReset());
    };

    const handleSelectedDate = (selectedDay) => {
        shouldResetErrorData();
        setSelectedDate(selectedDay)
        dispatch(emitManagerTransactionsFetch({id: manager.id, selectedDay}));
    }

    // Custom export button
    const ExportButton = () => {
        const tabName = `${formatString(manager.name, 17)} ${shortDateToString(selectedDate, '-')}`;

        return (
            <ExcelFile element={
                <button type="button" className="btn btn-theme mb-1 mr-1">
                    <i className="fa fa-file-export" /> Exporter en excel
                </button>
            }>
                <ExcelSheet data={transactions} name={tabName}>
                    <ExcelColumn label="DATE" value="creation"/>
                    <ExcelColumn label="OPERATEUR" value="operator"/>
                    <ExcelColumn label="TYPE" value="type"/>
                    <ExcelColumn label="COMPTE FLOTTAGE" value="left_account"/>
                    <ExcelColumn label="COMPTE RECIPROQUE" value="right_account"/>
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
                                                <th>OPERATEUR</th>
                                                <th>TYPE</th>
                                                <th>COMPTE FLOTTAGE</th>
                                                <th>COMPTE RECIPROQUE</th>
                                                <th>ENTREES</th>
                                                <th>SORTIES</th>
                                                <th>SOLDES</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {transactions.map((item, key) => {
                                                return (
                                                    <tr key={key}>
                                                        <td>{item.creation}</td>
                                                        <td>{item.operator}</td>
                                                        <td>{item.type}</td>
                                                        <td>{item.left_account}</td>
                                                        <td>{item.right_account}</td>
                                                        <td>{item.in}</td>
                                                        <td>{item.out}</td>
                                                        <td>{item.balance}</td>
                                                    </tr>
                                                )
                                            })}
                                            {transactions.length === 0 && (
                                                <tr>
                                                    <td colSpan={8}>
                                                        <div className='alert custom-active text-center'>
                                                            Pas de transactions
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
ManagerTransactionsComponent.propTypes = {
    dispatch: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    manager: PropTypes.object.isRequired,
    transactions: PropTypes.array.isRequired,
};

export default React.memo(ManagerTransactionsComponent);
