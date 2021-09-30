import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import React, { useState } from "react";
import Breadcrumb from '../../../common/Breadcrumb';
import Buttons from "../../../common/Buttons";
import displayError from "../../../utils/ErrorMessages/displayError";
import successMessage from '../../../utils/SuccessMessages/successMessage';
import warningMessage from "../../../utils/WarningMessages/warningMessage";
import DataAdvances from './DataAdvances';
import ExtraDataAdvances from './ExtraDataAdvances';

const PORT = require('../../../config');

export default function RegisterAdvances() {
    const [ready, setReady] = useState(false);
    const [data, setData] = useState({ id_employee: null, date: null, amount: null, installments: null, installments_amount: null, pay: null, editing: false, reading: false });
    const cancelRegisterAdvances = () => window.location.reload();

    const load = (childData) => {
        setData(childData);
        console.log(data)
        if (data.id_employee && data.date && data.amount && data.installments && data.installments_amount && data.pay) setReady(true);
        else setReady(false);
    }

    const registerNewAdvances = () => {
        if (data.id_employee && data.date && data.amount && data.installments && data.installments_amount && data.pay && ready) {
            Axios.post(`${PORT()}/api/newEmployee`, data)
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
                <DataAdvances load={load} data={data} />
                <ExtraDataAdvances load={load} data={data} />
                <Buttons
                    label='Registrar' ready={ready} actionOK={registerNewAdvances} actionNotOK={registerNewAdvances}
                    data={data} actionCancel={cancelRegisterAdvances}
                />
            </div>
        </>
    );
}