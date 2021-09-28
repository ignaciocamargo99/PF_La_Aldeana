import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import { useState } from 'react';
import Breadcrumb from '../../../../common/Breadcrumb';
import Buttons from '../../../../common/Buttons';
import displayError from '../../../../utils/ErrorMessages/displayError';
import successMessage from '../../../../utils/SuccessMessages/successMessage';
import warningMessage from '../../../../utils/WarningMessages/warningMessage';
import DataEmployee from '../DataAdvances';
import ExtraDataEmployee from '../ExtraDataAdvances';


const PORT = require('../../../../config');

export default function EditAdvances(props) {
    const [data, setData] = useState(props.advances);
    const [ready, setReady] = useState(true);

    const load = (childData) => {
        setData(childData)
        if (data.nameEmployee && data.lastName && data.dni && data.id_charge && data.date && data.employmentRelationship && data.dni.length === 8) setReady(true);
        else setReady(false);
    }

    const updateEmployee = () => {
        if (data.nameEmployee && data.lastName && data.dni && data.id_charge && data.date && data.employmentRelationship && ready) {
            Axios.put(`${PORT()}/api/updateEmployee`, data)
                .then((data) => {
                    if (data.data.Ok) successMessage('Atención', 'Se han modificado los datos del empleado', 'success')
                    else displayError('El nuevo dni ya corresponde a otro empleado', 'Atención')
                })
                .catch(error => console.log(error));
        }
        else warningMessage('Atención', 'Todos los campos son obligatorios', 'error');
    };

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Editar adelanto"}</div>
            <Breadcrumb parentName="Adelantos" icon={faUserFriends} parentLink="advances" currentName="Editar adelanto" />
            <h2 style={{ fontWeight: 'bold' }}>Editar adelanto {props.advances.name}</h2>
            <br />
            <DataEmployee load={load} data={data} />
            <ExtraDataEmployee load={load} data={data} />
            <Buttons
                label='Registrar' actionOK={updateEmployee}
                actionNotOK={updateEmployee}
                actionCancel={props.cancel}
                ready={ready}
                data={data} />
        </>
    );
}