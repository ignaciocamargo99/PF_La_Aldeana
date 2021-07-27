import { useState } from 'react';
import ImageProduct from './components/ImageProduct';
import SuppliesProduct from './components/SuppliesProduct';
import TypeProduct from './components/TypeProduct';
import SuppliesPairTables from './components/SuppliesPairTables/SuppliesPairTables';

const ExtraDataProduct = (props) => {
    const [data, setData] = useState({});

    const load = (childData) => {
        setData(childData);
        props.load(childData);
    }

    return (
        <>
            <TypeProduct load={props.load} data={props.data}/>
            <hr />
            <h2>Insumos</h2>
            <SuppliesPairTables load={props.load}/>
            {/* <SuppliesProduct load={props.load} data={props.data} /> */}
            <hr />
            <h2>Imagen</h2>
            <ImageProduct load={props.load} data={props.data} />
        </>
    );
}

export default ExtraDataProduct;