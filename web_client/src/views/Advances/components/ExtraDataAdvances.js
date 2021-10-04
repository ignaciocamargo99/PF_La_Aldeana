import React, { useRef, useEffect, useState } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import BeShowed from "../../../common/BeShowed";
import validateFloatNumbers from "../../../utils/validateFloatNumbers";
import setInstallmentsMonths from "./setInstallmentsMonths";
import Installments from "./Installments";

export default function ExtraDataAdvances(props) {
    let data = props.data;
    const inputMonth = useRef(null);
    const inputAmount = useRef(null);
    const inputAmountTotal = useRef(null);
    const [month, setMonth] = useState("null");
    const [amount, setAmount] = useState("null");
    const [amountTotal, setAmountTotal] = useState("null");
    const [isValidClassMonth, setIsValidClassMonth] = useState("form-control");
    const [isValidClassAmountTotal, setIsValidClassAmountTotal] = useState("form-control");
    const [isValidClassAmount, setIsValidClassAmount] = useState("form-control");
    const [installments, setInstallments] = useState(false);

    const handleMonth = () => {
        setMonth(inputMonth.current.value);
        setInstallments(false);
    }
    const handleAmount = () => setAmount(inputAmount.current.value);
    const handleAmountTotal = () => setAmountTotal(inputAmountTotal.current.value);
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
        if (amount) {
            setIsValidClassAmountTotal("form-control is-valid");
            data.amount = amount;
            props.load(data);
        }
        else {
            setIsValidClassAmountTotal("form-control");
            data.amount = amount;
            props.load(data);
        }
    }, [amountTotal, props, data]);

    //Meses
    useEffect(() => {
        const month = inputMonth.current.value.trim();
        if (month > 0 && month < 19) {
            setIsValidClassMonth("form-control is-valid");
            inputAmount.current.value = ~~((amountTotal - data.pay)/month);
            data.installments_amount = inputAmount.current.value;
            data.installments = setInstallmentsMonths(data, (amountTotal % month), month);
            props.load(data);
        }
        else {
            setIsValidClassMonth("form-control");
            data.installments = month;
            props.load(data);
        }
    }, [month, amountTotal, props, data]);

    //Monto
    useEffect(() => {
        const amount = inputAmount.current.value.trim();
        if (amount > 0) {
            setIsValidClassAmount("form-control is-valid");
            data.installments_amount = amount;
            props.load(data);
        }
        else {
            setIsValidClassAmount("form-control");
            data.amount = amount;
            props.load(data);
        }
    }, [amount, props, data]);

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
                        <input className={isValidClassAmountTotal} id="amountTotal" readOnly type="number" ref={inputAmountTotal} onChange={handleAmountTotal} defaultValue={props.data.mount} />
                    </BeShowed>
                    <BeShowed show={!props.data.reading}>
                        <input className={isValidClassAmountTotal} id="amountTotal" type="number" ref={inputAmountTotal} onChange={handleAmountTotal} min="1" placeholder="Ingrese monto..." onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)} defaultValue={props.data.mount} />
                    </BeShowed>
                </div>
            </div>
            <label>Monto a pagar: {amountTotal - data.pay > 0 ? amountTotal - data.pay : 0}</label>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="month" >Cantidad de cutas* 
                        <small className="text-muted">(en meses)</small>
                        </label>
                </div>
                <div className="form-control-input">
                    <BeShowed show={props.data.reading}>
                        <input className={isValidClassMonth} id="month" readOnly type="number" ref={inputMonth} onChange={handleMonth} defaultValue={props.data.installments} />
                    </BeShowed>
                    <BeShowed show={!props.data.reading}>
                        <input className={isValidClassMonth} id="month" type="number" ref={inputMonth} onChange={handleMonth} min="1" max="18" placeholder="Ingrese cantidad de cuotas..." onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validateMonts(e)} defaultValue={props.data.installments} />
                    </BeShowed>
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="mount" >Monto a pagar en cada cuota*</label>
                </div>
                <BeShowed show={props.data.reading}>
                    <div className="form-control-input">
                            <input className={isValidClassAmount} id="amount" readOnly type="number" ref={inputAmount} onChange={handleAmount} defaultValue={props.data.amount} />
                    </div>
                            
                    <div className="form-control-button">
                        <button className="btn" style={{backgroundColor: '#A5DEF9'}} onClick={handleInstallments}><FontAwesomeIcon style={{color: '#383C77'}} icon={faBars} /></button>
                    </div>
                </BeShowed>
                <BeShowed show={!props.data.reading}>
                    <div className="form-control-input">
                            <input className={isValidClassAmount} id="amount" type="number" style={{marginLeft: '0.6em', maxWidth: '95%'}} ref={inputAmount} onChange={handleAmount} min="1" placeholder="Ingrese monto..." onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)} defaultValue={props.data.amount} />
                    </div>
                            
                    <div className="form-control-button">
                        <button className="btn" style={{backgroundColor: '#A5DEF9'}} onClick={handleInstallments}><FontAwesomeIcon style={{color: '#383C77'}} icon={faBars} /></button>
                    </div>
                </BeShowed>
            </div>
            <BeShowed show={installments}>
                <Installments reading={props.data.reading} installments={props.data.installments}></Installments>
            </BeShowed>
        </>
    );
}