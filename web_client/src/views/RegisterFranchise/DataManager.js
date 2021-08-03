import React, { useState } from "react";
import NameManager from './components/NameManager';
import LastNameManager from './components/LastNameManager';
import DniManager from './components/DniManager';

const DataManager = (props) => {


    const [data, setData] = useState({});

    const load = (childData) => {
        setData(childData);
        props.load(childData);
    }
    return (
        <>
            <h2>Encargado</h2>
            <NameManager load={load} data={props.data} />
            <LastNameManager load={load} data={props.data} />
            <DniManager load={load} data={props.data} />
        </>
    );
}

export default DataManager;