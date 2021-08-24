import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateDate } from '../../../actions/DateActions';
import formattedDate from '../../../utils/ConverterDate/formattedDate'

const DateProduction = (props) => {
    
    const startDate = formattedDate(new Date());
    const inputDate = useRef(null);
    const [isValidClass, setIsValidClass] = useState("form-control");

    useEffect(() => {
        props.updateDate(startDate)
    },[])

    const onChangeDate = () => {
        props.updateDate(inputDate.current.value);
        setIsValidClass("form-control is-valid");
    }

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="date">Fecha</label>
            </div>
            <div className="form-control-input">
                <input className={isValidClass} id="date" type="date" ref={inputDate} value={props.date} onChange={onChangeDate} min={"2021-01-01"} max={startDate}></input>
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
