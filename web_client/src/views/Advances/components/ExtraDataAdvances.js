import React, { useRef, useEffect, useState } from "react";
import BeShowed from "../../../common/BeShowed";
import validateFloatNumbers from "../../../utils/validateFloatNumbers";
import setInstallmentsMonths from "./setInstallmentsMonths";
import InstallmentTable from "./InstallmentsTable";

export default function ExtraDataAdvances(props) {
    let data = props.data;
    const inputMonths = useRef(null);
    const inputAmountTotal = useRef(null);
    const [months, setMonths] = useState("null");
    const [amountTotal, setAmountTotal] = useState("null");
    const [isValidClassMonths, setIsValidClassMonths] = useState("form-control");
    const [isValidClassAmountTotal, setIsValidClassAmountTotal] = useState("form-control");

    const [option, setOption] = useState(data.installments);

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

        //console.log(props.data.firstMonth, data.firstMonth, firstMonth)
        if (amount >= month && month > 0 && month < 19) {
            setIsValidClassAmountTotal("form-control is-valid");
            data.amount = amount;
            let aux = setInstallmentsMonths(data.firstMonth, month, amount - data.pay, data.installments);
            setOption(aux);
            data.installments = aux;
            props.load(data);
        }
        else {
            setIsValidClassAmountTotal("form-control");
            if (!data.nroDNI && amount && (props.data.editing || props.data.reading)) {
                data.amount = null;
                data.installments = [{month: data.firstMonth, amount: 0, label: "", pay: 0}];
                //setOption([{month: data.firstMonth, amount: 0, label: "", pay: 0}]);
            } else {
                data.amount = amount;
                data.installments = [{month: data.firstMonth, amount: 0, label: "", pay: 0}];
                //setOption([{month: data.firstMonth, amount: 0, label: "", pay: 0}]);
            }
            props.load(data);
        }
    }, [months, amountTotal, props, data]);

    //Meses
    useEffect(() => {
        const month = parseInt(inputMonths.current.value.trim());
        const amount = parseInt(inputAmountTotal.current.value.trim());

        if (month > 0 && month < 19 && amount >= month) {
            setIsValidClassMonths("form-control is-valid");
            let aux = setInstallmentsMonths(data.firstMonth, month, amount - data.pay, data.installments);
            //setOption(aux);
            data.installments = aux;
            data.months = month;
            props.load(data);
        }
        else {
            setIsValidClassMonths("form-control");
            if (!data.nroDNI && month > 0 && (props.data.editing || props.data.reading)) {
                data.installments = [{month: data.firstMonth, amount: 0, label: "", pay: 0}];
                //setOption([{month: data.firstMonth, amount: 0, label: "", pay: 0}]);
                data.months = null;
            } else {
                data.installments = [{month: data.firstMonth, amount: 0, label: "", pay: 0}];
                //setOption([{month: data.firstMonth, amount: 0, label: "", pay: 0}]);
                data.months = month;
            }
            props.load(data);
        }
    }, [months, amountTotal, props, data]);

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
            <label>Monto restante a pagar: {amountTotal - data.pay > 0 ? amountTotal - data.pay : 0}</label>
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