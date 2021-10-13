import React, { useRef, useEffect, useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import BeShowed from "../../../common/BeShowed";
import validateFloatNumbers from "../../../utils/validateFloatNumbers";
import setInstallmentsMonths from "./setInstallmentsMonths";
import Axios from "axios";

const PORT = require('../../../config');

export default function ExtraDataAdvances(props) {
    let data = props.data;
    const inputMonths = useRef(null);
    const inputAmountTotal = useRef(null);
    const [months, setMonths] = useState("null");
    const [amountTotal, setAmountTotal] = useState("null");
    const [isValidClassMonths, setIsValidClassMonths] = useState("form-control");
    const [isValidClassAmountTotal, setIsValidClassAmountTotal] = useState("form-control");
    const [installments, setInstallments] = useState(false);
    const [load, setLoad] = useState(false);

    const [value, setValue] = useState(0);
    const [valid, setValid] = useState(false);

    const inputMonth = useRef(null);
    const inputAmountInstallments = useRef(null);
    const [amountInstallments, setAmountInstallments] = useState("null");
    const [isValidClassAmountInstallments, setIsValidClassAmountInstallments] = useState("form-control");
    const [option, setOption] = useState([{amount: 0, label: ""}]);



    useEffect(()=>{
        if (!load) {
            if(props.data.reading || props.data.editing){
                Axios.get(PORT() + `/api/installments?dniEmployee=${data.dniEmployee}&date=${data.date}`)
                    .then((response) => {
                        data.installments = response.data;
                        data.months = response.data.length;
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
            props.loadBack({amount: data.amount, installments: option, months: option.length});
            inputMonths.current.value = option.length;
            data.installments = option;
            data.months = option.length;
        }
    }, [option, data, props]);

    const handleAmountInstallments = () => {
        setAmountInstallments(inputAmountInstallments.current.value);
    }
    const handlerTabSelection = () => {
        let aux = parseInt(inputMonth.current.value);
        if(aux > -1) {
            setValue(aux);
            setValid(true);
        } else setValid(false);
    }

    const handleMonths = () => {
        setValue(0);
        setValid(false);
        inputMonth.current.value = -1;
        setMonths(inputMonths.current.value);
        setInstallments(false);
    }
    const handleAmountTotal = () => {
        setValue(0);
        setValid(false);
        inputMonth.current.value = -1;
        setAmountTotal(inputAmountTotal.current.value);
    }
    const handleInstallments = () => {
        if (option.length > 0) {
            setInstallments(!installments);
        } else {
            setInstallments(false);
        }
    }

    //Monto total
    useEffect(() => {
        const amount = parseInt(inputAmountTotal.current.value.trim());
        const month = parseInt(inputMonths.current.value.trim());
        if (amount >= month && month > 0 && month < 19) {
            setIsValidClassAmountTotal("form-control is-valid");
            data.amount = amount;
            let aux = setInstallmentsMonths(data, (amountTotal % month), month, amountTotal);
            setOption(aux);
            data.installments = aux;
            props.load(data);
        }
        else {
            setIsValidClassAmountTotal("form-control");
            if (!data.nroDNI && amount) {
                data.amount = null;
                setOption([{amount: 0, label: ""}]);
                data.installments = {amount: 0, label: ""};
            }
            props.load(data);
        }
        setInstallments(false);
    }, [months, amountTotal, props, data]);

    //Meses
    useEffect(() => {
        const month = parseInt(inputMonths.current.value.trim());
        if (month > 0 && month < 19 && amountTotal >= month) {
            setIsValidClassMonths("form-control is-valid");
            let aux = setInstallmentsMonths(data, (amountTotal % month), month, amountTotal);
            setOption(aux);
            data.installments = aux;
            data.months = month;
            props.load(data);
        }
        else {
            setIsValidClassMonths("form-control");
            if (!data.nroDNI && month > 0) {
                setOption([{amount: 0, label: ""}]);
                data.installments = {amount: 0, label: ""};
                data.months = null;
            }
            props.load(data);
        }
        setInstallments(false);
    }, [months, amountTotal, props, data]);

    const validate = (e) => {
        if (e.target.value.length > 8) e.target.value = e.target.value.slice(0, 8);
    }

    const validateMonts = (e) => {
        if (e.target.value.length > 2) e.target.value = e.target.value.slice(0, 2);
    }
    useEffect(() => {
        if (valid && installments){
            const amount = inputAmountInstallments.current.value.trim();
            if (amount > 0) {
                setIsValidClassAmountInstallments("form-control is-valid");
                option[value].amount = amount;
            }
            else {
                setIsValidClassAmountInstallments("form-control");
                option[value].amount = amount;
            }
        }
    }, [amountInstallments, option, valid, months, amountTotal, installments, value]);

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
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="amountTotal" >Cuota</label>
                </div>
                <div className="form-control-input" style={{marginLeft: '2.2%', maxWidth: '90%'}} >
                    <select className="form-select" id="InstallmentMonth" defaultValue="-1" ref={inputMonth} onChange={handlerTabSelection} style={{fontFamily: 'Abel, sans-serif'}}>
                        <option disabled value="-1">Seleccione cuota a consultar...</option>
                        {
                            option?.map((month, i) => (
                                <option key={i} value={i}>{month.label}</option>
                            ))
                        }
                    </select>
                </div>
                            
                <div className="form-control-button" style={{marginLeft: '2.8%', maxWidth: '5%'}} >
                    <button className="btn" style={{backgroundColor: '#A5DEF9'}} onClick={handleInstallments}><FontAwesomeIcon style={{color: '#383C77'}} icon={faBars} /></button>
                </div>
            </div>
            <hr></hr>
            <BeShowed show={valid && value >= 0 && installments}>
                <div className="formRow">
                    <h2>Cuota N° {parseInt(value) + 1}: 
                        <small className="text-muted"> {option[value].label}</small>
                    </h2>
                </div>
                <BeShowed show={props.data.reading}>
                    <div className="formRow">
                        <div className="form-control-label">
                            <label htmlFor="amountInstallments">Monto a pagar*</label>
                        </div>
                        <div className="form-control-input">
                            <input className={isValidClassAmountInstallments} id="amountInstallments" readOnly type="number" ref={inputAmountInstallments} onChange={handleAmountInstallments} min="1" placeholder="Ingrese monto..." onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)} defaultValue={option[value].amount} />
                        </div>
                    </div>
                </BeShowed>
                <BeShowed show={!props.data.reading}>
                    <div className="formRow">
                        <div className="form-control-label">
                            <label htmlFor="amountInstallments">Monto a pagar*</label>
                        </div>
                        <div className="form-control-input">
                            <input className={isValidClassAmountInstallments} id="amountInstallments" readOnly type="number" ref={inputAmountInstallments} onChange={handleAmountInstallments} min="1" placeholder="Ingrese monto..." onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)} defaultValue={option[value].amount} />
                        </div>
                    </div>
                </BeShowed>
            </BeShowed>
        </>
    );
}