import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateDate } from '../../../actions/DateActions';
import BeShowed from '../../../common/BeShowed';
import formattedDate from '../../../utils/ConverterDate/formattedDate'

const DateProduction = (props) => {

    const startDate = formattedDate(new Date());
    const inputDate = useRef(null);
    const [isValidClass, setIsValidClass] = useState("form-control");

    useEffect(() => {
        if (!props.data.reading) {
            inputDate.current.value = startDate;
            props.updateDate(inputDate.current.value);
        }

    }, [])

    const onChangeDate = () => {
        if (inputDate) {
            props.updateDate(inputDate.current.value);
            setIsValidClass("form-control is-valid");
        }
    }

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="date">Fecha</label>
            </div>
            <div className="form-control-input">
                <BeShowed show={!props.data.reading}>
                    <input className={isValidClass}
                        id="date" type="date" ref={inputDate}
                        onChange={onChangeDate} min={"2021-01-01"} max={startDate} />
                </BeShowed>
                <BeShowed show={props.data.reading}>
                    <input className={isValidClass}
                        id="date" type="date" ref={inputDate}
                        min={"2021-01-01"} max={startDate} defaultValue={props.data.date_production} readOnly />
                </BeShowed>
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

export default connect(mapStateToProps, mapDispatchToProps)(DateProduction);
