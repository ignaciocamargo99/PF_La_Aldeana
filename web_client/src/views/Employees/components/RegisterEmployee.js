import React, { useState, useEffect } from "react";
import Breadcrumb from '../../../common/Breadcrumb';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Buttons from "../../../common/Buttons";
import DataEmployee from './DataEmployee';
import ExtraDataEmployee from './ExtraDataEmployee';
import Axios from 'axios';
import successMessage from '../../../utils/SuccessMessages/successMessage';
import displayError from "../../../utils/ErrorMessages/displayError";
import warningMessage from "../../../utils/WarningMessages/warningMessage";

const PORT = require('../../../config');

export default function RegisterEmployee() {
    const [ready, setReady] = useState(false);
    const [data, setData] = useState({ nameEmployee: null, lastName: null, dni: null, id_charge: null, date: null, employmentRelationship: null, editing: false });
    const cancelRegisterEmployee = () => window.location.reload();

    const load = (childData) => {
        setData(childData);
        console.log(data)
        if (data.nameEmployee && data.lastName && data.dni && data.id_charge && data.date && data.employmentRelationship && data.dni.length === 8) setReady(true);
        else setReady(false);
    }

    const registerNewEmployee = () => {
        if (data.nameEmployee && data.lastName && data.dni && data.id_charge && data.date && data.employmentRelationship && ready) {
            setReady(true);
            Axios.post(`${PORT()}/api/newEmployee`, data)
                .then((data) => {
                    if (data.data.Ok) successMessage('Atención', 'Nuevo empleado dado de alta exitosamente', 'success');
                    else displayError('Ha ocurrido un error al dar de alta al nuevo empleado');
                })
                .catch((error) => console.error(error))
        }
        else warningMessage('Atención', 'Todos los campos son obligatorios.', 'warning');
    }

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Registrar empleado"}</div>
            <Breadcrumb parentName="Empleados" icon={faUserFriends} parentLink="employees" currentName="Registrar empleado" />
            <div className="viewTitle">
                <h1>Registrar empleado</h1>
            </div>
            <div className="viewBody">
                <DataEmployee load={load} data={data} />
                <ExtraDataEmployee load={load} data={data} />
                <Buttons
                    label='Registrar' ready={ready} actionOK={registerNewEmployee} actionNotOK={registerNewEmployee} 
                    data={data} actionCancel={cancelRegisterEmployee}
                />
            </div>
        </>
    );
}