import React, { useRef, useEffect, useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import BeShowed from "../../../common/BeShowed";
import validateFloatNumbers from "../../../utils/validateFloatNumbers";
import setInstallmentsMonths from "./setInstallmentsMonths";

export default function ExtraDataAdvances(props) {
    let data = props.data;
    const inputMonths = useRef(null);
    const inputAmountTotal = useRef(null);
    const [months, setMonths] = useState("null");
    const [amountTotal, setAmountTotal] = useState("null");
    const [isValidClassMonths, setIsValidClassMonths] = useState("form-control");
    const [isValidClassAmountTotal, setIsValidClassAmountTotal] = useState("form-control");
    const [installments, setInstallments] = useState(false);

    const [value, setValue] = useState(0);
    const [valid, setValid] = useState(false);

    const inputMonth = useRef(null);
    const inputAmountInstallments = useRef(null);
    const [amountInstallments, setAmountInstallments] = useState("null");
    const [isValidClassAmountInstallments, setIsValidClassAmountInstallments] = useState("form-control");

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
        setMonths(inputMonths.current.value);
        setInstallments(false);
        inputMonth.current.value = -1;
    }
    const handleAmountTotal = () => {
        setAmountTotal(inputAmountTotal.current.value);
    }
    const handleInstallments = () => {
        if (data.installments.length > 0) {
            setInstallments(!installments);
        } else {
            setInstallments(false);
        }
    }

    //Monto total
    useEffect(() => {
        const amount = inputAmountTotal.current.value.trim();
        const month = inputMonths.current.value.trim();
        if (amount >= month && month > 0 && month < 19) {
            setIsValidClassAmountTotal("form-control is-valid");
            data.amount = amount;
            data.installments = setInstallmentsMonths(data, (amountTotal % month), month, amountTotal);
            props.load(data);
        }
        else {
            setIsValidClassAmountTotal("form-control");
            data.amount = amount;
            props.load(data);
        }
        setInstallments(false);
    }, [months, amountTotal, props, data, data.installments]);

    //Meses
    useEffect(() => {
        const month = inputMonths.current.value.trim();
        if (month > 0 && month < 19 && amountTotal >= month) {
            setIsValidClassMonths("form-control is-valid");
            data.installments = setInstallmentsMonths(data, (amountTotal % month), month, amountTotal);
            props.load(data);
        }
        else {
            setIsValidClassMonths("form-control");
            data.installments = [{amount: 0, label: ""}];
            props.load(data);
        }
        setInstallments(false);
    }, [months, amountTotal, props, data, data.installments]);

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
                data.installments[value].amount = amount;
            }
            else {
                setIsValidClassAmountInstallments("form-control");
                data.installments[value].amount = amount;
            }
        }
    }, [amountInstallments, data.installments, valid, months, amountTotal, installments]);

    return (
        <>
            <h2>Plan de devolución</h2>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="amountTotal" >Monto total*</label>
                </div>
                <div className="form-control-input">
                    <BeShowed show={props.data.reading}>
                        <input className={isValidClassAmountTotal} id="amountTotal" readOnly type="number" ref={inputAmountTotal} onChange={handleAmountTotal} defaultValue={props.data.mount} />
                    </BeShowed>
                    <BeShowed show={!props.data.reading}>
                        <input className={isValidClassAmountTotal} id="amountTotal" type="number" ref={inputAmountTotal} onChange={handleAmountTotal} min={months} placeholder="Ingrese monto..." onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)} defaultValue={props.data.mount} />
                    </BeShowed>
                </div>
            </div>
            <label>Monto a pagar: {amountTotal - data.pay > 0 ? amountTotal - data.pay : 0}</label>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="months" >Cantidad de cutas* 
                        <small className="text-muted">(en meses)</small>
                        </label>
                </div>
                <div className="form-control-input">
                    <BeShowed show={props.data.reading}>
                        <input className={isValidClassMonths} id="months" readOnly type="number" ref={inputMonths} onChange={handleMonths} defaultValue={props.data.installments} />
                    </BeShowed>
                    <BeShowed show={!props.data.reading}>
                        <input className={isValidClassMonths} id="months" type="number" ref={inputMonths} onChange={handleMonths} min="1" max={18 > amountTotal ? amountTotal : 18} placeholder="Ingrese cantidad de cuotas..." onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validateMonts(e)} defaultValue={props.data.installments} />
                    </BeShowed>
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="amountTotal" >Cuota</label>
                </div>
                <div className="form-control-input" style={{marginLeft: '2.2%', maxWidth: '90%'}} >
                    <select className="form-select" id="InstallmentMonth" defaultValue="-1" ref={inputMonth} onChange={handlerTabSelection} style={{fontFamily: 'Abel, sans-serif'}}>
                        <option disabled value="-1">Seleccione cuota a consultar...</option>
                        {
                            data.installments?.map((month, i) => (
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
                        <small className="text-muted"> {data.installments[value].label}</small>
                    </h2>
                </div>
                <BeShowed show={props.data.reading}>
                    <div className="formRow">
                        <div className="form-control-label">
                            <label htmlFor="amountInstallments">Monto a pagar*</label>
                        </div>
                        <div className="form-control-input">
                            <input className={isValidClassAmountInstallments} id="amountInstallments" readOnly type="number" ref={inputAmountInstallments} onChange={handleAmountInstallments} min="1" placeholder="Ingrese monto..." onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)} defaultValue={data.installments[value].amount} />
                        </div>
                    </div>
                </BeShowed>
                <BeShowed show={!props.data.reading}>
                    <div className="formRow">
                        <div className="form-control-label">
                            <label htmlFor="amountInstallments">Monto a pagar*</label>
                        </div>
                        <div className="form-control-input">
                            <input className={isValidClassAmountInstallments} id="amountInstallments" readOnly type="number" ref={inputAmountInstallments} onChange={handleAmountInstallments} min="1" placeholder="Ingrese monto..." onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)} defaultValue={data.installments[value].amount} />
                        </div>
                    </div>
                </BeShowed>
            </BeShowed>
        </>
    );
}