import React, { useEffect, useRef, useState } from 'react';
import DateFormat from '../../../utils/DateFormat/DateFormat';
import ListProducts from './ListProducts';
import BeShowed from '../../../common/BeShowed';
import axios from 'axios';
import errorInputQuantities from '../../../utils/ErrorMessages/errorInputQuantities';
import errorNextStepOne from '../../../utils/ErrorMessages/errorNextStepOne';
import errorNextStepTwo from '../../../utils/ErrorMessages/errorNextStepTwo';
import errorNextStepThree from '../../../utils/ErrorMessages/errorNextStepThree';
import succesMessageDeliverySale from '../../../utils/SuccessMessages/successMessageDeliverySale';
import { validateInput } from '../../../utils/ValidationsInputs/ValidateInputs';

const PORT = require('../../../config');

const DeliverySales = (props) => {
    const [step,setStep] = useState(1);
    const [products,setProducts] = useState([]);
    const [productsDetail, setProductsDetail] = useState([]);
    const [quantities,setQuantities] = useState([]);
    const [subtotals,setSubtotals] = useState([]);
    const [total,setTotal] = useState(0);
    const [cellphone,setCellphone] = useState('');
    const [names,setNames] = useState('');
    const [street,setStreet] = useState('');
    const [streetNumber,setStreetNumber] = useState('');
    const [amount,setAmount] = useState('');
    const [typePay,setTypePay] = useState('Efectivo');
    const [errorAmount,setErrorAmount] = useState(true);
    const [errorCellphone,setErrorCellphone] = useState(true);
    const [errorNames,setErrorNames] = useState(true);
    const [errorStreet,setErrorStreet] = useState(true);
    const [errorStreetNumber,setErrorStreetNumber] = useState(true);

    const inputDate = useRef(null);


    useEffect(() => {
        let date = DateFormat(new Date());
        inputDate.current.value = date;
        axios.get( PORT() + `/api/products/all`)
        .then((response) => {
            setProducts(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    const upload = (id,i) => {
        let inputQuantity = document.getElementById(`quantityInput${i}`)
        if(inputQuantity.value > 0){
            let productToAdd = products.find(product => product.id_product === id)
            let newProducts = products.filter(product => product.id_product !== id)
            let newProductsDetail = productsDetail
            newProductsDetail.push(productToAdd)
            setProducts(newProducts)
            setProductsDetail(newProductsDetail)
            let newQuantities = quantities
            let newSubtotals = subtotals
            newQuantities.push(inputQuantity.value)
            let subtotal = inputQuantity.value * productToAdd.price
            newSubtotals.push(subtotal)
            setQuantities(newQuantities)
            setSubtotals(newSubtotals)
            let newTotal = subtotal + total
            setTotal(newTotal)
            inputQuantity.value = null
        }else{
            errorInputQuantities()
        }
    }

    const download = (id,i) => {
        let productToQuit = productsDetail.find(product => product.id_product === id)
        let newProductsDetail = productsDetail.filter(product => product.id_product !== id)
        let newProducts = products
        newProducts.push(productToQuit)
        setProducts(newProducts)
        setProductsDetail(newProductsDetail)
        let newQuantities = quantities
        let newSubtotals = subtotals
        newQuantities = newQuantities.slice(0,i).concat(newQuantities.slice(i+1,newQuantities.length))
        newSubtotals = newSubtotals.slice(0,i).concat(newSubtotals.slice(i+1,newSubtotals.length))
        setQuantities(newQuantities)
        setSubtotals(newSubtotals)
        let newTotal = total - subtotals[i]
        setTotal(newTotal)
    }

    const nextStep = () => {
        switch(step){
            case 1:
                if(productsDetail.length > 0){
                    setStep(step+1)
                }
                else{
                    errorNextStepOne()
                }
                break;
            case 2:
                if(!errorCellphone && !errorNames && !errorStreet && !errorStreetNumber){
                    setStep(step+1)
                }
                else{
                    errorNextStepTwo()
                }
                break;
            case 3:
                if(!errorAmount){
                    succesMessageDeliverySale()
                }
                else{
                    errorNextStepThree()
                }
                break;
            default:
                break;
        }
    }

    const onChangeCellphone = (e) => {
        setErrorCellphone(false)
        if(e.target.value.length > e.target.maxLength){
            e.target.value = e.target.value.slice(0,e.target.maxLength)
        }
        setCellphone(e.target.value)
        if(!validateInput(e.target.value,10,10)){
            setErrorCellphone(true)
        } 
    }

    const onChangeNames = (e) => {
        setErrorNames(false)
        setNames(e.target.value)
        if(!validateInput(e.target.value,1,50)){
            setErrorNames(true)
        }
    }

    const onChangeStreet = (e) => {
        setErrorStreet(false)
        setStreet(e.target.value)
        if(!validateInput(e.target.value,1,25)){
            setErrorStreet(true)
        }
    }

    const onChangeStreetNumber = (e) => {
        setErrorStreetNumber(false)
        if(e.target.value.length > e.target.maxLength){
            e.target.value = e.target.value.slice(0,e.target.maxLength)
        }
        setStreetNumber(e.target.value)
        if(!validateInput(e.target.value,1,4)){
            setErrorStreetNumber(true)
        }
    }

    const onChangeAmount = (e) => {
        setErrorAmount(false)
        setAmount(e.target.value)
        if(e.target.value < total){
            setErrorAmount(true)
        }
    }

    return(
        <>
            <div className="viewContent">
                <h1 className="display-5">Registrar venta por delivery</h1>
                <hr />
                <div className="formRow">
                    <div className="form-control-label offset-sm-8 col-sm-2">
                        <label>Venta n°XXXXXXX</label>
                    </div>
                    <div className="form-control-input col-sm-2">
                        <input type="date" className="form-control" ref={inputDate} readOnly></input>
                    </div>
                </div>
                <BeShowed show={step===1}>
                    <div className="formRow">
                        <h3><b>Productos</b></h3>
                    </div>
                    <ListProducts products={products} onClick={upload} icon={'+'}/>
                    <div className="formRow">
                        <h3><b>Detalle de venta</b></h3>
                    </div>
                    <ListProducts products={productsDetail} onClick={download} icon={'-'} quantities={quantities} subtotals={subtotals}/>
                    <div className="formRow">
                        <div className="col-sm-3 offset-sm-9">
                            <label>Total: ${total}</label>
                        </div>
                    </div>
                </BeShowed>
                <BeShowed show={step===2}>
                    <div className="formRow">
                        <h3><b>Cliente</b></h3>
                    </div>
                    <div className="formRow">
                        <div className="form-control-label">
                            <label>Numero de celular*</label>
                        </div>
                        <div className="form-control-input">
                            <input type="number" className="form-control" maxLength="10" onChange={(e) => {onChangeCellphone(e)}} placeholder="Ingrese el celular del cliente..." value={cellphone}></input>
                            <BeShowed show={errorCellphone}>
                                <b style={{color:'gray'}}>*Número de 10 digitos</b>
                            </BeShowed>
                        </div>
                    </div>
                    <div className="formRow">
                        <div className="form-control-label">
                            <label>Nombre y Apellido*</label>
                        </div>
                        <div className="form-control-input">
                            <input  type="text" className="form-control" maxLength="50" onChange={(e) => onChangeNames(e)} placeholder="Ingrese el nombre completo del cliente..." value={names}></input>
                            <BeShowed show={errorNames}>
                                <b style={{color:'gray'}}>*Texto de 1 a 50 caractéres</b>
                            </BeShowed>
                        </div>
                    </div>
                    <div className="formRow">
                        <div className="form-control-label col-sm-2">
                            <label>Calle*</label>
                        </div>
                        <div className="form-control-input col-sm-5">
                            <input type="text" className="form-control" maxLength="25" onChange={(e) => {onChangeStreet(e)}} placeholder="Ingrese el la calle..." value={street}></input>
                            <BeShowed show={errorStreet}>
                                <b style={{color:'gray'}}>*Texto de 1 a 25 caractéres</b>
                            </BeShowed>
                        </div>
                        <div className="form-control-label offset-sm-1 col-sm-1">
                            <label>Numero*</label>
                        </div>
                        <div className="form-control-input col-sm-3">
                            <input type="number" className="form-control" maxLength="4" onChange={(e) => {onChangeStreetNumber(e)}} placeholder="Ingrese el nro..." value={streetNumber}></input>
                            <BeShowed show={errorStreetNumber}>
                                <b style={{color:'gray'}}>*Número de 1 a 4 digitos</b>
                            </BeShowed>
                        </div>
                    </div>
                </BeShowed>
                <BeShowed show={step===3}>
                    <div className="formRow">
                        <h3><b>Pago</b></h3>
                    </div>
                    <div className="formRow">
                        <div className="form-control-label">
                            <label>Tipo de pago* </label>
                        </div>
                        <div className="form-control-input">
                            <select className="form-control" readOnly>
                                <option selected>{typePay}</option>
                            </select>
                        </div>
                    </div>
                    <div className="formRow">
                        <div className="form-control-label">
                            <label>Monto*</label>
                        </div>
                        <div className="form-control-input">
                            <input type="number" className="form-control" placeholder="Ingrese el monto con el que abona el cliente..." onChange={(e) => {onChangeAmount(e)}} value={amount}></input>
                            <BeShowed show={errorAmount}>
                                <b style={{color:'gray'}}>*Cantidad entera mayor al total</b>
                            </BeShowed>
                        </div>
                    </div>
                    <div className="formRow">
                        <div className="form-control-label">
                            <label><b>Total a pagar: ${total}</b></label>
                        </div>
                    </div>
                </BeShowed>
                <div className="formRow">
                    <BeShowed show={step!==1}>
                        <div className="form-control-label offset-sm-10 col-sm-1">
                            <button className="btn btn-danger" onClick={() => {setStep(step-1)}}>Atras</button>
                        </div>
                    </BeShowed>
                    <BeShowed show={step===1}>
                        <div className="form-control-label offset-sm-10 col-sm-1">
                            <button className="btn btn-danger" onClick={() => {alert('redirigir')}}>Cancelar</button>
                        </div>
                    </BeShowed>
                    <BeShowed show={step===3}>
                        <div className="form-control-label col-sm-1">
                            <button className="btn btn-success" onClick={() => {nextStep()}}>Confirmar</button>
                        </div>
                    </BeShowed>
                    <BeShowed show={step!==3}>
                        <div className="form-control-label col-sm-1">
                            <button className="btn btn-success" onClick={() => {nextStep()}}>Siguiente</button>
                        </div>
                    </BeShowed>
                </div>
            </div>
        </>
    )
}

export default DeliverySales