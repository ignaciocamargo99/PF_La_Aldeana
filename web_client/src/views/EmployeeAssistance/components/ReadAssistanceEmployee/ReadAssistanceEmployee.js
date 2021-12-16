import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import React, { useState, useEffect } from "react";
import Breadcrumb from '../../../../common/Breadcrumb';
import DataAssistance from '../RegisterAssistanceEmployee/DataAssistance';
import getEmployees from '../getEmployees';

const PORT = require('../../../../config');

export default function RegisterAssistance(props) {
    const [data, setData] = useState(props.assistance);

    const load = (childData) => setData(childData);

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        Axios.get(`${PORT()}/api/employees`)
            .then((response) => setEmployees(response.data))
    }, []);

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Consultar asistencia"}</div>
            <Breadcrumb parentName="Asistencias" icon={faUserFriends} parentLink="assistanceEmployees" currentName="Consultar asistencia" />
            <div className="viewTitleBtn">
                <h1>Asistencia de {getEmployees(employees, data.dni)} / DNI: {data.dni}</h1>
            </div>
            <br />
            <div className="viewBody">
                <DataAssistance load={load} data={data} />
                <div className='buttons'>
                    <button className='sendOk' onClick={props.return}>Volver</button>
                </div>
            </div>
        </>
    );
}