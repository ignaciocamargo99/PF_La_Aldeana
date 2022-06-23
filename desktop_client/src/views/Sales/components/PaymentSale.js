import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { connect } from 'react-redux';
import { updateProducts, updateProductsFiltered, updateDetailProducts, updatePayType, updateTotalAmount, updatePaymentAmount } from '../../../actions/SalesActions';
import BeShowed from "../../../common/BeShowed";
import { NumericKeyboard } from "./NumericKeyboard";

const PORT = require('../../../config');

const styles = {
    labelAmount: {
        color: "#45A33C"
    }
}

const PaymentSale = (props) => {
    const [payTypes, setPayTypes] = useState([]);
    const [boolPayCash, setBoolPayCash] = useState(false);
    const [boolPayCard, setBoolPayCard] = useState(false);
    const [amount, setAmount] = useState(null);
    const [turned, setTurned] = useState(null);
    const inputPay = useRef(0);
    const divPayValidation = useRef(null);
    const [keyboardNumber, setKeyboardNumber] = useState();

    useEffect(() => setKeyboardNumber(0), [])

    useEffect(() => {
        setBoolPayCash(false);
        setBoolPayCard(false);
        setTurned(null);
        // document.getElementById("id_selectPayTypes").value = "-1";
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
        }
    }, [props.payType])

    const onChangeAmount = () => {
        props.updatePaymentAmount(inputPay.current.value);
        setAmount(inputPay.current.value);
    }

    const loadAmount = (e) => {
        let numberKeyboard = parseInt(e)
        setKeyboardNumber(numberKeyboard);
        props.updatePaymentAmount(e);
        setAmount(e);
    }

    useEffect(() => {
        if (boolPayCash) {
            if (amount >= props.totalAmount) {
                setTurned(amount - props.totalAmount);
                divPayValidation.current.innerHTML = "";
            }
            else {
                setTurned(null);
                divPayValidation.current.innerHTML = "El pago debe ser mayor al monto total";
            }
        }
    }, [amount, props.totalAmount, props.detailProducts])

    return (
        <>
            <div>
                <hr />
                <h3><b>Tipo de pago</b></h3>
                {payTypes?.map((payType, i) => {
                    return (
                        <button key={i} id="id_selectPayTypes"
                            type="button"
                            className="btn btn-light filterButton"
                            value={payType.id_pay_type}
                            onClick={e => onChangePayType(e)}
                        >
                            {payType.name}
                        </button>
                    )
                })}
                <BeShowed show={boolPayCash}>
                    <div className="formRow">
                        <div className="col-6">
                            <div className='formRow'>
                                <label>Monto Total:  $  </label>
                                <label id="id_total">{props.totalAmount}</label>
                            </div>
                            <div className='formRow'>
                                <label className='label-modal' style={styles.labelAmount}>Abona con:&nbsp; </label>
                                <label className='label-modal' style={styles.labelAmount} id="id_pay" min="1" ref={inputPay}>${keyboardNumber}</label>
                            </div>
                            <div className='formRow' style={{ color: 'red', fontWeight: 'bold' }} ref={divPayValidation} />
                            <div className='formRow'>
                                <label className='label-modal' style={{color:'#E17A13'}}>Vuelto:  $  </label>
                                <label className='label-modal' style={{color:'#E17A13'}} id="id_turned">{turned ? parseFloat(turned, 2) : "0"}</label>
                            </div>
                        </div>
                        <div className="col-6">

                            <NumericKeyboard load={loadAmount} />

                        </div>

                    </div>









                </BeShowed>
                <BeShowed show={boolPayCard}>
                    <div className='formRow'>
                        <label>Monto Total:  $  </label>
                        <label id="id_total" style={{ textAlign: 'center', verticalAlign: 'middle' }}>{props.totalAmount}</label>
                    </div>
                </BeShowed>
            </div >
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