import React, { useState, useEffect, useRef } from "react";
import BeShowed from "../../../common/BeShowed";
import validateFloatNumbers from "../../../utils/validateFloatNumbers";
  
export default function  ({reading, installments}) {

    const [value, setValue] = useState(0);
    const [valid, setValid] = useState(false);

    const inputMonth = useRef(null);
    const inputAmountInstallments = useRef(null);
    const [amountInstallments, setAmountInstallments] = useState("null");
    const [isValidClassAmountInstallments, setIsValidClassAmountInstallments] = useState("form-control");


    const handleAmountInstallments = () => setAmountInstallments(inputAmountInstallments.current.value);
    const handlerTabSelection = () => {
        let aux = parseInt(inputMonth.current.value);
        if(aux > -1) {
            setValue(aux);
            setValid(true);
        } else setValid(false);
    }
    
    useEffect(() => {
        if (valid){
            const amount = inputAmountInstallments.current.value.trim();
            if (amount > 0) {
                setIsValidClassAmountInstallments("form-control is-valid");
                installments[value].amount = amount;
            }
            else {
                setIsValidClassAmountInstallments("form-control");
                installments[value].amount = amount;
            }
        }
    }, [amountInstallments, installments, valid]);
    
    
    const validate = (e) => {
        if (e.target.value.length > 8) e.target.value = e.target.value.slice(0, 8);
    }
  
    return (
        <>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="amountTotal" >Cuota</label>
                </div>
                <div className="form-control-input">
                    <select className="form-select" id="InstallmentMonth" defaultValue="-1" ref={inputMonth} onChange={handlerTabSelection} style={{fontFamily: 'Abel, sans-serif'}}>
                        <option disabled value="-1">Seleccione cuota a consultar...</option>
                        {
                            installments?.map((month, i) => (
                                <option key={i} value={i}>{month.label}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <hr></hr>
            
            <BeShowed show={valid}>
                <div className="formRow">
                    <h2>Cuota N° {parseInt(value) + 1}: 
                        <small className="text-muted"> {installments[value].label}</small>
                    </h2>
                </div>
                <BeShowed show={reading}>
                    <div className="formRow">
                        <label>Monto a pagar: {installments[value].amount}</label>
                    </div>
                </BeShowed>
                <BeShowed show={!reading}>
                    <div className="formRow">
                        <div className="form-control-label">
                            <label htmlFor="amountInstallments">Monto a pagar*</label>
                        </div>
                        <div className="form-control-input">
                            <input className={isValidClassAmountInstallments} id="amountInstallments" type="number" ref={inputAmountInstallments} onChange={handleAmountInstallments} min="1" placeholder="Ingrese monto..." onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)} defaultValue={installments[value].amount} />
                        </div>
                    </div>
                </BeShowed>
            </BeShowed>
        </>
    );
}