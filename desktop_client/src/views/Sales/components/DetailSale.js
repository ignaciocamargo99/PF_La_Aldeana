import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import { connect } from 'react-redux';
import { updateProducts, updateProductsFiltered, updateDetailProducts, updatePayType, updateTotalAmount, updateDetailsProductsModify } from '../../../actions/SalesActions';
import DivGeneric from "../../../common/DivGeneric";
import BeShowed from "../../../common/BeShowed";
import HeaderTable from "../../../common/Table/HeaderTable";
import BodyTable from "../../../common/Table/BodyTable";
import Table from "../../../common/Table/Table";

const DetailSale = (props) => {

    const [ready, setReady] = useState(false);
    //const [refresh, setRefresh] = useState(false);
    let aux = 0;

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
                                    </tr>
                                </tbody> 
                            )})}/>
                </BeShowed>
            </Table>
            <div className='formRow'>
                <label>TOTAL:  $  </label>
                <label>{props.totalAmount}</label>
            </div>
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
    updateDetailsProductsModify
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailSale);