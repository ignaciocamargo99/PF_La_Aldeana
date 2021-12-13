import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from "react";
import Breadcrumb from '../../../../common/Breadcrumb';
import DataAssistance from '../RegisterAssistanceEmployee/DataAssistance';

export default function RegisterAssistance(props) {
    const [data, setData] = useState(props.assistance);

    const load = (childData) => setData(childData);

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Consultar asistencia"}</div>
            <Breadcrumb parentName="Asistencias" icon={faUserFriends} parentLink="assistanceEmployees" currentName="Consultar asistencia" />
            <div className="viewTitleBtn">
                <h1>Asistencia de {data.name} / DNI: {data.dni}</h1>
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