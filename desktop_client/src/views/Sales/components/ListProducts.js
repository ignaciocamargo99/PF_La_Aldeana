import React, { useEffect } from "react";
import Axios from "axios";
import { connect } from 'react-redux';
import { updateProducts } from '../../../actions/SalesActions';

const PORT = require('../../../config');

const ListProducts = (props) => {
    

    useEffect(() => {
        Axios.get(`${PORT()}/api/products`)
            .then(response => {
                props.updateProducts(response.data);
                console.log(props.products.length);
                console.log(response.data);
            })
            .catch(error => console.error(error))
    },[])

    return(
        <> 
            <h1>Productos</h1>
            <div>
                <label>{props.products.length}</label>
            </div>
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