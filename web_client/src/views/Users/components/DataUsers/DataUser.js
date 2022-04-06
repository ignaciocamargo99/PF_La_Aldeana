import React from "react";
import NickUser from "./NickUser";
import FirstName from './FirstName';
import LastName from './LastName';
import Password from './Password';
import BeShowed from "../../../../common/BeShowed";

const DataUser = (props) => {
    return (
        <>
            <h2>Datos generales</h2>
            <NickUser load={(childData) => props.load(childData)} data={props.data} />
            <FirstName load={(childData) => props.load(childData)} data={props.data} />
            <LastName load={(childData) => props.load(childData)} data={props.data} />
            <BeShowed show={!props.data.reading}>
                <Password load={(childData) => props.load(childData)} data={props.data} />
            </BeShowed>
        </>
    );
}

export default DataUser;