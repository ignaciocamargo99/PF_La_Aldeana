import React, { useEffect, useState} from "react";
import Axios from "axios";
import { connect } from 'react-redux';
import { updateProducts, updateProductsFiltered } from '../../../actions/SalesActions';
import "../styles/listProduct.css";

const PORT = require('../../../config');

const ListProducts = (props) => {
    
    const DivGeneric = (props) => {
        return (
            <div className='flex-container'>
                {props.children}
            </div>
        )
    }

    const Pagination = (array, pageSize, currentPage) => {
        
        var totalItems = array.length;
        var totalPages = Math.ceil(totalItems / pageSize);

        
    }

    return(
        <> 
            <h1>Productos</h1>
            <DivGeneric children={props.productsFiltered?.map((product, i) => {
                return (
                <div key={i}>
                    <button style={{width: 150, height: 150}} type='button'>{product.name}</button>
                </div>
            )})}></DivGeneric>
            
        </>
    )
}

const mapStateToProps = state => {
    return {
        products: state.products,
        productsFiltered: state.productsFiltered
    }
}

const mapDispatchToProps = {
    updateProducts,
    updateProductsFiltered
}

export default connect(mapStateToProps, mapDispatchToProps)(ListProducts);