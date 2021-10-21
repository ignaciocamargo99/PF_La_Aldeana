import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import React, { useState } from "react";
import Breadcrumb from '../../../common/Breadcrumb';
import Buttons from "../../../common/Buttons";
import displayError from "../../../utils/ErrorMessages/displayError";
import formattedDate from '../../../utils/formattedDate';
import successMessage from '../../../utils/SuccessMessages/successMessage';
import warningMessage from "../../../utils/WarningMessages/warningMessage";
import DataAdvances from './DataAdvances';
import ExtraDataAdvances from './ExtraDataAdvances';

const PORT = require('../../../config');

export default function RegisterAdvances() {
    const [ready, setReady] = useState(false);
    const [data, setData] = useState({ dniEmployee: null, date: formattedDate(new Date()), amount: null, installments: [{month: formattedDate(new Date()), amount: 0, label: "", pay: 0}], months: null, pay: null, firstMonth: formattedDate(new Date()), editing: false, reading: false });
    const cancelRegisterAdvances = () => window.location.reload();
    const [first/*, setFirst*/] = useState(data.firstMonth);

    const load = (childData) => {
        //if (new Date(data.firstMonth).getMonth() != new Date(data.installments[0].month).getMonth()) setFirst(new Date(data.installments[0].month).getMonth());
        //console.log(new Date(data.firstMonth).getMonth())
        //childData.installments[0].month = childData.firstMonth;
        setData(childData);
        console.log(childData)
        if (data.dniEmployee && data.date && data.amount && data.installments[0].amount > 0 && data.months && data.date < data.firstMonth) setReady(true);
        else setReady(false);
    }

    const registerNewAdvances = () => {
        if (data.dniEmployee && data.date && data.amount && data.installments[0].amount > 0 && data.months && ready) {
            Axios.post(`${PORT()}/api/advances`, data)
                .then((data) => {
                    if (data.data.Ok) successMessage('Atención', 'Nuevo adelanto dado de alta exitosamente', 'success');
                    else displayError('Ya existe un adelanto registrado para ese empleado en esa fecha.');
                })
                .catch((error) => console.error(error))
        }
        else warningMessage('Atención', 'Todos los campos son obligatorios.', 'warning');
    }

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Registrar adelanto"}</div>
            <div className="viewTitle">
                <h1>Registrar adelanto</h1>
            </div>
            <div className="viewBody">
                <Breadcrumb parentName="Adelantos" icon={faUserFriends} parentLink="advances" currentName="Registrar adelantos" />
                <DataAdvances load={load} data={data}/>
                <ExtraDataAdvances load={load} data={data} firstMonth={first}/>
                <Buttons
                    label='Registrar' ready={ready} actionOK={registerNewAdvances} actionNotOK={registerNewAdvances}
                    data={data} actionCancel={cancelRegisterAdvances}
                />
            </div>
        </>
    );
}