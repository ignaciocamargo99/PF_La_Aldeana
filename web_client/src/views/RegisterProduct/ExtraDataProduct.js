import { useState } from 'react';
import FlavorsAmount from './components/FlavorsAmount';
import ImageProduct from './components/ImageProduct';
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
            <FlavorsAmount />
            <hr />
            <h2>Insumos</h2>
            <SuppliesPairTables load={props.load} data={props.data} />
            <hr />
            <h2>Imagen</h2>
            <ImageProduct load={props.load} data={props.data} />
        </>
    );
}

export default ExtraDataProduct;