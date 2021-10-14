import React, { useRef, useState, useEffect } from "react";
import BeShowed from "../../../../common/BeShowed";
import validateFloatNumbers from "../../../../utils/validateFloatNumbers";
import Axios from 'axios';
import getEmployees from '../getEmployees';

const PORT = require('../../../../config');

export default function DataAssistance(props) {
    const [dateEntry, setDateEntry] = useState("null");
    const [dateEgress, setDateEgress] = useState("null");

    const inputDateEntry = useRef(null);
    const inputDateEgress = useRef(null);
    const [selectValue, setSelectValue] = useState("-1");
    const [employees, setEmployees] = useState([]);
    let data = props.data;

    useEffect(() => {
        Axios.get(`${PORT()}/api/employees`)
            .then((response) => setEmployees(response.data))
    }, []);

    const handleEmployee = (e) => setSelectValue(e.target.value);

    const handleDateEntry = () => {
        setDateEntry(inputDateEntry.current.value);
        data.date_entry = inputDateEntry.current.value;
        props.load(data);
    }
    const handleDateEgress = () => {
        setDateEgress(inputDateEgress.current.value);
        data.date_egress = inputDateEgress.current.value;
        props.load(data);

    }

    useEffect(() => {
        if (!props.data.reading) {
            let employee = null;
            if (selectValue) employee = selectValue;
            data.employee = employee;
            props.load(data);
        }
    }, [selectValue])


    return (
        <>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="employeeCharge" >Empleado*</label>
                </div>
                <div className="form-control-input">
                    <BeShowed show={props.data.reading || props.data.editing}>
                        <select className="form-control" id="employeeCharge" value={selectValue} readOnly>
                            <option disabled value="-1">{getEmployees(employees, props.data.dni)}</option>
                        </select>
                    </BeShowed>
                    <BeShowed show={!props.data.reading && !props.data.editing}>
                        <select className="form-control" id="employeeCharge" value={selectValue} onChange={handleEmployee}>
                            <option disabled value="-1">Seleccione un empleado</option>
                            {employees?.map((element, i) => {
                                return (<option key={i} value={element.dni}>{element.name} {element.last_name}</option>)
                            })}
                        </select>
                    </BeShowed>
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="dateEmployee" >Hora de ingreso*</label>
                </div>
                <div className="form-control-input">
                    <BeShowed show={props.data.reading}>
                        <input className="form-control" id="dateEmployee" readOnly type="time" ref={inputDateEntry} defaultValue={props.data.date_entry} onChange={handleDateEntry} />
                    </BeShowed>
                    <BeShowed show={!props.data.reading}>
                        <input className="form-control" id="dateEmployee" type="time" ref={inputDateEntry} onChange={handleDateEntry} defaultValue={props.data.date_entry} />
                    </BeShowed>
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="dateEmployee" >Hora de egreso</label>
                </div>
                <div className="form-control-input">
                    <BeShowed show={props.data.reading}>
                        <input className="form-control" id="dateEmployee" readOnly type="time" ref={inputDateEgress} defaultValue={props.data.date_egress ? props.data.date_egress : 'null'} onChange={handleDateEntry} />
                    </BeShowed>
                    <BeShowed show={!props.data.reading}>
                        <input className="form-control" id="dateEmployee" type="time" ref={inputDateEgress} onChange={handleDateEgress} defaultValue={props.data.date_egress ? props.data.date_egress : 'null'} />
                    </BeShowed>
                </div>
            </div>
        </>
    );
}