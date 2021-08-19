import React, { useEffect, useRef, useState } from 'react';
import DateFormat from '../../../utils/DateFormat/DateFormat';
import ListProducts from './ListProducts';
import BeShowed from '../../../common/BeShowed';
import axios from 'axios';

const PORT = require('../../../config');

const DeliverySales = (props) => {
    const [step,setStep] = useState(1);
    const [products,setProducts] = useState([]);
    const [productsDetail, setProductsDetail] = useState([])

    const inputDate = useRef(null);
    const inputCellphone = useRef(null);
    const inputNames = useRef(null);
    const inputStreet = useRef(null);
    const inputStreetNumber = useRef(null);
    const inputPaymentType = useRef(null);
    const inputMount = useRef(null);


    useEffect(() => {
        let date = DateFormat(new Date());
        inputDate.current.value = date;
        axios.get( PORT() + `/api/products`)
        .then((response) => {
            setProducts(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    const upload = (id) => {
        let productToAdd = products.find(product => product.id_product === id)
        let newProducts = products.filter(product => product.id_product !== id)
        let newProductsDetail = productsDetail
        newProductsDetail.push(productToAdd)
        setProducts(newProducts)
        setProductsDetail(newProductsDetail)
    }

    const download = (id) => {
        let productToQuit = productsDetail.find(product => product.id_product === id)
        let newProductsDetail = productsDetail.filter(product => product.id_product !== id)
        let newProducts = products
        newProducts.push(productToQuit)
        setProducts(newProducts)
        setProductsDetail(newProductsDetail)
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
                    <ListProducts products={productsDetail} onClick={download} icon={'-'}/>
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
                            <input type="number" className="form-control" ref={inputCellphone} placeholder="Ingrese el celular del cliente..."></input>
                        </div>
                    </div>
                    <div className="formRow">
                        <div className="form-control-label">
                            <label>Nombre y Apellido*</label>
                        </div>
                        <div className="form-control-input">
                            <input type="text" className="form-control" ref={inputNames} placeholder="Ingrese el nombre completo del cliente..."></input>
                        </div>
                    </div>
                    <div className="formRow">
                        <div className="form-control-label col-sm-2">
                            <label>Calle*</label>
                        </div>
                        <div className="form-control-input col-sm-5">
                            <input type="text" className="form-control" ref={inputStreet} placeholder="Ingrese el la calle..."></input>
                        </div>
                        <div className="form-control-label offset-sm-1 col-sm-1">
                            <label>Numero*</label>
                        </div>
                        <div className="form-control-input col-sm-3">
                            <input type="number" className="form-control" ref={inputStreetNumber} placeholder="Ingrese el nro..."></input>
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
                            <select className="form-control" ref={inputPaymentType} readOnly>
                                <option selected>Efectivo</option>
                            </select>
                        </div>
                    </div>
                    <div className="formRow">
                        <div className="form-control-label">
                            <label>Monto*</label>
                        </div>
                        <div className="form-control-input">
                            <input type="number" className="form-control" ref={inputMount} placeholder="Ingrese el monto con el que abona el cliente..."></input>
                        </div>
                    </div>
                    <div className="formRow">
                        <div className="form-control-label">
                            <label><b>Total a pagar: $48522</b></label>
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
                            <button className="btn btn-success" onClick={() => {alert('success')}}>Confirmar</button>
                        </div>
                    </BeShowed>
                    <BeShowed show={step!==3}>
                        <div className="form-control-label col-sm-1">
                            <button className="btn btn-success" onClick={() => {setStep(step+1)}}>Siguiente</button>
                        </div>
                    </BeShowed>
                </div>
            </div>
        </>
    )
}

export default DeliverySales