import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Breadcrumb from '../../../../common/Breadcrumb';
import DataAdvances from '../DataAdvances';
import ExtraDataAdvances from '../ExtraDataAdvances';

export default function ReadAdvances(props) {
    const [data, setData] = useState(props.advances);

    const load = (childData) => setData(childData)

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Consultar adelanto"}</div>
            <Breadcrumb parentName="Adelantos" icon={faUserFriends} parentLink="advances" currentName="Consultar adelanto" />
            <h2 style={{ fontWeight: 'bold' }}>Empleado {props.advances.name + " " + props.advances.lastName}</h2>
            <br />
            <DataAdvances load={load} data={data} />
            <ExtraDataAdvances load={load} data={data} />
            <div className='buttons'>
                <button className='sendOk' onClick={props.return}>Volver</button>
            </div>
        </>
    );
}