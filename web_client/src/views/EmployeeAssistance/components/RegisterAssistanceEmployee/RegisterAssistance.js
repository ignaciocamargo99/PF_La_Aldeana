import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import React, { useState, useEffect } from "react";
import Breadcrumb from '../../../../common/Breadcrumb';
import Buttons from "../../../../common/Buttons";
import displayError from "../../../../utils/ErrorMessages/displayError";
import successMessage from '../../../../utils/SuccessMessages/successMessage';
import warningMessage from "../../../../utils/WarningMessages/warningMessage";
import DataAssistance from './DataAssistance';
import formattedDate from '../../../../utils/formattedDate';
import loadingMessage from '../../../../utils/LoadingMessages/loadingMessage';

const PORT = require('../../../../config');

export default function RegisterAssistance() {
    const [ready, setReady] = useState(false);
    const [employeeAux, setEmployeeAux] = useState([]);
    const [data, setData] = useState({ date_entry: null, date_egress: null, employee: null, editing: false, reading: false });

    const cancelRegisterEmployee = () => window.location.replace('/app/assistanceEmployees');

    const load = (childData) => {
        setData(childData);
        console.log(data);
        if (data.date_entry && data.employee) {
            if (data.date_egress) {
                if (data.date_entry < data.date_egress) setReady(true);
                else setReady(false);
            }
            else setReady(true);
        }
        else setReady(false);
    }

    useEffect(() => {
        Axios.get(`${PORT()}/api/employees`)
            .then((response) => setEmployeeAux(response.data))
    }, [ready]);

    const registerNewAssistanceEmployee = () => {
        let actualDate
        if (data.date_entry >= data.date_egress) {
            warningMessage('Atención', 'Recuerde que la hora de ingreso debe ser anterior a la hora de salida', 'warning');
        }
        else {
            console.log(data)
            actualDate = formattedDate(new Date());
            let dateEntry, dateEgress;
            dateEntry = actualDate + " " + data.date_entry;

            if (data.date_egress) dateEgress = actualDate + " " + data.date_egress;
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
            else warningMessage('Atención', 'Complete los campos obligatorios o ingrese un dni que corresponda a un empleado activo.', 'warning');
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