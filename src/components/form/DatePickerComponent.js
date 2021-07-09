import PropTypes from 'prop-types';
import React, {forwardRef} from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// Component
function DatePickerComponent({end, start, handleEnd, handleStart}) {
    // Custom component
    const CustomInput = forwardRef(({ value, onClick, isBegin }, ref) => (
        <button className="btn btn-theme mb-1 mr-1" type="button" onClick={onClick} ref={ref}>
            <i className="fa fa-calendar-week" /> {isBegin ? 'Du' : 'Au'} {value}
        </button>
    ));

    const handleSelectedStartDate = (data) => {
        handleStart(data);
    }

    const handleSelectedEndDate = (data) => {
        handleEnd(data);
    }

    // Render
    return (
        <>
            <DatePicker selected={start}
                        maxDate={new Date()}
                        calendarStartDay={1}
                        dateFormat="dd/MM/yyyy"
                        onChange={handleSelectedStartDate}
                        customInput={<CustomInput isBegin />}
                        selectsStart
                        startDate={start}
                        endDate={end}
            />
            <DatePicker selected={end}
                        maxDate={new Date()}
                        calendarStartDay={1}
                        dateFormat="dd/MM/yyyy"
                        onChange={handleSelectedEndDate}
                        customInput={<CustomInput />}
                        selectsEnd
                        startDate={start}
                        minDate={start}
                        endDate={end}
            />
        </>
    )
}

// Prop types to ensure destroyed props data type
DatePickerComponent.propTypes = {
    end: PropTypes.object.isRequired,
    start: PropTypes.object.isRequired,
    handleEnd: PropTypes.func.isRequired,
    handleStart: PropTypes.func.isRequired,
};

export default React.memo(DatePickerComponent);