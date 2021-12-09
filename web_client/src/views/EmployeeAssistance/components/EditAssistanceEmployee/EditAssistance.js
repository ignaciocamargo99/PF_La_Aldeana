import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import React, { useEffect, useState } from "react";
import Breadcrumb from '../../../../common/Breadcrumb';
import Buttons from "../../../../common/Buttons";
import displayError from "../../../../utils/ErrorMessages/displayError";
import loadingMessage from '../../../../utils/LoadingMessages/loadingMessage';
import successMessage from '../../../../utils/SuccessMessages/successMessage';
import warningMessage from "../../../../utils/WarningMessages/warningMessage";
import DataAssistance from '../RegisterAssistanceEmployee/DataAssistance';
import validateDateEntryEgress from '../validateDateEntryEgress';
import validateHoursEgressEntry from '../validateHoursEgressEntry';

const PORT = require('../../../../config');

export default function EditAssistance(props) {
    const [ready, setReady] = useState(true);
    const [data, setData] = useState(props.assistance);
    const [assistance, setAssistance] = useState([]);

    const load = (childData) => {
        setData(childData);
        if (data.date_entry && data.dni && data.inputDateEntry && !data.validationEntry && !data.validationEgress) {
            if (data.inputDateEgress && data.inputDateEgress !== '' && (!data.date_egress || data.date_egress === '')) setReady(false);
            else if (data.inputDateEgress && data.inputDateEgress !== '' && (data.inputDateEntry === data.inputDateEgress) && (data.date_entry <= data.date_egress)) setReady(true);
            else if (data.inputDateEgress && data.inputDateEgress !== '' && (data.inputDateEntry !== data.inputDateEgress)) setReady(true);
            else setReady(true);
        }
        else setReady(false);
    }

    useEffect(() => {
        Axios.get(`${PORT()}/api/allEmployeeAssistance`)
            .then((response) => setAssistance(response.data))
    }, []);

    const updateAssistanceEmployee = () => {
        if (!ready) warningMessage('Atención', 'Complete los campos obligatorios o establezca un horario válido de registro', 'warning');
        else {
            let validateHourEntryEgress;
            if (data.date_egress === 'Invalid date') data.date_egress = null;
            let validateDateEntryEgressMessage = validateDateEntryEgress(data.inputDateEntry, data.date_entry, data.inputDateEgress, data.date_egress);

            if (validateDateEntryEgressMessage) return warningMessage('Atención', validateDateEntryEgressMessage, 'warning');
            else {
                validateHourEntryEgress = validateHoursEgressEntry(data.inputDateEntry, data.inputDateEgress, data.date_entry, data.dni, data.date_egress, assistance, data.id_assistance, data.editing, PORT());
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

                if (data.date_entry && ready) {
                    loadingMessage('Modificando datos...');
                    Axios.put(`${PORT()}/api/employeeAssistance/${data.dni}`, data)
                        .then((data) => {
                            if (data.data.Ok) successMessage('Atención', 'Datos modificados', 'success');
                            else displayError('No se ha podido realizar el registro.');
                        })
                        .catch((error) => console.error(error))
                }
                else warningMessage('Atención', 'Complete los campos obligatorios o establezca un horario válido de registro', 'warning');
            }
        }
    }

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Editar asistencia"}</div>
            <Breadcrumb parentName="Asistencias" icon={faUserFriends} parentLink="assistanceEmployees" currentName="Editar asistencia" />
            <div className="viewTitle">
                <h1>Editar asistencia de {data.name} / DNI: {data.dni}</h1>
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