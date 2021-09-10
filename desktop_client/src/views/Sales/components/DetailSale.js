import React, { useState, useEffect, useRef } from "react";
import { connect } from 'react-redux';
import { updateProducts, updateProductsFiltered, updateDetailProducts, updatePayType, updateTotalAmount, updateDetailsProductsModify, updateProductSelected } from '../../../actions/SalesActions';
import BeShowed from "../../../common/BeShowed";
import HeaderTable from "../../../common/Table/HeaderTable";
import BodyTable from "../../../common/Table/BodyTable";
import Table from "../../../common/Table/Table";
import { faMinus, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalProduct from "./ModalProduct";

const DetailSale = (props) => {

    const [ready, setReady] = useState(false);
    const [printModal, setPrintModal] = useState(false);
    
    // "N":new -- "M":modify -- "A":add -- "D":delete
    const [actionModal, setActionModal] = useState();

    let aux = 0;

    const changePrintModalModify = (e) => {
        const id = e.target.value;
        props.updateProductSelected(props.detailProducts.find(n => n.id_product == id));
        setActionModal("M");
        setPrintModal(true);
    }

    const changePrintModalDelete = (e) => {
        const id = e.target.value;
        props.updateProductSelected(props.detailProducts.find(n => n.id_product == id));
        setActionModal("D");
        setPrintModal(true);
    }
    
    useEffect(() => {
        if (props.detailProducts.length > 0) {
            setReady(true);
        }
        else {
            setReady(false);
        }

        for (let i = 0; i < props.detailProducts.length; i++) {
            aux = aux + parseFloat(props.detailProducts[i].subtotal,2);
        }

        props.updateTotalAmount(aux);

    },[props.detailProducts, props.refresh])

    return (
        <>
            <Table>
                <HeaderTable
                    th={
                        <>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '200px', verticalAlign: 'middle' }}>Producto</th>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '130px', verticalAlign: 'middle' }}>Cantidad</th>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '150px', verticalAlign: 'middle' }}>Subtotal</th>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '150px', verticalAlign: 'middle' }}></th>
                        </>}/>
                <BeShowed show={ready}>
                    <BodyTable
                        tbody={props.detailProducts?.map((element, i) => {
                            return (
                                <tbody key={i}>
                                    <tr>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.quantity}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.subtotal}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <button type="button" className="btn btn-primary btn-sm px-3" value={element.id_product} onClick={(e) => changePrintModalModify(e)} style={{ backgroundColor: '#2284B6' }}>
                                                <FontAwesomeIcon icon={faPen} />
                                            </button>
                                            <button type="button" className="btn btn-primary btn-sm px-3" value={element.id_product} onClick={(e) => changePrintModalDelete(e)} style={{ backgroundColor: '#2284B6' }}>
                                                <FontAwesomeIcon icon={faMinus} />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody> 
                            )})}/>
                </BeShowed>
            </Table>
            <div className='formRow'>
                <label>TOTAL:  $  </label>
                <label>{props.totalAmount}</label>
            </div>
            <ModalProduct show={printModal} setShowModal={setPrintModal} actionModal={actionModal}></ModalProduct>
        </>
    )
} 

const mapStateToProps = state => {
    return {
        products: state.products,
        productsFiltered: state.productsFiltered,
        detailProducts: state.detailProducts,
        payType: state.payType,
        totalAmount: state.totalAmount,
        productSelected: state.productSelected,
        refresh: state.refresh
    }
}

const mapDispatchToProps = {
    updateProducts,
    updateProductsFiltered,
    updateDetailProducts,
    updatePayType,
    updateTotalAmount,
    updateDetailsProductsModify,
    updateProductSelected
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailSale);