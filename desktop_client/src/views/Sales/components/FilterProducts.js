import React, { useEffect, useState } from "react";
import Axios from "axios";
import { connect } from 'react-redux';
import { updateProducts, updateProductsFiltered, updateDetailProducts } from '../../../actions/SalesActions';
import BeShowed from '../../../common/BeShowed';
import '../styles/filterProducts.css';

const PORT = require('../../../config');

const FilterProducts = (props) => {

    const [boolTypeProduct, setBoolTypeProduct] = useState(false);
    const [typesProduct, setTypesProduct] = useState([]);
    const [typesProductSelected, setTypesProductSelected] = useState([]);
    const [valueSelect, setValueSelect] = useState("-1");

    useEffect(() => {
        Axios.get(`${PORT()}/api/typeProducts`)
            .then(response => {
                setTypesProduct(response.data);
            })
            .catch(error => console.error(error))
    }, [])

    const onClickHeladeria = () => {
        actionsDefaultButtons();
        setTypesProductSelected(typesProduct.filter(n => n.id_sector == 1));
    }

    const onClickCafeteria = () => {
        actionsDefaultButtons();
        setTypesProductSelected(typesProduct.filter(n => n.id_sector == 2));
    }

    const actionsDefaultButtons = () => {
        setBoolTypeProduct(true);
        props.updateProductsFiltered(props.products);
        setValueSelect("-1");
    }

    const onClickCancel = () => {
        setBoolTypeProduct(false);
        props.updateProductsFiltered(props.products);
    }

    const onChangeTypeProduct = (e) => {
        const id_type_product_selected = e.target.value;
        setValueSelect(id_type_product_selected);
        props.updateProductsFiltered(props.products.filter(n => n.id_product_type == id_type_product_selected))
    }

    useEffect(() => {
        //AL TOCAR HELADERIA O CAFETERIA, reiniciar el select
    })

    return (
        <>
            <div className="formRow">
                <h4>Filtrar por:</h4>
                <button id="btn_iceCream" onClick={onClickHeladeria}>Heladería</button>
                <button id="btn_coffe" onClick={onClickCafeteria}>Cafetería</button>
                <button id="btn_all" onClick={onClickCancel}>Todos</button>
            </div>
            <BeShowed show={boolTypeProduct}>
                <select className="form-control" id="id_selectTypeProduct" defaultValue={valueSelect} value={valueSelect} onChange={e => onChangeTypeProduct(e)}>
                    <option disabled value="-1">Seleccione el tipo de producto</option>
                    {
                        typesProductSelected?.map((element, i) => (
                            <option key={i} value={element.id_product_type}>{element.name}</option>
                        ))
                    }
                </select>
                <br />
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