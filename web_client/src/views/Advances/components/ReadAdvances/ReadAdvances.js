import React, { useEffect, useState } from "react";
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Axios from "axios";
import Breadcrumb from '../../../../common/Breadcrumb';
import DataAdvances from '../DataAdvances';
import ExtraDataAdvances from '../ExtraDataAdvances';

const PORT = require('../../../../config');

export default function ReadAdvances(props) {
    const [data, setData] = useState(props.advances);

    const load = (childData) => setData(childData);

    useEffect(()=>{
        Axios.get(PORT() + `/api/installments?dniEmployee=${props.advances.dniEmployee}&date=${props.advances.date}`)
            .then((response) => {
                let aux = response.data;
                data.installments = aux;
            })
            .catch((error) => console.log(error));
    }, [true])

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Consultar adelanto"}</div>
            <Breadcrumb parentName="Adelantos" icon={faUserFriends} parentLink="advances" currentName="Consultar adelanto" />
            <h2 style={{ fontWeight: 'bold' }}>Empleado {props.advances.name + " " + props.advances.last_name + " " + props.advances.date}</h2>
            <br />
            <DataAdvances load={load} data={data} />
            <ExtraDataAdvances load={load} data={data} />
            <div className='buttons'>
                <button className='sendOk' onClick={props.return}>Volver</button>
            </div>
        </>
    );
}