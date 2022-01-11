import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import { useState } from 'react';
import Breadcrumb from '../../../../common/Breadcrumb';
import Buttons from '../../../../common/Buttons';
import displayError from '../../../../utils/ErrorMessages/displayError';
import successMessage from '../../../../utils/SuccessMessages/successMessage';
import warningMessage from '../../../../utils/WarningMessages/warningMessage';
import DataEmployee from '../DataEmployee';
import ExtraDataEmployee from '../ExtraDataEmployee';


const PORT = require('../../../../config');

export default function EditEmployee(props) {
    const [data, setData] = useState(props.employee);
    const [ready, setReady] = useState(true);

    const load = (childData) => {
        setData(childData)
        if (data.nameEmployee && data.lastName && data.dni && data.id_charge && data.date && data.employmentRelationship && data.dni.length === 8) setReady(true);
        else setReady(false);
    }

    const updateEmployee = () => {
        if (data.nameEmployee && data.lastName && data.dni && data.id_charge && data.date && data.employmentRelationship && ready) {
            Axios.put(`${PORT()}/api/employees/${data.dni}`, data)
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
                <h1>Editar empleado {props.employee.name + " " + props.employee.lastName}</h1>
            </div>
            <br />
            <div className="viewBody">
                <DataEmployee load={load} data={data} />
                <ExtraDataEmployee load={load} data={data} />
                <Buttons
                    label='Registrar' actionOK={updateEmployee}
                    actionNotOK={updateEmployee}
                    actionCancel={props.cancel}
                    ready={ready}
                    data={data} />
            </div>
        </>
    );
}