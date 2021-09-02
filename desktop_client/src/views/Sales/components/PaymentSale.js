import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { connect } from 'react-redux';
import { updateProducts, updateProductsFiltered, updateDetailProducts, updatePayType, updateTotalAmount } from '../../../actions/SalesActions';
import DivGeneric from "../../../common/DivGeneric";
import BeShowed from "../../../common/BeShowed";

const PORT = require('../../../config');

const PaymentSale = (props) => {

    const [payTypes, setPayTypes] = useState([]);
    const [boolPayCash, setBoolPayCash] = useState(false);
    const [boolPayCard, setBoolPayCard] = useState(false);
    const [amount, setAmount] = useState(null);
    const [turned, setTurned] = useState(null);
    const inputPay = useRef(0);
    const [classNamePay, setclassNamePay] = useState("form-control");
    const divPayValidation = useRef(null);

    useEffect(() => {
        Axios.get(`${PORT()}/api/payTypes`) 
            .then(response => {
                setPayTypes(response.data);
            })
            .catch(error => console.error(error))
    },[])

    const onChangePayType = (e) => {
        props.updatePayType(e.target.value); 
    }

    useEffect(() => {
        if (props.payType == 1)
        {
            setBoolPayCash(true);
            setBoolPayCard(false);
        }
        else if (props.payType == 2)
        {
            setBoolPayCash(false);
            setBoolPayCard(true);
        }
    },[props.payType])

    useEffect(() => {
        setAmount(inputPay.current.value);
    })

    useEffect(() => {
        if (amount >= props.totalAmount) {
            setTurned(amount - props.totalAmount);
            setclassNamePay("form-control is-valid");
            //divPayValidation.current.innerHTML = "";
        } 
        else {
            setclassNamePay("form-control is-invalid");
            setTurned(null);
            //divPayValidation.current.innerHTML = "El pago debe ser mayor al monto total";
        }
    },[amount, props.refresh])
      
    return(
        <>
            <div>
                <h4>Tipo de Pago</h4>
                <select className="form-combo" id="id_selectPayTypes" defaultValue='-1' onChange={e => onChangePayType(e)}>
                    <option disabled value="-1">Seleccione el Tipo de Pago</option>
                    {
                        payTypes?.map((element,i) => (
                            <option key={i} value={element.id_pay_type}>{element.name}</option>
                        ))
                    }
                </select>
                <BeShowed show={boolPayCash}>
                    <div className='formRow'>
                        <label>Monto Total:  $  </label>
                        <label id="id_total">{props.totalAmount}</label>
                    </div>
                    <div className='formRow'>
                        <label>Abona con: $</label>
                        <div>
                            <input className={classNamePay} type="number" id="id_pay" min="1" placeholder="Ingrese con cuanto abona" ref={inputPay}></input>
                            <div style={{ color: 'red', fontWeight: 'bold' }} ref={divPayValidation} />
                        </div>
                        
                    </div>
                    <div className='formRow'>
                        <label>Vuelto:  $  </label>
                        <label id="id_turned">{parseFloat(turned,2)}</label>
                    </div>
                </BeShowed>
                <BeShowed show={boolPayCard}>
                    <div className='formRow'>
                        <label>Monto Total:  $  </label>
                        <label id="id_total">{props.totalAmount}</label>
                    </div>
                </BeShowed>
            </div>
        </>
    ); 
}

const mapStateToProps = state => {
    return {
        products: state.products,
        productsFiltered: state.productsFiltered,
        detailProducts: state.detailProducts,
        payType: state.payType,
        totalAmount: state.totalAmount,
        refresh: state.refresh
    }
}

const mapDispatchToProps = {
    updateProducts,
    updateProductsFiltered,
    updateDetailProducts,
    updatePayType,
    updateTotalAmount
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSale);