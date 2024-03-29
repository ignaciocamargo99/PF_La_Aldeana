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
    const [boolBtnAll, setBoolBtnAll] = useState(false);

    useEffect(() => {
        Axios.get(`${PORT()}/api/typeProducts`)
            .then(response => {
                setTypesProduct(response.data);
            })
            .catch(error => console.error(error))
    }, [])

    const onClickHeladeria = () => {
        setBoolBtnAll(false);
        actionsDefaultButtons();
        props.updateProductsFiltered(props.products.filter(n => n.id_sector == 1));
        setTypesProductSelected(typesProduct.filter(n => n.id_sector == 1));
    }

    const onClickCafeteria = () => {
        setBoolBtnAll(false);
        actionsDefaultButtons();
        props.updateProductsFiltered(props.products.filter(n => n.id_sector == 2));
        setTypesProductSelected(typesProduct.filter(n => n.id_sector == 2));
    }

    const actionsDefaultButtons = () => {
        setBoolTypeProduct(true);
        setValueSelect("-1");
    }

    const onClickCancel = () => {
        setBoolTypeProduct(false);
        props.updateProductsFiltered(props.products);
        setBoolBtnAll(true);
    }

    const onChangeTypeProduct = (e) => {
        const id_type_product_selected = e.target.value;
        setValueSelect(id_type_product_selected);
        props.updateProductsFiltered(props.products.filter(n => n.id_product_type == id_type_product_selected));
    }

    useEffect(() => {
        setBoolTypeProduct(false);
        setValueSelect("-1");
    }, [props.salesRegister])

    return (
        <>
            <div className="formRow">
                <h4 style={{ padding: '10px 0px 0px', margin: '0px 10px 0px 0px' }}>Filtrar:</h4>
                <button id="btn_iceCream" className='btn btn-light sendNew' onClick={onClickHeladeria}>Heladería</button>
                <button id="btn_coffe" className='btn btn-light sendNew' onClick={onClickCafeteria}>Cafetería</button>
                <button id="btn_all" className='btn btn-light sendNew' onClick={onClickCancel}>Todos</button>
            </div>
            <BeShowed show={boolTypeProduct}>
                {typesProductSelected?.map((type, i) => {
                    return (
                        <button key={i}
                            className="btn btn-light filterButton"
                            type="button"
                            value={type.id_product_type}
                            onClick={e => onChangeTypeProduct(e)}
                        >
                            {type.name}
                        </button>
                    )
                })}
            </BeShowed>
        </>
    );
}

const mapStateToProps = state => {
    return {
        products: state.products,
        productsFiltered: state.productsFiltered,
        detailProducts: state.detailProducts,
        salesRegister: state.salesRegister
    }
}

const mapDispatchToProps = {
    updateProducts,
    updateProductsFiltered,
    updateDetailProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterProducts);
