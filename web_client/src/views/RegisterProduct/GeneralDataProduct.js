import React, {useState} from "react";
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
            <NameProduct load={load}  data={props.data}/>
            <DescriptionProduct />
            <PriceProduct />
            <SectorProduct />
        </>
    );
}

export default GeneralDataProduct;