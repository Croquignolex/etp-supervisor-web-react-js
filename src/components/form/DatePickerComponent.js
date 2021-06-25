import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import React, {forwardRef, useState} from 'react';

import "react-datepicker/dist/react-datepicker.css";

// Component
function DatePickerComponent({handleInput}) {
    // Local states
    const [selectedDate, setSelectedDate] = useState(new Date());

    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="btn btn-theme mb-1 mr-1" type="button" onClick={onClick} ref={ref}>
            <i className="fa fa-calendar-week" /> {value}
        </button>
    ));

    const handleSelectedDate = (data) => {
        setSelectedDate(data);
        console.log(data)
        handleInput(data);
    }

    // Render
    return (
        <DatePicker selected={selectedDate}
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