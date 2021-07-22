import React, { useState } from "react";
import DescriptionProduct from "./components/DescriptionProduct";
import NameProduct from './components/NameProduct';
import PriceProduct from './components/PriceProduct';
import SectorProduct from './components/SectorProduct';

const GeneralDataProduct = (props) => {


    const [data, setData] = useState({});

    const load = (childData) => {
        setData(childData);
        props.load(childData);
    }
    return (
        <>
            <NameProduct load={load} data={props.data} />
            <DescriptionProduct load={load} data={props.data} />
            <PriceProduct load={load} data={props.data} />
            <SectorProduct load={load} data={props.data} />
        </>
    );
}

export default GeneralDataProduct;