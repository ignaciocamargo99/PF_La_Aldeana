import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { connect } from 'react-redux';
import { updateProducts, updateProductsFiltered, updateDetailProducts, updatePayType, updateTotalAmount } from '../../../actions/SalesActions';
import DivGeneric from "../../../common/DivGeneric";
import BeShowed from "../../../common/BeShowed";

const PORT = require('../../../config');

const DetailSale = (props) => {

    const [payTypes, setPayTypes] = useState([]);
    const [boolPayCash, setBoolPayCash] = useState(false);
    const [turned, setTurned] = useState(null);
    const inputPay = useRef(null);
    const [classNamePay, setclassNamePay] = useState("form-control");

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
            
            // HARCODEADO !!!!
            props.updateTotalAmount(150);
        }
        else if (props.payType == 2)
        {
            setBoolPayCash(false);
        }
    },[props.payType])

    const onChangePay = () => {
        if (inputPay.current.value >= props.totalAmount) {
            setTurned(inputPay.current.value - props.totalAmount);
            setclassNamePay("form-control is-valid");
        }
        else {
            setclassNamePay("form-control is-invalid");
            setTurned(null);
        }
        
    }

    return(
        <>
            <h1>Detalle de la venta</h1>

            <div>
                <h4>Tipo de Pago</h4>
                <select className="form-combo-btn" id="id_selectPayTypes" defaultValue='-1' onChange={e => onChangePayType(e)}>
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
                        <label>Abona con:  $  </label>
                        <input className={classNamePay} type="number" id="id_pay" min="1" placeholder="Ingrese con cuanto abona" onChange={onChangePay} ref={inputPay}></input>
                    </div>
                    <div className='formRow'>
                        <label>Vuelto:  $  </label>
                        <label id="id_turned">{turned}</label>
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
        totalAmount: state.totalAmount
    }
}

const mapDispatchToProps = {
    updateProducts,
    updateProductsFiltered,
    updateDetailProducts,
    updatePayType,
    updateTotalAmount
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailSale);