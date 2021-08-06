import React, { useState } from "react";
import DescriptionProduct from "../RegisterProduct/components/DescriptionProduct";
import NameProduct from '../RegisterProduct/components/NameProduct';
import PriceProduct from '../RegisterProduct/components/PriceProduct';
import SectorProduct from '../RegisterProduct/components/SectorProduct';

const GeneralDataProduct = (props) => {
    const [data, setData] = useState({});

    const load = (childData) => {
        setData(childData);
        props.load(childData);
    }
    return (
        <>
            <h2>Datos generales</h2>
            <NameProduct load={load} data={props.data} />
            <DescriptionProduct load={load} data={props.data} />
            <PriceProduct load={load} data={props.data} />
            <SectorProduct load={load} data={props.data} />
        </>
    );
}

export default GeneralDataProduct;