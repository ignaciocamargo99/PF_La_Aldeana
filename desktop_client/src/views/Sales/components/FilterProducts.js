import React, { useEffect, useState} from "react";
import Axios from "axios";
import { connect } from 'react-redux';
import { updateProducts, updateProductsFiltered, updateDetailProducts } from '../../../actions/SalesActions';
import BeShowed from '../../../common/BeShowed';

const PORT = require('../../../config');

const FilterProducts = (props) => {

    const [boolTypeProduct, setBoolTypeProduct] = useState(false);
    const [typesProduct, setTypesProduct] = useState([]);
    const [typesProductSelected, setTypesProductSelected] = useState([]);
    
    useEffect(() => {
        Axios.get(`${PORT()}/api/typeProducts`) 
            .then(response => {
                setTypesProduct(response.data);
            })
            .catch(error => console.error(error))
    },[])

    const onClickHeladeria = () => {
        setBoolTypeProduct(true);
        setTypesProductSelected(typesProduct.filter(n => n.id_sector == 1));
    }

    const onClickCafeteria = () => {
        setBoolTypeProduct(true);
        setTypesProductSelected(typesProduct.filter(n => n.id_sector == 2));
    }

    const onClickCancel = () => {
        setBoolTypeProduct(false);
        props.updateProductsFiltered(props.products);
    }

    const onChangeTypeProduct = (e) => {
        const id_type_product_selected = e.target.value;
        props.updateProductsFiltered(props.products.filter(n => n.id_product_type == id_type_product_selected))
    }

    useEffect(() => {
        //AL TOCAR HELADERIA O CAFETERIA, reiniciar el select
    })
 
    return(
        <>
            <h4>Filtrar por:</h4>
            <div className="formRow">
                <button id="btn_heladeria" onClick={onClickHeladeria}>Heladería</button>
                <button id="btn_cafeteria" onClick={onClickCafeteria}>Cafetería</button>
                <button id="btn_cafeteria" onClick={onClickCancel}>Cancelar</button>
            </div>
            <BeShowed show={boolTypeProduct}>
                <select className="form-combo-btn" id="id_selectTypeProduct" defaultValue='-1' onChange={e => onChangeTypeProduct(e)}>
                    <option disabled value="-1">Seleccione el Tipo de Producto</option>
                    {
                        typesProductSelected?.map((element,i) => (
                            <option key={i} value={element.id_product_type}>{element.name}</option>
                        ))
                    }
                </select>
            </BeShowed>
        </>
    ); 
}

const mapStateToProps = state => {
    return {
        products: state.products,
        productsFiltered: state.productsFiltered,
        detailProducts: state.detailProducts
    }
}

const mapDispatchToProps = {
    updateProducts,
    updateProductsFiltered, 
    updateDetailProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterProducts);
