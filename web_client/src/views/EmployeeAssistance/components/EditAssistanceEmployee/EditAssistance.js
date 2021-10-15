import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import React, { useState } from "react";
import Breadcrumb from '../../../../common/Breadcrumb';
import Buttons from "../../../../common/Buttons";
import displayError from "../../../../utils/ErrorMessages/displayError";
import formattedDate from '../../../../utils/formattedDate';
import loadingMessage from '../../../../utils/LoadingMessages/loadingMessage';
import successMessage from '../../../../utils/SuccessMessages/successMessage';
import warningMessage from "../../../../utils/WarningMessages/warningMessage";
import DataAssistance from '../RegisterAssistanceEmployee/DataAssistance';

const PORT = require('../../../../config');

export default function RegisterAssistance(props) {
    const [ready, setReady] = useState(true);
    const [data, setData] = useState(props.assistance);

    const load = (childData) => {
        setData(childData);
        if (data.date_entry && data.employee && (data.date_entry < data.date_egress)) setReady(true);
        else setReady(false);
    }

    const updateAssistanceEmployee = () => {
        let actualDate;
        if (data.date_entry >= data.date_egress) {
            warningMessage('Atención', 'Recuerde que la hora de ingreso debe ser anterior a la hora de salida', 'warning');
        }
        else {
            actualDate = formattedDate(new Date());
            let dateEntry, dateEgress;
            dateEntry = actualDate + " " + data.date_entry;
            if (data.date_egress) dateEgress = actualDate + " " + data.date_egress;
            else dateEgress = null;

            data.date_entry = dateEntry;
            data.date_egress = dateEgress;
            
            if (data.date_entry && ready) {
                loadingMessage('Modificando datos...');
                Axios.put(`${PORT()}/api/employeeAssistance/${data.dni}`, data)
                    .then((data) => {
                        if (data.data.Ok) successMessage('Atención', 'Datos modificados', 'success');
                        else displayError('No se ha podido realizar el registro.');
                    })
                    .catch((error) => console.error(error))
            }
            else warningMessage('Atención', 'Complete los campos obligatorios o ingrese un dni que corresponda a un empleado activo.', 'warning');
        }
    }

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Editar asistencia"}</div>
            <Breadcrumb parentName="Asistencias" icon={faUserFriends} parentLink="assistanceEmployees" currentName="Editar asistencia" />
            <h2 style={{ fontWeight: 'bold' }}>Editar asistencia de {data.name} / DNI: {data.dni}</h2>
            <div className="viewBody">
                <DataAssistance load={load} data={data} />
                <Buttons
                    label='Registrar' ready={ready} actionOK={updateAssistanceEmployee} actionNotOK={updateAssistanceEmployee}
                    data={data} actionCancel={props.cancel}
                />
            </div>
        </>
    );
}