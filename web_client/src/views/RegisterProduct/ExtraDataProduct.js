import { useState } from 'react';
import ImageProduct from './components/ImageProduct';
import SuppliesProduct from './components/SuppliesProduct';
import TypeProduct from './components/TypeProduct';

const ExtraDataProduct = (props) => {
    const [data, setData] = useState({});

    const load = (childData) => {
        setData(childData);
        props.load(childData);
    }

    return (
        <>
            <TypeProduct load={props.load} data={props.data}/>
            {/* <SuppliesProduct load={props.load} data={props.data} /> */}
            <ImageProduct load={props.load} data={props.data} />
        </>
    );
}

export default ExtraDataProduct;