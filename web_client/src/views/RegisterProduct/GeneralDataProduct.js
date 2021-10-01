import React from "react";
import DescriptionProduct from "../RegisterProduct/components/DescriptionProduct";
import NameProduct from '../RegisterProduct/components/NameProduct';
import PriceProduct from '../RegisterProduct/components/PriceProduct';
import SectorProduct from '../RegisterProduct/components/SectorProduct';

const GeneralDataProduct = ({ load, data }) => {
    return (
        <>
            <h2>Datos generales</h2>
            <NameProduct load={(childData) => load(childData)} data={data} />
            <DescriptionProduct load={(childData) => load(childData)} data={data} />
            <PriceProduct load={(childData) => load(childData)} data={data} />
            <SectorProduct load={(childData) => load(childData)} data={data} />
        </>
    );
}

export default GeneralDataProduct;