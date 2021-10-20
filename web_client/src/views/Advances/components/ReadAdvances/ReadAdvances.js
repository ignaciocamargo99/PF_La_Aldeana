import React, { useState, useEffect } from "react";
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from '../../../../common/Breadcrumb';
import DataAdvances from '../DataAdvances';
import ExtraDataAdvances from '../ExtraDataAdvances';
import dateText from "../../../../utils/DateFormat/dateText";
import Axios from "axios";
import formattedDate from '../../../../utils/formattedDate';

const PORT = require('../../../../config');

export default function ReadAdvances(props) {
    
    const [data, setData] = useState(props.advances);
    const [dataBack, setDataBack] = useState(props.advances);

    const [isLoad, setIsLoad] = useState(false);

    useEffect(()=>{
        if (!isLoad) {
            if(data.reading || data.editing){
                Axios.get(PORT() + `/api/installments?dniEmployee=${data.dniEmployee}&date=${formattedDate(new  Date(data.date), 0, 1)}`)
                    .then((response) => {
                        let aux = data;
                        aux.installments[0].month = formattedDate(new Date(response.data[0].month));
                        aux.firstMonth = formattedDate(new Date(response.data[0].month));
                        data.installments = response.data;
                        data.months = response.data.length;
                        data.firstMonth = response.data[0].month;
                        loadBack({amount: data.amount, installments: response.data, months: response.data.length, firstMonth: formattedDate(new Date(response.data[0].month))});
                        setData(aux);
                        setIsLoad(true);
                    })
                    .catch((error) => console.log(error));
                }
        }
    }, [isLoad, data.editing, data.reading, data]);

    const load = (childData) => setData(childData);

    const loadBack = (childData) => {
        if (dataBack)setDataBack(childData);
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