import React, { useState } from "react";
import AddressFranchise from './components/AddressFranchise';
import AddressNumberFrabchise from "./components/AddressNumberFrabchise";
import CityFranchise from './components/CityFranchise';
import ProvinceFranchise from './components/ProvinceFranchise';
import StartDate from "./components/StartDate";

const DataFranchise = (props) => {


    const [data, setData] = useState({});

    const load = (childData) => {
        setData(childData);
        props.load(childData);
    }
    return (
        <>
            <StartDate load={load} data={props.data} />
            <AddressFranchise load={load} data={props.data} />
            <AddressNumberFrabchise load={load} data={props.data} />
            <CityFranchise load={load} data={props.data} />
            <ProvinceFranchise load={load} data={props.data} />
        </>
    );
}

export default DataFranchise;