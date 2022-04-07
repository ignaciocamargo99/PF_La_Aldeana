import React, { useState } from 'react';
import BeShowed from '../../common/BeShowed';
import FlavorsAmount from './components/FlavorsAmount';
import ImageProduct from './components/ImageProduct';
import ImageEditProduct from '../ListProducts/components/EditProducts/components/ImageProduct';
import SuppliesPairTables from './components/SuppliesPairTables/SuppliesPairTables';
import TypeProduct from './components/TypeProduct';

const ExtraDataProduct = (props) => {
    const [data, setData] = useState({});

    const load = (childData) => {
        setData(childData);
        props.load(childData);
    }

    return (
        <>
            <TypeProduct load={props.load} data={props.data} />
            <BeShowed show={parseInt(props.data.id_product_type, 10) === 3}>
                <FlavorsAmount load={props.load} data={props.data} />
            </BeShowed>
            <hr />
            <h2>Insumos</h2>
            <SuppliesPairTables load={props.load} data={props.data} />
            <hr />
            <h2>Imagen</h2>
            <BeShowed show={props.data.editing}>
                <ImageEditProduct load={props.load} data={props.data} />
            </BeShowed>
            <BeShowed show={!props.data.editing}>
                <ImageProduct load={props.load} data={props.data} />
            </BeShowed>
        </>
    );
};

export default ExtraDataProduct;