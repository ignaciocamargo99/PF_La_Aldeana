import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import React, { useEffect, useState } from "react";
import Breadcrumb from '../../../../common/Breadcrumb';
import Buttons from "../../../../common/Buttons";
import displayError from "../../../../utils/ErrorMessages/displayError";
import loadingMessage from '../../../../utils/LoadingMessages/loadingMessage';
import successMessage from '../../../../utils/SuccessMessages/successMessage';
import warningMessage from "../../../../utils/WarningMessages/warningMessage";
import validateDateEntryEgress from '../../validations/validateDateEntryEgress';
import validateHoursEgressEntry from '../../validations/validateHoursEgressEntry';
import DataAssistance from './DataAssistance';

const PORT = require('../../../../config');

export default function RegisterAssistance() {
    const [ready, setReady] = useState(false);
    const [assistance, setAssistance] = useState([]);
    const [employeeAux, setEmployeeAux] = useState([]);
    const [data, setData] = useState({ inputDateEntry: null, date_entry: null, inputDateEgress: null, date_egress: null, employee: null, editing: false, reading: false, validationEntry: null, validationEgress: null });

    const cancelRegisterEmployee = () => window.location.replace('/app/assistanceEmployees');

    const load = (childData) => {
        setData(childData);
        if (data.date_entry && data.employee !== '-1' && data.inputDateEntry && !data.validationEntry && !data.validationEgress) {
            if (data.inputDateEgress && data.inputDateEgress !== '' && (!data.date_egress || data.date_egress === '')) setReady(false);
            else if (data.inputDateEgress && data.inputDateEgress !== '' && (data.inputDateEntry === data.inputDateEgress) && (data.date_entry <= data.date_egress)) setReady(true);
            else if (data.inputDateEgress && data.inputDateEgress !== '' && (data.inputDateEntry !== data.inputDateEgress)) setReady(true);
            else setReady(true);
        }
        else setReady(false);
    }

    useEffect(() => {
        Axios.get(`${PORT()}/api/employees`)
            .then((response) => setEmployeeAux(response.data))
    }, [ready === true]);

    useEffect(() => {
        Axios.get(`${PORT()}/api/allEmployeeAssistance`)
            .then((response) => setAssistance(response.data))
    }, []);

    const registerNewAssistanceEmployee = () => {
        if (!ready) warningMessage('Atención', 'Complete los campos obligatorios o establezca un horario válido de registro', 'warning');
        else {
            let validateHourEntryEgress;
            let validateDateEntryEgressMessage = validateDateEntryEgress(data.inputDateEntry, data.date_entry, data.inputDateEgress, data.date_egress);
            if (validateDateEntryEgressMessage) return warningMessage('Atención', validateDateEntryEgressMessage, 'warning');
            else {
                if (!ready) warningMessage('Atención', 'Complete los campos obligatorios o establezca un horario válido de registro', 'warning');
                else {
                    validateHourEntryEgress = validateHoursEgressEntry(data.inputDateEntry, data.inputDateEgress, data.date_entry, data.employee, data.date_egress, assistance, null, null);
                    if (validateHourEntryEgress) return warningMessage('Atención', validateHourEntryEgress, 'warning');

                    let dateEntry, dateEgress;

                    if (data.date_entry.length > 5) dateEntry = data.date_entry
                    else dateEntry = data.inputDateEntry + " " + data.date_entry;

                    if (data.date_egress) {
                        if (data.date_egress.length > 5) dateEgress = data.date_egress;
                        else dateEgress = data.inputDateEgress + " " + data.date_egress;
                    }
                    else dateEgress = null;

                    data.date_entry = dateEntry;
                    data.date_egress = dateEgress;
                    let findEmployee = employeeAux.find((employees) => employees.dni === parseInt(data.employee, 10));

                    if (data.date_entry && findEmployee && ready) {
                        loadingMessage('Registrando nueva asistencia...');
                        Axios.post(`${PORT()}/api/assistanceEmployee`, data)
                            .then((data) => {
                                if (data.data.Ok) successMessage(`Registro de asistencia para ${findEmployee.name} ${findEmployee.last_name}`, '', 'success');
                                else displayError('No se ha podido realizar el registro.');
                            })
                            .catch((error) => console.error(error))
                    }
                    else warningMessage('Atención', 'Complete los campos obligatorios o establezca un horario válido de registro', 'warning');
                }

            }
        }

    }

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Registrar asistencia"}</div>
            <Breadcrumb parentName="Asistencias" icon={faUserFriends} parentLink="assistanceEmployees" currentName="Registrar asistencia" />
            <div className="viewTitle">
                <h1>Registrar asistencia en el día de la fecha</h1>
            </div>
            <div className="viewBody">
                <DataAssistance load={load} data={data} />
                <Buttons
                    label='Registrar' ready={ready} actionOK={registerNewAssistanceEmployee} actionNotOK={registerNewAssistanceEmployee}
                    data={data} actionCancel={cancelRegisterEmployee}
                />
            </div>
        </>
    );
}