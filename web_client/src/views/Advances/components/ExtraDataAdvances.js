import React, { useRef, useEffect, useState } from "react";
import BeShowed from "../../../common/BeShowed";
import validateFloatNumbers from "../../../utils/validateFloatNumbers";
import setInstallmentsMonths from "./setInstallmentsMonths";
import InstallmentTable from "./InstallmentsTable";
import formattedDate from "../../../utils/formattedDate";
import UploadByName from "./UploadByName";
import warningMessage from "../../../utils/WarningMessages/warningMessage";
import dateToString from "../../../utils/ConverterDate/dateToString";
import Axios from 'axios';
const PORT = require('../../../config');

export default function ExtraDataAdvances(props) {
    let data = props.data;
    const inputMonths = useRef(null);
    const inputAmountTotal = useRef(null);
    const [months, setMonths] = useState("null");
    const [amountTotal, setAmountTotal] = useState("null");
    const [isValidClassMonths, setIsValidClassMonths] = useState("form-control");
    const [isValidClassAmountTotal, setIsValidClassAmountTotal] = useState("form-control");

    const [option, setOption] = useState(data.installments);

    //Data

    const maxDate = formattedDate(new Date(), 2);
    const minDate = formattedDate(new Date(), 0,-14);
    const startDate = formattedDate(new Date());
    let startFirstMonth = formattedDate(new Date(),2);
    const [maxFirstMonth, setMaxFirstMonth] = useState(formattedDate(new Date(), 6));
    const inputEmployee = useRef(null);
    const inputDate = useRef(null);
    const inputFirstMonth = useRef(null);
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState(null);
    const [date, setDate] = useState("null");
    const [firstMonth, setFirstMonth] = useState(option[0].month);
    const [isValidClass, setIsValidClass] = useState("form-control");
    const [isValidClassDate, setIsValidClassDate] = useState("form-control");
    const [isValidClassFirstMonth, setIsValidClassFirstMonth] = useState("form-control");

    const handleEmployee = (id) => setEmployee(id);
    const onChangeDate = () => {
        if (inputDate) {
            setDate(inputDate.current.value);
            setMaxFirstMonth(formattedDate(new Date(inputDate.current.value), 6));
        }
    }

    const onChangeFirstMonth = () => {
        console.log(inputFirstMonth.current.value);
        if (inputFirstMonth) setFirstMonth(inputFirstMonth.current.value);
    }

    //find employees with amount of advances
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
    }, [startFirstMonth]);

    //employee
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
            if (data.dniEmployee !== employee){
                employees?.forEach((e)=>{
                    if (e.dni === employee && e.advance > 3) warningMessage('Atención', 'El empleado seleccionado ya posee más de 3 adelantos registrados.', 'warning');
                });
            }
            data.dniEmployee = employee;
            props.load(data);
        }
    }, [employee, data, props, employees]);

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
            if (data.date !== inputDate.current.value){
                data.date = inputDate.current.value;
                props.load(data);
                setIsValidClassDate("form-control is-valid");
            }
        }
    }, [startDate, date, data, props]);

    useEffect(() => {
        if (!props.data.editing && !props.data.reading && !inputFirstMonth.current.value) {
            inputFirstMonth.current.value = startFirstMonth.slice(0,-3);
            setFirstMonth(inputFirstMonth.current.value + '-01');
            data.firstMonth = inputFirstMonth.current.value + '-01';
            props.load(data);
            setIsValidClassDate("form-control");
        }
        else if (!inputFirstMonth.current.value && !props.data.editing && !props.data.reading) {
            inputFirstMonth.current.value = data.firstMonth.slice(0,-3);
            setFirstMonth(inputFirstMonth.current.value + '-01');
            setIsValidClassDate("form-control");
        }
        else {
            if (new Date(inputFirstMonth.current.min).getMonth() > new Date(firstMonth).getMonth() && new Date(inputFirstMonth.current.max) <= new Date(firstMonth)){
                data.installments = [{month: props.data.installments[0].month, amount: 0, label: "", pay: 0}];
                props.load(data);
                setIsValidClassDate("form-control");
            } else {
                console.log(data)
                if ((props.data.reading && inputFirstMonth.current.value.length !== 10) || (props.data.editing && inputFirstMonth.current.value.length !== 10)) {
                    inputFirstMonth.current.value = data.firstMonth;
                    setFirstMonth(inputFirstMonth.current.value + '-01');
                    data.installments[0].month =  inputFirstMonth.current.value + '-01';
                    props.load(data);
                    setIsValidClassFirstMonth("form-control is-valid");
                } else {
                    if (data.firstMonth !== inputFirstMonth.current.value && firstMonth){
                        setIsValidClassFirstMonth("form-control is-valid");
                        data.firstMonth = inputFirstMonth.current.value + '-01';
                        setFirstMonth(inputFirstMonth.current.value + '-01');
                        data.installments[0].month =  inputFirstMonth.current.value + '-01';
                        props.load(data);
                    }
                }
            }
        }
    }, [startFirstMonth, firstMonth, data, props]);

    //extra

    const handleMonths = () => {
        setMonths(inputMonths.current.value);
    }
    const handleAmountTotal = () => {
        setAmountTotal(inputAmountTotal.current.value);
    }

    //Monto total
    useEffect(() => {
        const amount = parseInt(inputAmountTotal.current.value.trim());
        const month = parseInt(inputMonths.current.value.trim());
        const first = inputFirstMonth.current.value + '-01';
        
        if (amount >= month && month > 0 && month < 19 && first.length === 10 && data.nroDNI > 10000000) {
            setIsValidClassAmountTotal("form-control is-valid");
            data.amount = amount;
            let aux = setInstallmentsMonths(first, month, amount - data.pay, data.installments);
            setOption(aux);
            data.installments = aux;
            props.load(data);
        }
        else {
            setIsValidClassAmountTotal("form-control");
            if (!data.nroDNI && amount && (props.data.editing || props.data.reading)) {
                data.amount = null;
                data.installments = [{month: first, amount: 0, label: "", pay: 0}];
            } else {
                data.amount = amount;
                data.installments = [{month: first, amount: 0, label: "", pay: 0}];
            }
            props.load(data);
        }
    }, [months, amountTotal, props, data, firstMonth, employee, data.nroDNI]);

    //Meses
    useEffect(() => {
        const month = parseInt(inputMonths.current.value.trim());
        const amount = parseInt(inputAmountTotal.current.value.trim());
        const first = inputFirstMonth.current.value + '-01';

        if (month > 0 && month < 19 && amount >= month && first.length === 10 &&  data.nroDNI > 10000000) {
            setIsValidClassMonths("form-control is-valid");
            let aux = setInstallmentsMonths(first, month, amount - data.pay, data.installments);
            data.installments = aux;
            data.months = month;
            props.load(data);
        }
        else {
            setIsValidClassMonths("form-control");
            if (!data.nroDNI && month > 0 && (props.data.editing || props.data.reading)) {
                data.installments = [{month: first, amount: 0, label: "", pay: 0}];
                data.months = null;
            } else {
                data.installments = [{month: first, amount: 0, label: "", pay: 0}];
                data.months = month;
            }
            props.load(data);
        }
    }, [months, amountTotal, props, data, firstMonth, employee, data.nroDNI]);

    const validate = (e) => {
        if (e.target.value.length > 8) e.target.value = e.target.value.slice(0, 8);
    }

    const validateMonts = (e) => {
        if (e.target.value.length > 2) e.target.value = e.target.value.slice(0, 2);
    }
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
                    <label htmlFor="firstMonth" >Primer mes a pagar*</label>
                </div>
                <div className="form-control-input">
                    <BeShowed show={props.data.reading}>
                        <input className={isValidClassFirstMonth} id="firstMonth" readOnly type="month" min={date !== "null" ? date : startDate.slice(0,-3)} max={maxFirstMonth.slice(0,-3)} ref={inputFirstMonth} defaultValue={dateToString(data.firstMonth, true).slice(0,-3).length === 10 ? dateToString(data.firstMonth, true).slice(0,-3).length : null} />
                    </BeShowed>
                    <BeShowed show={!props.data.reading}>
                        <input className={isValidClassFirstMonth} id="firstMonth" type="month" ref={inputFirstMonth} onChange={onChangeFirstMonth} min={date !== "null" ? date.slice(0,-3) : startDate.slice(0,-3)} max={maxFirstMonth.slice(0,-3)} defaultValue={dateToString(data.firstMonth, true).slice(0,-3).length === 10 ? dateToString(data.firstMonth, true).slice(0,-3).length : null} />
                    </BeShowed>
                </div>
            </div>
            <h2>Plan de devolución</h2>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="amountTotal" >Monto total*</label>
                </div>
                <div className="form-control-input">
                    <BeShowed show={props.data.reading}>
                        <input className={isValidClassAmountTotal} id="amountTotal" readOnly type="number" ref={inputAmountTotal} onChange={handleAmountTotal} defaultValue={props.data.amount ? props.data.amount : null} />
                    </BeShowed>
                    <BeShowed show={!props.data.reading}>
                        <input className={isValidClassAmountTotal} id="amountTotal" type="number" ref={inputAmountTotal} onChange={handleAmountTotal} min={months} placeholder="Ingrese monto..." onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)} defaultValue={props.data.amount ? props.data.amount : null} />
                    </BeShowed>
                </div>
            </div>
            <BeShowed show={props.data.reading || props.data.editing}>
                <div className="formRow">
                    <label>Monto pagado hasta la fecha ${props.data.pay}</label>
                </div>
            </BeShowed>
            <label>Monto restante a pagar: {amountTotal - data.pay > 0 ? amountTotal - data.pay : data.amount - data.pay > 0 ? data.amount - data.pay : 0}</label>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="months" >Cantidad de cutas* 
                        <small className="text-muted">(en meses)</small>
                        </label>
                </div>
                <div className="form-control-input">
                    <BeShowed show={props.data.reading}>
                        <input className={isValidClassMonths} id="months" readOnly type="number" ref={inputMonths} onChange={handleMonths} defaultValue={data.months ? data.months : null} />
                    </BeShowed>
                    <BeShowed show={!props.data.reading}>
                        <input className={isValidClassMonths} id="months" type="number" ref={inputMonths} onChange={handleMonths} min="1" max={18 > amountTotal ? amountTotal : 18} placeholder="Ingrese cantidad de cuotas..." onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validateMonts(e)} defaultValue={data.months ? data.months : null} />
                    </BeShowed>
                </div>
            </div>
            <hr></hr>
            <BeShowed show={option[0].amount > 0}>
                <InstallmentTable installments={option} reading={props.data.reading}></InstallmentTable>
            </BeShowed>
        </>
    );
}