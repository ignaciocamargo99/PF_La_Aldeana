import React, { useRef, useState, useEffect } from "react";
import Axios from 'axios';
import BeShowed from "../../../common/BeShowed";
import UploadByName from "./UploadByName";
import formattedDate from "../../../utils/formattedDate";
import warningMessage from "../../../utils/WarningMessages/warningMessage";

const PORT = require('../../../config');

export default function DataAdvances(props) {
    const maxDate = formattedDate(new Date(), 2);
    const minDate = formattedDate(new Date(), 0,-14);
    const startDate = formattedDate(new Date());
    const startFirstMonth = formattedDate(new Date(),2);
    const [maxFirstMonth, setMaxFirstMonth] = useState(formattedDate(new Date(), 6));
    const inputEmployee = useRef(null);
    const inputDate = useRef(null);
    const inputFirstMonth = useRef(null);
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState(null);
    const [date, setDate] = useState("null");
    const [firstMonth, setFirstMonth] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");
    const [isValidClassDate, setIsValidClassDate] = useState("form-control");
    const [isValidClassFirstMonth, setIsValidClassFirstMonth] = useState("form-control");
    let data = props.data;

    const handleEmployee = (id) => setEmployee(id);
    const onChangeDate = () => {
        if (inputDate) {
            setDate(inputDate.current.value);
            setMaxFirstMonth(formattedDate(new Date(inputDate.current.value), 6));
        }
    }

    const onChangeFirstMonth = () => {
        if (inputFirstMonth) setFirstMonth(inputFirstMonth.current.value);
    }

    useEffect(()=>{
        Axios.get(PORT() + `/api/employeesadvances`)
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
        inputFirstMonth.current.value = startFirstMonth;
    }, [startFirstMonth, data, props]);

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
            employees?.forEach((e)=>{
                if (e.dni = employee && e.advance > 3) warningMessage('Atención', 'El empleado seleccionado ya posee más de 3 adelantos registrados.', 'warning');
            });
            data.dniEmployee = employee;
            props.load(data);
        }
    }, [employee, data, props]);

    //DateAdvances
    useEffect(() => {
        if (!props.data.editing && !inputDate.current.value) {
            inputDate.current.value = startDate;
            setDate(inputDate.current.value);
            data.date = inputDate.current.value;
            setIsValidClassDate("form-control");
            props.load(data);
        }
        else if (!inputDate.current.value) {
            inputDate.current.value = props.data.date;
            setDate(inputDate.current.value);
            setIsValidClassDate("form-control");
        }
        else {
            data.date = inputDate.current.value;
            props.load(data);
            setIsValidClassDate("form-control is-valid");
        }
    }, [startDate, date, data, props]);

    //FirstMonth
    useEffect(() => {
        if (!props.data.editing && !inputFirstMonth.current.value) {
            inputFirstMonth.current.value = startFirstMonth;
            setFirstMonth(inputFirstMonth.current.value);
            data.firstMonth = inputFirstMonth.current.value;
            props.load(data);
            setIsValidClassDate("form-control");
        }
        else if (!inputFirstMonth.current.value) {
            inputFirstMonth.current.value = data.firstMonth;
            setFirstMonth(inputFirstMonth.current.value);
            setIsValidClassDate("form-control");
        }
        else {
            if (new Date(inputFirstMonth.current.min).getMonth() > new Date(firstMonth).getMonth() && new Date(inputFirstMonth.current.max) <= new Date(firstMonth)){
                data.installments = [{month: props.data.installments[0].month, amount: 0, label: "", pay: 0}];
                props.load(data);
                setIsValidClassDate("form-control");
            } else {
                setIsValidClassFirstMonth("form-control is-valid");
                data.installments[0].month = data.firstMonth;
                data.firstMonth = inputFirstMonth.current.value;
                props.load(data);
            }
        }
    }, [startFirstMonth, firstMonth, data, props, props.data.installments[0].month]);

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
                        <input className={isValidClassDate} id="date" readOnly type="date" min={minDate} max={maxDate} ref={inputDate} defaultValue={props.data.date} />
                    </BeShowed>
                    <BeShowed show={!props.data.reading  && !props.data.editing}>
                        <input className={isValidClassDate} id="date" type="date" ref={inputDate} onChange={onChangeDate} min={minDate} max={maxDate} defaultValue={props.data.date} />
                    </BeShowed>
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="firstMonth" >Fecha primer pago*</label>
                </div>
                <div className="form-control-input">
                    <BeShowed show={props.data.reading}>
                        <input className={isValidClassFirstMonth} id="firstMonth" readOnly type="date" min={date !== "null" ? date : startDate} max={maxFirstMonth} ref={inputFirstMonth} defaultValue={props.data.installments[0].month} />
                    </BeShowed>
                    <BeShowed show={!props.data.reading}>
                        <input className={isValidClassFirstMonth} id="firstMonth" type="date" ref={inputFirstMonth} onChange={onChangeFirstMonth} min={date !== "null" ? date : startDate} max={maxFirstMonth} defaultValue={props.data.installments[0].month} />
                    </BeShowed>
                </div>
            </div>
        </>
    );
}