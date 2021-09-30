import React, { useRef, useState, useEffect } from "react";
import Axios from 'axios';
import BeShowed from "../../../common/BeShowed";
import validateFloatNumbers from "../../../utils/validateFloatNumbers";
import UploadByName from "./UploadByName";
import formattedDate from "../../../utils/formattedDate";

const PORT = require('../../../config');

export default function DataAdvances(props) {
    const maxDate = formattedDate(new Date(), 2);
    const minDate = formattedDate(new Date(), 0, -14);
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
        console.log(data);
    }, [data])

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
    }, [true]);

    useEffect(() => {
        if (!employee) {
            setIsValidClass("form-control")
            data.id_employee = employee;
            props.load(data);
        }
        else {
            setIsValidClass("form-control is-valid");
            data.id_employee = employee;
            props.load(data);
        }
    }, [employee, props, data]);

    useEffect(() => {
        if (!inputDate.current.value && !props.data.editing) {
            inputDate.current.value = startDate;
            setDate(inputDate.current.value);
            data.date = inputDate.current.value;
            props.load(data);
        }
        else if (!inputDate.current.value && props.data.editing) {
            inputDate.current.value = props.data.date;
            setDate(inputDate.current.value);
        }
        else {
            data.date = inputDate.current.value;
            props.load(data);
        }
    }, [startDate, date, data]);

    const validate = (e) => {
        if (e.target.value.length > 8) e.target.value = e.target.value.slice(0, 8);
    }

    return (
        <>
            <h2>Datos del adelanto</h2>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="employee" >Empleado*</label>
                </div>
                <BeShowed show={props.data.reading}>
                    <div className="form-control-input">
                        <input className={isValidClass} id="employee" readOnly type="text" maxLength="80" ref={inputEmployee} defaultValue={props.data.employee} />
                    </div>
                </BeShowed>
                <BeShowed show={!props.data.reading}>
                    <UploadByName list={employees} upload={handleEmployee} itemName="Empleado" listName="employeeList" class={isValidClass}
                                    placeholder="Ingrese el nombre del empelado que busca..." maxLength="80" />
                </BeShowed>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="date" >Fecha de adelanto*</label>
                </div>
                <div className="form-control-input">
                    <BeShowed show={props.data.reading}>
                        <input className="form-control" id="date" readOnly type="date" ref={inputDate} defaultValue={props.data.date} />
                    </BeShowed>
                    <BeShowed show={!props.data.reading}>
                        <input className="form-control" id="date" type="date" ref={inputDate} onChange={onChangeDate} min={minDate} max={maxDate} defaultValue={props.data.date} />
                    </BeShowed>
                </div>
            </div>
        </>
    );
}