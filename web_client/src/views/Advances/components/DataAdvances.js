import React, { useRef, useState, useEffect } from "react";
import Axios from 'axios';
import BeShowed from "../../../common/BeShowed";
import UploadByName from "./UploadByName";
import formattedDate from "../../../utils/formattedDate";

const PORT = require('../../../config');

export default function DataAdvances(props) {
    const maxDate = formattedDate(new Date(), 2);
    const minDate = formattedDate(new Date(), 0,-14);
    const startDate = formattedDate(new Date());
    const inputEmployee = useRef(null);
    const inputDate = useRef(null);
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState(null);
    const [date, setDate] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");
    let data = props.data;

    const handleEmployee = (id) => setEmployee(id);
    const onChangeDate = () => {
        if (inputDate) setDate(inputDate.current.value);
    }

    useEffect(()=>{
        Axios.get(PORT() + `/api/employees`)
        .then((response) => {
            response.data.forEach((person)=>{
                person.name += ' ';
                person.name += person.last_name;
            });
            setEmployees(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, []);

    useEffect(() => {
        if (!employee) {
            setIsValidClass("form-control");
            data.dniEmployee = employee;
            if (data.nroDNI > 0) {
                data.dniEmployee = data.nroDNI;
            }
            props.load(data);
        }
        else {
            setIsValidClass("form-control is-valid");
            data.dniEmployee = employee;
            props.load(data);
        }
    }, [employee, props, data]);

    useEffect(() => {
        if (!props.data.editing && !inputDate.current.value) {
            inputDate.current.value = startDate;
            setDate(inputDate.current.value);
            data.date = inputDate.current.value;
            props.load(data);
        }
        else if (!inputDate.current.value) {
            inputDate.current.value = props.data.date;
            setDate(inputDate.current.value);
        }
        else {
            data.date = inputDate.current.value;
            props.load(data);
        }
    }, [startDate, date, data]);

    return (
        <>
            <h2>Datos del adelanto</h2>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="employee" >Empleado*</label>
                </div>
                <BeShowed show={props.data.reading || props.data.editing}>
                    <div className="form-control-input">
                        <input className={isValidClass} id="employee" readOnly type="text" maxLength="80" ref={inputEmployee} defaultValue={props.data.name ? props.data.name + " " + props.data.last_name : null} />
                    </div>
                </BeShowed>
                <BeShowed show={!props.data.reading && !props.data.editing}>
                    <UploadByName list={employees} upload={handleEmployee} itemName="Empleado" listName="employeeList" class={isValidClass} default={props.data.name ? props.data.name + " " + props.data.last_name : null}
                                    placeholder="Ingrese el nombre del empelado que busca..." maxLength="80" />
                </BeShowed>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="date" >Fecha de adelanto*</label>
                </div>
                <div className="form-control-input">
                    <BeShowed show={props.data.reading  || props.data.editing}>
                        <input className="form-control" id="date" readOnly type="date" min={minDate} max={maxDate} ref={inputDate} defaultValue={props.data.date} />
                    </BeShowed>
                    <BeShowed show={!props.data.reading  && !props.data.editing}>
                        <input className="form-control" id="date" type="date" ref={inputDate} onChange={onChangeDate} min={minDate} max={maxDate} defaultValue={props.data.date} />
                    </BeShowed>
                </div>
            </div>
        </>
    );
}