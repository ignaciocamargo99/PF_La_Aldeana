import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { connect } from 'react-redux';
import { updateProducts, updateProductsFiltered, updateDetailProducts, updatePayType, updateTotalAmount, updatePaymentAmount } from '../../../actions/SalesActions';
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
        setBoolPayCash(false);
        setBoolPayCard(false);
        setTurned(null);
        setclassNamePay("form-control");
        document.getElementById("id_selectPayTypes").value = "-1";
        props.updatePayType("0");
    }, [props.salesRegister])

    useEffect(() => {
        Axios.get(`${PORT()}/api/payTypes`)
            .then(response => {
                setPayTypes(response.data);
            })
            .catch(error => console.error(error))
    }, [])

    const onChangePayType = (e) => {
        props.updatePayType(e.target.value);
    }

    useEffect(() => {
        if (props.payType == 1) {
            setBoolPayCash(true);
            setBoolPayCard(false);
        }
        else if (props.payType == 2) {
            setBoolPayCash(false);
            setBoolPayCard(true);
            setTurned(null);
            setclassNamePay("form-control");
        }
    }, [props.payType])

    const onChangeAmount = () => {
        props.updatePaymentAmount(inputPay.current.value);
        setAmount(inputPay.current.value);
    }

    useEffect(() => {
        if (boolPayCash) {
            if (amount >= props.totalAmount) {
                setTurned(amount - props.totalAmount);
                setclassNamePay("form-control is-valid");
                divPayValidation.current.innerHTML = "";
            }
            else {
                setclassNamePay("form-control is-invalid");
                setTurned(null);
                divPayValidation.current.innerHTML = "El pago debe ser mayor al monto total";
            }
        }
    }, [amount, props.totalAmount, props.detailProducts])

    return (
        <>
            <div>
                <hr />
                <h4>Tipo de Pago</h4>
                <select className="form-control" id="id_selectPayTypes" defaultValue='-1' onChange={e => onChangePayType(e)}>
                    <option disabled value="-1">Seleccione el Tipo de Pago</option>
                    {
                        payTypes?.map((element, i) => (
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
                            <input className={classNamePay} type="number" id="id_pay" min="1" placeholder="Ingrese con cuanto abona" ref={inputPay} onChange={onChangeAmount}></input>
                            <div style={{ color: 'red', fontWeight: 'bold' }} ref={divPayValidation} />
                        </div>

                    </div>
                    <div className='formRow'>
                        <label>Vuelto:  $  </label>
                        <label id="id_turned">{turned ? parseFloat(turned, 2) : "0"}</label>
                    </div>
                </BeShowed>

                <BeShowed show={boolPayCard}>
                    <div className='formRow'>
                        <label>Monto Total:  $  </label>
                        <label id="id_total" style={{ textAlign: 'center', verticalAlign: 'middle' }}>{props.totalAmount}</label>
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
        refresh: state.refresh,
        paymentAmount: state.paymentAmount,
        salesRegister: state.salesRegister
    }
}

const mapDispatchToProps = {
    updateProducts,
    updateProductsFiltered,
    updateDetailProducts,
    updatePayType,
    updateTotalAmount,
    updatePaymentAmount
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSale);