import React from "react";
import NickUser from "./NickUser";
import FirstName from './FirstName';
import LastName from './LastName';
import Password from './Password';
import BeShowed from "common/BeShowed";

const DataUser = (props) => {
    return (
        <>
            <h2>Datos generales</h2>
            <NickUser loadData={(childData) => props.loadData(childData)} data={props.data} />
            <FirstName loadData={(childData) => props.loadData(childData)} data={props.data} />
            <LastName loadData={(childData) => props.loadData(childData)} data={props.data} />
            <BeShowed show={!props.data.reading}>
                <Password loadData={(childData) => props.loadData(childData)} data={props.data} />
            </BeShowed>
        </>
    );
}

export default DataUser;