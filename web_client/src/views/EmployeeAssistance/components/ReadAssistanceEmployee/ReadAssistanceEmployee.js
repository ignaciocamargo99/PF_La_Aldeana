import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import React, { useEffect, useState } from "react";
import Breadcrumb from '../../../../common/Breadcrumb';
import DataAssistance from '../RegisterAssistanceEmployee/DataAssistance';

const PORT = require('../../../../config');

export default function RegisterAssistance(props) {
    // const [ready, setReady] = useState(true);
    const [data, setData] = useState(props.assistance);
    // const [employeeAux, setEmployeeAux] = useState([]);

    const load = (childData) => {
        setData(childData);
        console.log(data)
    }

    // useEffect(() => {
    //     Axios.get(`${PORT()}/api/employees`)
    //         .then((response) => setEmployeeAux(response.data));
    // }, [ready]);

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Consultar asistencia"}</div>
            <Breadcrumb parentName="Asistencias" icon={faUserFriends} parentLink="assistanceEmployees" currentName="Consultar asistencia" />
            <h2 style={{ fontWeight: 'bold' }}>Asistencia de {data.name} / DNI: {data.dni}</h2>
            <div className="viewBody">
                <DataAssistance load={load} data={data} />
                <div className='buttons'>
                    <button className='sendOk' onClick={props.return}>Volver</button>
                </div>
            </div>
        </>
    );
}