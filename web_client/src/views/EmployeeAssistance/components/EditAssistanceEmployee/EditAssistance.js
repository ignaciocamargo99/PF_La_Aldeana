import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import React, { useState, useEffect } from "react";
import Breadcrumb from '../../../../common/Breadcrumb';
import Buttons from "../../../../common/Buttons";
import displayError from "../../../../utils/ErrorMessages/displayError";
import formattedDate from '../../../../utils/formattedDate';
import loadingMessage from '../../../../utils/LoadingMessages/loadingMessage';
import successMessage from '../../../../utils/SuccessMessages/successMessage';
import warningMessage from "../../../../utils/WarningMessages/warningMessage";
import DataAssistance from '../RegisterAssistanceEmployee/DataAssistance';
import validateHoursEgressEntry from '../validateHoursEgressEntry';
import getEmployees from '../getEmployees';

const PORT = require('../../../../config');

export default function EditAssistance(props) {
    const [ready, setReady] = useState(true);
    const [data, setData] = useState(props.assistance);
    const [assistance, setAssistance] = useState([]);

    const load = (childData) => {
        setData(childData);
        if (data.date_entry && data.employee && (data.date_entry < data.date_egress)) setReady(true);
        else setReady(false);
    }

    useEffect(() => {
        Axios.get(`${PORT()}/api/employeeAssistance`)
            .then((response) => setAssistance(response.data))
    }, []);

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        Axios.get(`${PORT()}/api/employees`)
            .then((response) => setEmployees(response.data))
    }, []);

    const updateAssistanceEmployee = () => {
        let validateMessage;
        if (data.date_egress === 'Invalid date') data.date_egress = null;
        if (data.date_entry >= data.date_egress) warningMessage('Atención', 'Recuerde que la hora de ingreso debe ser anterior a la hora de salida', 'warning');
        else {
            validateMessage = validateHoursEgressEntry(data.date_entry, data.dni, data.date_egress, assistance, data.id_assistance, data.editing, PORT());
            if (validateMessage) return warningMessage('Atención', validateMessage, 'warning');
            
            let actualDate;
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
            <div className="viewTitleBtn">
                <h1>Editar asistencia de {getEmployees(employees, data.dni)} / DNI: {data.dni}</h1>
            </div>
            <br />
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