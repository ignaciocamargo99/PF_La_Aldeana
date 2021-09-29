import React, { useRef, useEffect, useState } from "react";
import BeShowed from "../../../common/BeShowed";
import validateFloatNumbers from "../../../utils/validateFloatNumbers";

export default function ExtraDataAdvances(props) {
    const inputMonth = useRef(null);
    const inputAmount = useRef(null);
    const [month, setMonth] = useState("null");
    const [amount, setAmount] = useState("null");
    const [isValidClassMonth, setIsValidClassMonth] = useState("form-control");
    const [isValidClassAmount, setIsValidClassAmount] = useState("form-control");
    let data = props.data;

    const handleMonth = () => setMonth(inputMonth.current.value);
    const handleAmount = () => setAmount(inputAmount.current.value);

    useEffect(() => {
        const month = inputMonth.current.value.trim();
        if (month) {
            setIsValidClassMonth("form-control is-valid");
            data.installments = month;
            props.load(data);
        }
        else {
            setIsValidClassMonth("form-control");
            data.installments = month;
            props.load(data);
        }
    }, [month, props, data]);

    useEffect(() => {
        const amount = inputAmount.current.value.trim();
        if (amount) {
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

    return (
        <>
            <h2>Plan de devolución</h2>
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
                        <input className={isValidClassMonth} id="month" type="number" ref={inputMonth} onChange={handleMonth} min="1" placeholder="Ingrese cantidad de cuotas..." onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)} defaultValue={props.data.installments} />
                    </BeShowed>
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="mount" >Monto a pagar en cada cuota*</label>
                </div>
                <div className="form-control-input">
                    <BeShowed show={props.data.reading}>
                        <input className={isValidClassAmount} id="amount" readOnly type="number" ref={inputAmount} onChange={handleAmount} defaultValue={props.data.mount} />
                    </BeShowed>
                    <BeShowed show={!props.data.reading}>
                        <input className={isValidClassAmount} id="amount" type="number" ref={inputAmount} onChange={handleAmount} min="1" placeholder="Ingrese monto..." onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)} defaultValue={props.data.mount} />
                    </BeShowed>
                </div>
            </div>
        </>
    );
}