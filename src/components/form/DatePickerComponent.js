import PropTypes from 'prop-types';
import React, {forwardRef} from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// Component
function DatePickerComponent({input, handleInput}) {
    // Custom component
    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="btn btn-theme mb-1 mr-1" type="button" onClick={onClick} ref={ref}>
            <i className="fa fa-calendar-week" /> {value}
        </button>
    ));

    const handleSelectedDate = (data) => {
        handleInput(data);
    }

    // Render
    return (
        <DatePicker maxDate={input}
                    selected={input}
                    calendarStartDay={1}
                    dateFormat="dd/MM/yyyy"
                    onChange={handleSelectedDate}
                    customInput={<CustomInput />}
        />
    )
}

// Prop types to ensure destroyed props data type
DatePickerComponent.propTypes = {
    handleInput: PropTypes.func.isRequired
};

export default React.memo(DatePickerComponent);