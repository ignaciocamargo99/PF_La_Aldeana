import React, { useEffect, useState } from "react";
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from '../../../../common/Breadcrumb';
import DataAdvances from '../DataAdvances';
import ExtraDataAdvances from '../ExtraDataAdvances';
import dateText from "../../../../utils/DateFormat/dateText";

export default function ReadAdvances(props) {
    
    const [data, setData] = useState(props.advances);
    const [dataBack, setDataBack] = useState(props.advances);

    const load = (childData) => setData(childData);

    const loadBack = (childData) => {
        setDataBack(childData);
    }

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Consultar adelanto"}</div>
            <Breadcrumb parentName="Adelantos" icon={faUserFriends} parentLink="advances" currentName="Consultar adelanto" />
            <h2 style={{ fontWeight: 'bold' }}>Empleado {props.advances.name + " " + props.advances.last_name + " " + dateText(new Date(props.advances.date))}</h2>
            <br />
            <DataAdvances load={load} data={data} />
            <ExtraDataAdvances load={load} data={data}  loadBack={loadBack}/>
            <div className='buttons'>
                <button className='sendOk' onClick={props.return}>Volver</button>
            </div>
        </>
    );
}