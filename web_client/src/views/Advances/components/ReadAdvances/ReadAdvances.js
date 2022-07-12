import React, { useState, useEffect } from "react";
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from '../../../../common/Breadcrumb';
import ExtraDataAdvances from '../ExtraDataAdvances';
import dateText from "../../../../utils/DateFormat/dateText";
import Axios from "axios";
import formatInstallments from "../formatInstallments";

const PORT = require('../../../../config');

export default function ReadAdvances(props) {
    
    const [data, setData] = useState(props.advances);
    const [dataBack, setDataBack] = useState(props.advances);

    const [isLoad, setIsLoad] = useState(false);

    useEffect(()=>{
        if (!isLoad) {
            if(data.reading || data.editing){
                Axios.get(PORT() + `/api/installments?dniEmployee=${data.dniEmployee}&date=${data.date}`)
                    .then((response) => {
                        let aux = data;
                        let res = formatInstallments(response.data);
                        aux.firstMonth = res[0].month.slice(0, -3);
                        aux.installments = res;
                        aux.months = res.length;
                        setDataBack({amount: data.amount, date: data.date, installments: res, months: res.length, firstMonth: res[0].month.slice(0, -3)});
                        setData(aux);
                        setIsLoad(true);
                    })
                    .catch((error) => console.log(error));
                }
        }
    }, [isLoad, data.editing, data.reading, data]);

    const load = (childData) => setData(childData);

    const back = () => {
        setData(dataBack);
        props.return();
    }

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Consultar adelanto"}</div>
            <Breadcrumb parentName="Adelantos" icon={faUserFriends} parentLink="advances" currentName="Consultar adelanto" />
            <div className="viewTitle">
                <h1>Empleado {props.advances.name + " " + props.advances.last_name + " " + dateText(new Date(props.advances.date))}</h1>
            </div>
            <br />
            <div className="viewBody">
                <ExtraDataAdvances load={load} data={data}/>
                <div className='buttons'>
                    <button className='btn btn-light sendOk' onClick={back}>Volver</button>
                </div>
            </div>
        </>
    );
}