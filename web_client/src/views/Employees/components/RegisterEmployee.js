import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import React, { useState } from "react";
import Breadcrumb from '../../../common/Breadcrumb';
import Buttons from "../../../common/Buttons";
import displayError from "../../../utils/ErrorMessages/displayError";
import successMessage from '../../../utils/SuccessMessages/successMessage';
import warningMessage from "../../../utils/WarningMessages/warningMessage";
import DataEmployee from './DataEmployee';
import isEmployeeFormDataValid from './EmployeeFormDataValidation';
import ExtraDataEmployee from './ExtraDataEmployee';
import FingerPrint from './FingerPrint';

const PORT = require('../../../config');

export default function RegisterEmployee() {
    const [ready, setReady] = useState(false);
    const [data, setData] = useState({});
    const cancelRegisterEmployee = () => window.location.replace('/app/employees');

    const load = (childData) => {
        setData(childData);

        if (isEmployeeFormDataValid(data)) {
            setReady(true);
        }
        else setReady(false);
    };

    const registerNewEmployee = () => {
        if (isEmployeeFormDataValid(data) && ready) {
            Axios.post(`${PORT()}/api/employees`, data)
                .then((response) => {
                    if (response.data.Ok) {
                        successMessage('Atención', 'Nuevo empleado dado de alta exitosamente', 'success');
                    }
                    else {
                        displayError('El dni ingresado ya corresponde a otro empleado');
                    }
                })
                .catch((error) => console.error(error))
        }
        else warningMessage('Atención', 'Todos los campos son obligatorios.', 'warning');
    };

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Registrar empleado"}</div>
            <Breadcrumb parentName="Empleados" icon={faUserFriends} parentLink="employees" currentName="Registrar empleado" />
            <div className="viewTitle">
                <h1>Registrar empleado</h1>
            </div>
            <div className="viewBody">
                <DataEmployee
                    data={data}
                    load={load}
                />
                <ExtraDataEmployee
                    data={data}
                    load={load}
                />
                <Buttons
                    actionCancel={cancelRegisterEmployee}
                    actionNotOK={registerNewEmployee}
                    actionOK={registerNewEmployee}
                    data={data}
                    label='Registrar'
                    ready={ready}
                />
            </div>
        </>
    );
}