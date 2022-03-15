import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import { useState } from 'react';
import Breadcrumb from '../../../../common/Breadcrumb';
import Buttons from '../../../../common/Buttons';
import displayError from '../../../../utils/ErrorMessages/displayError';
import successMessage from '../../../../utils/SuccessMessages/successMessage';
import warningMessage from '../../../../utils/WarningMessages/warningMessage';
import DataEmployee from '../DataEmployee';
import isEmployeeFormDataValid from '../EmployeeFormDataValidation';
import ExtraDataEmployee from '../ExtraDataEmployee';

const PORT = require('../../../../config');

export default function EditEmployee({ goBack, employeeData }) {
    const [newEmployeeData, setNewEmployeeData] = useState({ ...employeeData });
    const [readyForSubmit, setReadyForSubmit] = useState(true);

    const isEditingEmployeeData = true;

    const load = (childData) => {
        setNewEmployeeData(childData);

        if (isEmployeeFormDataValid(newEmployeeData, true)) {
            setReadyForSubmit(true);
        }
        else setReadyForSubmit(false);
    };

    const updateEmployee = () => {
        const formDataValid = isEmployeeFormDataValid(newEmployeeData, true);

        if (formDataValid && readyForSubmit) {
            Axios.put(`${PORT()}/api/employees/${newEmployeeData.dni}`, newEmployeeData)
                .then((data) => {
                    if (data.data.Ok) successMessage('Atención', 'Se han modificado los datos del empleado', 'success')
                    else displayError('El nuevo dni ya corresponde a otro empleado')
                })
                .catch(error => console.log(error));
        }
        else warningMessage('Atención', 'Todos los campos son obligatorios', 'warning');
    };

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Editar empleado"}</div>
            <Breadcrumb parentName="Empleados" icon={faUserFriends} parentLink="employees" currentName="Editar empleado" />

            <div className="viewTitle">
                <h1>Editar empleado {employeeData.name + " " + employeeData.last_name}</h1>
            </div>
            <br />
            <div className="viewBody">
                <DataEmployee
                    data={newEmployeeData}
                    isEditingEmployeeData={isEditingEmployeeData}
                    load={load}
                />

                <ExtraDataEmployee
                    data={newEmployeeData}
                    isEditingEmployeeData={isEditingEmployeeData}
                    load={load}
                />

                <Buttons
                    actionCancel={goBack}
                    actionNotOK={updateEmployee}
                    actionOK={updateEmployee}
                    data={newEmployeeData}
                    label='Confirmar'
                    ready={readyForSubmit}
                />
            </div>
        </>
    );
}