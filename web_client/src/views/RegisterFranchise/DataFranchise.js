import React, { useState } from "react";
import NameFranchise from './components/NameFranchise';
import AddressFranchise from './components/AddressFranchise';
import CityFranchise from './components/CityFranchise';
import ProvinceFranchise from './components/ProvinceFranchise';

const DataFranchise = (props) => {


    const [data, setData] = useState({});

    const load = (childData) => {
        setData(childData);
        props.load(childData);
    }
    return (
        <>
            <NameFranchise load={load} data={props.data} />
            <AddressFranchise load={load} data={props.data} />
            <CityFranchise load={load} data={props.data} />
            <ProvinceFranchise load={load} data={props.data} />
        </>
    );
}

export default DataFranchise;