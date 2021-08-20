import React, { useEffect, useState} from "react";
import Axios from "axios";
import { connect } from 'react-redux';
import { updateProducts } from '../../../actions/SalesActions';
import Table from "../../../common/Table/Table";
import HeaderTable from "../../../common/Table/HeaderTable";
import BodyTable from "../../../common/Table/BodyTable";
import "./listProduct.css";

const PORT = require('../../../config');

const ListProducts = (props) => {
    

    const DivGenerico = (props) => {

        return (
            <div className='flex-container'>
                {props.children}
            </div>
        )
    }

    return(
        <> 
            <h1>Productos</h1>
            <div>
                <label>{props.products.length}</label>
                <button type='button'>Hola</button>
            </div>

            <DivGenerico children={props.products?.map((product, i) => {
                return (
                <div key={i}>
                    <button style={{width: 150, height: 150}} type='button'>{product.name}</button>
                </div>
            )})}></DivGenerico>
            
        </>
    )
}

const mapStateToProps = state => {
    return {
        products: state.products
    }
}

const mapDispatchToProps = {
    updateProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(ListProducts);