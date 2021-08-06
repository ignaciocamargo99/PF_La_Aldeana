import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateDate } from '../../../actions/DateActions';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const DateProduction = (props) => {
    
    const [startDate, setStartDate] = useState(new Date());

    const onChangeDate = (startDate) => {        
        setStartDate(startDate);
        props.updateDate(startDate);
    }

    return (
        <div className="form-row">
            <div className="form-control-label">
                <label className="col-sm-6">Fecha</label>
                <DatePicker selected={startDate} maxDate={new Date()} minDate={new Date(2001,0,1)} onChange={onChangeDate} dateFormat="dd/MM/yyyy"/>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        date: state.date
    }
}

const mapDispatchToProps = {
    updateDate
}

export default connect(mapStateToProps,mapDispatchToProps)(DateProduction);
