import React, { useRef, useEffect, useState } from "react";
import BeShowed from "../../../common/BeShowed";
import validateFloatNumbers from "../../../utils/validateFloatNumbers";
import setInstallmentsMonths from "./setInstallmentsMonths";
import InstallmentTable from "./InstallmentsTable";
import formattedDate from "../../../utils/formattedDate";
import UploadByName from "./UploadByName";
import warningMessage from "../../../utils/WarningMessages/warningMessage";
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

    const realTotal = () => {
        let acu = 0;
        option.map(op => { acu += op.amount })
        return acu;
    }
    //Data

    const maxDate = formattedDate(new Date());
    const minDate = formattedDate(new Date(), 0, -14);
    const minTotal = data.pay;
    const [payedCuotes, setPayedCuotes] = useState(0);
    const [minCuotes, setMinCuotes] = useState(1);
    const startDate = formattedDate(new Date());
    let startFirstMonth = formattedDate(new Date(), 2);
    const [maxFirstMonth, setMaxFirstMonth] = useState(formattedDate(new Date(), 6));
    const inputEmployee = useRef(null);
    const inputDate = useRef(null);
    const inputFirstMonth = useRef(null);
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState(null);
    const [date, setDate] = useState("null");
    const [firstMonth, setFirstMonth] = useState(option[0].month);
    const [isValidClass, setIsValidClass] = useState("form-control");

    const handleEmployee = (id) => setEmployee(id);
    const onChangeDate = () => {
        if (inputDate) {
            setDate(inputDate.current.value);
            setMaxFirstMonth(formattedDate(new Date(inputDate.current.value), 6));
        }
    }

    const onChangeFirstMonth = () => {
        if (inputFirstMonth) {
            data.firstMonth = inputFirstMonth.current.value + '-01';
            setFirstMonth(inputFirstMonth.current.value + '-01');
            data.installments[0].month = inputFirstMonth.current.value + '-01';
            props.load(data);
        }
    }
    useEffect(() => {
        if (props.data.reading || props.data.editing) {
            Axios.get(PORT() + `/api/installments?dniEmployee=${props.data.nroDNI}&date=${props.data.date}`)
                .then((response) => {
                    let aux = 0;
                    response?.data.map(installments => { if (installments.pay) aux += 1 });
                    setPayedCuotes(aux);
                    setMonths(props.data.months);
                    data.months = props.data.months;

                    inputFirstMonth.current.value = response.data[0].month.slice(0, -17);
                    setFirstMonth(inputFirstMonth.current.value + '-01');
                    data.firstMonth = inputFirstMonth.current.value + '-01';
                    setOption(response.data);
                    data.installments = response.data;
                    props.load(data);
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, []);

    //find employees with amount of advances
    useEffect(() => {
        Axios.get(PORT() + `/api/employeesadvances`)
            .then((response) => {
                response.data.forEach((person) => {
                    person.name += ' ';
                    person.name += person.last_name;
                });
                setEmployees(response.data);
            })
            .catch((err) => {
                console.log(err)
            })
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
            if (data.dniEmployee !== employee) {
                employees?.forEach((e) => {
                    if (e.dni === employee && e.advance > 3) warningMessage('Atención', 'El empleado seleccionado ya posee más de 3 adelantos registrados.', 'warning');
                });
            }
            data.dniEmployee = employee;
            props.load(data);
        }
    }, [employee, data, employees]);

    //DateAdvances
    useEffect(() => {

        if (data.date !== inputDate.current.value) {
            data.date = inputDate.current.value;
            props.load(data);
            if (parseInt(firstMonth.slice(0, -5)) === parseInt(data.date.slice(0, -5))) {
                if (parseInt(firstMonth.slice(5, -3)) < parseInt(data.date.slice(5, -3))) {
                    inputFirstMonth.current.value = null;
                    data.firstMonth = null;
                }
            }
            else if (parseInt(firstMonth.slice(0, -5)) < parseInt(data.date.slice(0, -5))) {
                inputFirstMonth.current.value = null;
                data.firstMonth = null;
            }
        }
    }, [startDate, date, data]);

    //extra

    const handleMonths = () => {
        setMonths(inputMonths.current.value);
    }
    const handleAmountTotal = () => {
        setAmountTotal(inputAmountTotal.current.value);
    }

    //Monto total & Meses
    useEffect(() => {
        const month = parseInt(inputMonths.current.value.trim());
        const amount = parseInt(inputAmountTotal.current.value.trim());
        const first = inputFirstMonth.current.value + '-01';
        if (amount > data.pay) setMinCuotes(payedCuotes + 1);
        else setMinCuotes(payedCuotes);

        if (month !== NaN && amount != NaN && month >= minCuotes && month < 19 && amount >= month && amount >= minTotal && first.length === 10) {
            setIsValidClassAmountTotal("form-control is-valid");
            setIsValidClassMonths("form-control is-valid");
            let aux = setInstallmentsMonths(first, month, amount - data.pay, data.installments, payedCuotes);
            setOption(aux);
            data.installments = aux;
        }
        else {
            setIsValidClassMonths("form-control");
            setIsValidClassAmountTotal("form-control");
            if (!data.nroDNI && month > 0 && !props.data.editing && !props.data.reading) {
                data.installments = [{ month: first, amount: 0, label: "", pay: 0 }];
            }
        }
        data.months = month;
        data.amount = amount;
        props.load(data);
    }, [months, amountTotal, data, firstMonth, employee, payedCuotes]);

    const validate = (e) => {
        if (e.target.value.length > 8) e.target.value = e.target.value.slice(0, 8);
    }

    const validateMonts = (e) => {
        if (e.target.value.length > 2) e.target.value = e.target.value.slice(0, 2);
    }
    return (
        <>
            <h2>Datos del adelanto</h2>
            <div className="formRow d-flex">
                <div className="form-control-label">
                    <label htmlFor="employee" >Empleado*</label>
                </div>
                <BeShowed show={props.data.reading || props.data.editing}>
                    <div className="form-control-input">
                        <input className={isValidClass} style={{maxWidth: '100em', marginLeft: 'auto'}} id="employee" readOnly type="text" maxLength="80" ref={inputEmployee} defaultValue={props.data.name ? props.data.name + " " + props.data.last_name : null} />
                    </div>
                </BeShowed>
                <BeShowed show={!props.data.reading && !props.data.editing}>
                    <UploadByName list={employees} upload={handleEmployee} itemName="Empleado" listName="employeeList" className={isValidClass} default={props.data.name ? props.data.name + " " + props.data.last_name : null}
                        placeholder="Ingrese el nombre del empelado que busca..." maxLength="80" />
                </BeShowed>
            </div>
            <div className="formRow d-flex">
                <div className="form-control-label">
                    <label htmlFor="date" >Fecha de adelanto*</label>
                </div>
                <div className="form-control-input">
                    <input className="form-control" readOnly={props.data.reading || props.data.editing} style={{maxWidth: '100em', marginLeft: 'auto'}} id="date" type="date" ref={inputDate} onChange={onChangeDate} min={minDate} max={maxDate} defaultValue={props.data.date} />
                </div>
            </div>
            <div className="formRow d-flex">
                <div className="form-control-label">
                    <label htmlFor="firstMonth" >Primer mes a pagar*</label>
                </div>
                <div className="form-control-input">
                    <input className="form-control" style={{maxWidth: '100em', marginLeft: 'auto'}} id="firstMonth" readOnly={props.data.reading} type="month" ref={inputFirstMonth} onChange={onChangeFirstMonth} min={date !== "null" ? date.slice(0, -3) : startDate.slice(0, -3)} max={maxFirstMonth.slice(0, -3)} />
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="amountTotal" >Monto total*</label>
                </div>
                <div className="form-control-input d-flex">
                    <span className="input-group-text" style={{width: '2em', marginLeft: 'auto'}}>$</span>
                    <input className={isValidClassAmountTotal} readOnly={props.data.reading || !inputFirstMonth.current?.value} style={{width: '98em'}} id="amountTotal" type="number" ref={inputAmountTotal} onChange={handleAmountTotal} min={months > minTotal ? months : minTotal} placeholder="Ingrese monto..." onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)} defaultValue={props.data.amount ? props.data.amount : null} />
                </div>
            </div>
            <h2>Plan de devolución</h2>
            <BeShowed show={props.data.reading || props.data.editing}>
                <div className="formRow">
                    <label>Monto pagado hasta la fecha ${props.data.pay}</label>
                </div>
            </BeShowed>
            <div className="formRow">
                <div className="form-control-label">
                    <label>Monto restante a pagar: ${amountTotal - data.pay > 0 ? amountTotal - data.pay : data.amount - data.pay > 0 ? data.amount - data.pay : 0}</label>
                </div>
            </div>
            <div className="formRow d-flex">
                <div className="form-control-label">
                    <label htmlFor="months" >Cantidad de cutas* </label>
                </div>
                <div className="form-control-input">
                    <input className={isValidClassMonths} readOnly={props.data.reading || !inputFirstMonth.current?.value} style={{maxWidth: '100em', marginLeft: 'auto'}} id="months" type="number" ref={inputMonths} onChange={handleMonths} min={minCuotes} max={18 > amountTotal ? amountTotal : 18} placeholder="Ingrese cantidad de cuotas..." onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validateMonts(e)} defaultValue={data.months ? data.months : null} />
                    <small className="text-muted">(entre 1 y 18 meses)</small>
                </div>
            </div>
            <hr></hr>
            <BeShowed show={option[0].amount > 0} >
                <InstallmentTable installments={option} reading={props.data.reading}></InstallmentTable>
            </BeShowed>
        </>
    );
}