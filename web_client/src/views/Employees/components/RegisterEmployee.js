import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import React, { useState } from "react";
import Breadcrumb from 'common/Breadcrumb';
import Buttons from "common/Buttons";
import displayError from "utils/ErrorMessages/displayError";
import successMessage from 'utils/SuccessMessages/successMessage';
import warningMessage from "utils/WarningMessages/warningMessage";
import DataEmployee from './DataEmployee';
import isEmployeeFormDataValid from './EmployeeFormDataValidation';
import ExtraDataEmployee from './ExtraDataEmployee';
import { defaultQuestionSweetAlert2 } from 'utils/questionMessages/sweetAlert2Questions';
import loadingMessage from 'utils/LoadingMessages/loadingMessage';
import { validationsMessage } from './validationsMessage';

const PORT = require('../../../config');

export default function RegisterEmployee() {
    const [ready, setReady] = useState(false);
    const [data, setData] = useState({
        charges: [],
        isCreatingNewEmployee: true
    });
    const cancelRegisterEmployee = () => window.location.replace('/app/employees');

    const load = (childData) => {
        setData(childData);

        if (isEmployeeFormDataValid(data, false)) {
            setReady(true);
        }
        else setReady(false);
    };

    const registerEmployee = (data) => {
        return Axios.post(`${PORT()}/api/employees`, data);
    }

    const registerDaysOff = (data) => {
        const dniEmployee = data.dni;
        const firstDayOff = data.firstDayOffDate.replaceAll("-", "/")

        return Axios.post(`${PORT()}/api/consecutiveDaysOffOfEmployee`, null, { params: { dniEmployee, firstDayOff } });
    }

    const displayRegisterError = () => {
        displayError('Ya existe un empleado existente con ese número de documento.');
    }

    const registerNewEmployee = async () => {
        let message = validationsMessage(data);
        if (isEmployeeFormDataValid(data, false) && ready) {
            try {
                const registrationConfirmed = (await defaultQuestionSweetAlert2(`¿Registrar "${data.name}"?`)).isConfirmed;
                if (registrationConfirmed) {
                    loadingMessage('Registrando nuevo empleado...');
                    let response = await registerEmployee(data);
                    if (response.data.Ok) {
                        response = await registerDaysOff(data);
                        if (response.data.Ok) {
                            successMessage('Atención', 'Empleado registrado exitosamente', 'success');
                        }
                        else {
                            displayRegisterError();
                        }
                    }
                    else {
                        displayRegisterError();
                    }
                }
                else warningMessage('Error', 'El número de documento ingresado ya se encuentra en uso.', 'error');
            }
            catch {
                displayRegisterError();
            }
        }
        else warningMessage('Atención', message, 'warning');
    };

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Registrar empleado"}</div>
            <Breadcrumb parentName="Empleados" icon={faUserFriends} parentLink="employees" currentName="Registrar empleado" />
            <div className="viewTitle">
                <h1>Registrar empleado/a</h1>
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