import React, { useRef, useEffect, useState } from "react";
import BeShowed from "../../../common/BeShowed";
import validateFloatNumbers from "../../../utils/validateFloatNumbers";
import setInstallmentsMonths from "./setInstallmentsMonths";
import Axios from "axios";
import InstallmentTable from "./InstallmentsTable";
import formattedDate from "../../../utils/formattedDate";

const PORT = require('../../../config');

export default function ExtraDataAdvances(props) {
    let data = props.data;
    const inputMonths = useRef(null);
    const inputAmountTotal = useRef(null);
    const [months, setMonths] = useState("null");
    const [amountTotal, setAmountTotal] = useState("null");
    const [isValidClassMonths, setIsValidClassMonths] = useState("form-control");
    const [isValidClassAmountTotal, setIsValidClassAmountTotal] = useState("form-control");
    const [load, setLoad] = useState(false);
    const [firstMonth, setFirstMonth] = useState(props.firstMonth);

    const [option, setOption] = useState([{month: firstMonth,amount: 0, label: "", pay: 0}]);

    useEffect(()=>{
        if (!load) {
            if(props.data.reading || props.data.editing){
                Axios.get(PORT() + `/api/installments?dniEmployee=${data.dniEmployee}&date=${data.date}`)
                    .then((response) => {
                        data.installments = response.data;
                        data.months = response.data.length;
                        data.firstMonth = response.data[0].month;
                        setFirstMonth(response.data[0].month);
                        setOption(response.data);
                        setAmountTotal(data.amount);
                    })
                    .catch((error) => console.log(error));
                }

            setOption(data.installments);
            setLoad(true);
        }
    }, [data, load, props.data.editing, props.data.reading]);

    useEffect(()=>{
        if (option[0].nroDNI){
            props.loadBack({amount: data.amount, installments: option, months: option.length, firstMonth: option[0].month});
            inputMonths.current.value = option.length;
            data.installments = option;
            data.months = option.length;
        }
        console.log(option, data)
    }, [option, data, props]);

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

        console.log(props.data.firstMonth, data.firstMonth, firstMonth)
        if (amount >= month && month > 0 && month < 19) {
            setIsValidClassAmountTotal("form-control is-valid");
            data.amount = amount;
            let aux = setInstallmentsMonths(data.firstMonth, months, amountTotal - data.pay, data.installments);
            setOption(aux);
            data.installments = aux;
            props.load(data);
        }
        else {
            setIsValidClassAmountTotal("form-control");
            if (!data.nroDNI && amount && (props.data.editing || props.data.reading)) {
                data.amount = null;
                data.installments = [{month: data.firstMonth, amount: 0, label: "", pay: 0}];
                setOption([{month: data.firstMonth, amount: 0, label: "", pay: 0}]);
            } else {
                data.amount = amount;
                data.installments = [{month: data.firstMonth, amount: 0, label: "", pay: 0}];
                setOption([{month: data.firstMonth, amount: 0, label: "", pay: 0}]);
            }
            props.load(data);
        }
    }, [months, amountTotal, props, data, props.data.firstMonth, firstMonth]);

    //Meses
    useEffect(() => {
        const month = parseInt(inputMonths.current.value.trim());

        console.log(props.data.firstMonth, data.firstMonth, firstMonth)
        if (month > 0 && month < 19 && amountTotal >= month) {
            setIsValidClassMonths("form-control is-valid");
            let aux = setInstallmentsMonths(data.firstMonth, months, amountTotal - data.pay, data.installments);
            setOption(aux);
            data.installments = aux;
            data.months = month;
            props.load(data);
        }
        else {
            setIsValidClassMonths("form-control");
            if (!data.nroDNI && month > 0 && (props.data.editing || props.data.reading)) {
                data.installments = [{month: data.firstMonth, amount: 0, label: "", pay: 0}];
                setOption([{month: data.firstMonth, amount: 0, label: "", pay: 0}]);
                data.months = null;
            } else {
                data.installments = [{month: data.firstMonth, amount: 0, label: "", pay: 0}];
                setOption([{month: data.firstMonth, amount: 0, label: "", pay: 0}]);
                data.months = month;
            }
            props.load(data);
        }
    }, [months, amountTotal, props, data, props.data.firstMonth, firstMonth]);

    const validate = (e) => {
        if (e.target.value.length > 8) e.target.value = e.target.value.slice(0, 8);
    }

    const validateMonts = (e) => {
        if (e.target.value.length > 2) e.target.value = e.target.value.slice(0, 2);
    }

    return (
        <>
            <h2>Plan de devolución</h2>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="amountTotal" >Monto total*</label>
                </div>
                <div className="form-control-input">
                    <BeShowed show={props.data.reading}>
                        <input className={isValidClassAmountTotal} id="amountTotal" readOnly type="number" ref={inputAmountTotal} onChange={handleAmountTotal} defaultValue={props.data.amount} />
                    </BeShowed>
                    <BeShowed show={!props.data.reading}>
                        <input className={isValidClassAmountTotal} id="amountTotal" type="number" ref={inputAmountTotal} onChange={handleAmountTotal} min={months} placeholder="Ingrese monto..." onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)} defaultValue={props.data.amount} />
                    </BeShowed>
                </div>
            </div>
            <BeShowed show={props.data.reading || props.data.editing}>
                <div className="formRow">
                    <label>Monto pagado hasta la fecha ${props.data.pay}</label>
                </div>
            </BeShowed>
            <label>Monto restante a pagar: {amountTotal - data.pay > 0 ? amountTotal - data.pay : 0}</label>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="months" >Cantidad de cutas* 
                        <small className="text-muted">(en meses)</small>
                        </label>
                </div>
                <div className="form-control-input">
                    <BeShowed show={props.data.reading}>
                        <input className={isValidClassMonths} id="months" readOnly type="number" ref={inputMonths} onChange={handleMonths} defaultValue={data.months} />
                    </BeShowed>
                    <BeShowed show={!props.data.reading}>
                        <input className={isValidClassMonths} id="months" type="number" ref={inputMonths} onChange={handleMonths} min="1" max={18 > amountTotal ? amountTotal : 18} placeholder="Ingrese cantidad de cuotas..." onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validateMonts(e)} defaultValue={data.months} />
                    </BeShowed>
                </div>
            </div>
            <div className="formRow">
                <small className="text-muted">Por defecto el monto de cada cuota sera ${parseInt((amountTotal - data.pay)/months) > 0?parseInt((amountTotal - data.pay)/months): 0}, a excepción de la última que tendra el sobrante (en caso de existir).</small>
            </div>
            <hr></hr>
            <BeShowed show={option[0].amount > 0}>
                <InstallmentTable installments={option} reading={props.data.reading}></InstallmentTable>
            </BeShowed>
        </>
    );
}