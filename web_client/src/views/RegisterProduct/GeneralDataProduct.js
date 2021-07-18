import React from "react";
import DescriptionProduct from "./components/DescriptionProduct";
import NameProduct from './components/NameProduct';
import PriceProduct from './components/PriceProduct';
import SectorProduct from './components/SectorProduct';

const GeneralDataProduct = () => {
    return (
        <>
            <NameProduct />

            <DescriptionProduct />

            <PriceProduct />

            <SectorProduct />
        </>
    );
}

export default GeneralDataProduct;