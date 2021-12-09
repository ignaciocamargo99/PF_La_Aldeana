import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Breadcrumb from '../../../../common/Breadcrumb';
import DataEmployee from '../DataEmployee';
import ExtraDataEmployee from '../ExtraDataEmployee';

export default function EditEmployee(props) {
    const [data, setData] = useState(props.employee);

    const load = (childData) => setData(childData)

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Consultar empleado"}</div>
            <Breadcrumb parentName="Empleados" icon={faUserFriends} parentLink="employees" currentName="Consultar empleado" />
            <div className="viewTitle">
                <h1>Empleado {props.employee.name + " " + props.employee.lastName}</h1>
            </div>
            <br />
            <div className="viewBody">
                <DataEmployee load={load} data={data} />
                <ExtraDataEmployee load={load} data={data} />
                <div className='buttons'>
                    <button className='sendOk' onClick={props.return}>Volver</button>
                </div>
            </div>
        </>
    );
}