import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from "react";
import BeShowed from "../../../common/BeShowed";
import LoaderSpinner from "../../../common/LoaderSpinner";
import TablePagination from '../components/TablePagination/TablePagination';
import backupAssistance from './EditAssistanceEmployee/backupAssistance';
import EditAssistance from "./EditAssistanceEmployee/EditAssistance";
import ReadAssistanceEmployee from './ReadAssistanceEmployee/ReadAssistanceEmployee';

const PORT = require('../../../config');

export default function EmployeesTable(props) {
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isReading, setIsReading] = useState(false);
    const [assistance, setAssistance] = useState([]);
    const [editing, setEditing] = useState({});
    const [reading, setReading] = useState({});
    let permissionsAccess = props.permissionsAccess;

    useEffect(() => {
        Axios.get(PORT() + '/api/employeeAssistance')
            .then((response) => {
                handlerLoadingSpinner();
                let auxSupply = response.data;
                setAssistance(auxSupply);
            })
            .catch((error) => console.log(error));
    }, []);

    const deleteAssistance = (i) => {
        let aux = [];
        assistance?.forEach((e, j) => {
            if (j !== i) aux[j] = e;
        });
        setAssistance(aux);
    }

    const editAssistance = (assistance) => {
        let aux = backupAssistance(assistance);
        aux.name = assistance.name;
        aux.last_name = assistance.last_name;
        aux.dni = assistance.employee;

        if (assistance.date_egress) aux.inputDateEgress = assistance.date_egress.slice(0, 10);
        if (PORT() !== '') {
            aux.date_entry = moment(assistance.date_entry).add(3, 'hours').format('HH:mm');
            aux.date_egress = moment(assistance.date_egress).add(3, 'hours').format('HH:mm');
            aux.lastDateEntry = moment(assistance.date_entry).add(3, 'hours').format('YYYY-MM-DD HH:mm:ss');
        }
        else {
            aux.date_entry = moment(assistance.date_entry).format('HH:mm');
            aux.date_egress = moment(assistance.date_egress).format('HH:mm');
            aux.lastDateEntry = moment(assistance.date_entry).format('YYYY-MM-DD HH:mm:ss');
        }

        aux.inputDateEntry = assistance.date_entry.slice(0, 10);
        if (assistance.date_egress) aux.inputDateEgress = assistance.date_egress.slice(0, 10);

        aux.id_assistance = assistance.id_assistance;
        aux.editing = true;
        setEditing(aux);
        setIsEditing(true);
    }

    const readAssistance = (assistance) => {
        let aux = backupAssistance(assistance);
        aux.name = assistance.name;
        aux.last_name = assistance.last_name;
        aux.dni = assistance.employee;

        if (PORT() === '') {
            aux.date_entry = moment(assistance.date_entry).format('HH:mm');
            aux.date_egress = moment(assistance.date_egress).format('HH:mm');
        }
        else {
            aux.date_entry = moment(assistance.date_entry).add(3, 'hours').format('HH:mm');
            aux.date_egress = moment(assistance.date_egress).add(3, 'hours').format('HH:mm');
        }

        aux.inputDateEntry = assistance.date_entry.slice(0, 10);
        if (assistance.date_egress) aux.inputDateEgress = assistance.date_egress.slice(0, 10);

        aux.reading = true;
        setReading(aux);
        setIsReading(true);
    }

    const goBackToAllAssistanceTable = () => {
        <div style={{ display: 'none' }}>{document.title = "Asistencias"}</div>
        setIsEditing(false);
        setIsReading(false);
        window.scrollTo(0, 0);
    }

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    const onClickNewAssistance = () => {
        window.location.replace('/app/registerAssistance');
    }

    const columnsHeaders = [
        { name: 'Fecha de ingreso' },{ name: 'DNI' }, { name: 'Nombre' }, { name: 'Apellido' },
        { name: 'Hora de ingreso' }, { name: 'Hora de egreso' },
        { name: 'Ver' }, { name: 'Editar' }, { name: 'Eliminar' }
    ]

    return (
        <>
            {isLoadingSpinner ?
                <LoaderSpinner color="primary" loading="Cargando..." />
                : assistance?.length === 0
                    ?
                    <div>
                        <div className="viewTitleBtn">
                            <h1>Asistencias</h1>
                            <BeShowed show={permissionsAccess === 2 || permissionsAccess === 3}>
                                <button id='editAssistanceButton' onClick={onClickNewAssistance} type="button" className="newBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                            </BeShowed>
                            <BeShowed show={permissionsAccess === 1}>
                                <button id='editAssistanceButton' disabled type="button" className="disabledNewBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                            </BeShowed>
                        </div>
                        <br />
                        <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No ha marcado nadie el ingreso/egreso en esta fecha</h4>
                    </div>
                    : (

                        <BeShowed show={!isEditing && !isReading}>
                            <div className="viewTitleBtn">
                                <h1>Asistencias</h1>
                                <BeShowed show={permissionsAccess === 2 || permissionsAccess === 3}>
                                    <button id='editAssistanceButton' onClick={onClickNewAssistance} type="button" className="newBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                                </BeShowed>
                                <BeShowed show={permissionsAccess === 1}>
                                    <button id='editAssistanceButton' disabled type="button" className="disabledNewBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                                </BeShowed>
                            </div>

                            <div className="viewBody">
                                <TablePagination
                                    columnsHeaders={columnsHeaders}
                                    currentElements={assistance}
                                    handleRead={readAssistance}
                                    handleEdit={editAssistance}
                                    handleDelete={deleteAssistance}
                                    permissionsAccess={permissionsAccess} />
                            </div>
                        </BeShowed>
                    )}
            <BeShowed show={isEditing}>
                <EditAssistance onClickCancelEdit={goBackToAllAssistanceTable} assistance={editing} />
            </BeShowed>
            <BeShowed show={isReading}>
                <ReadAssistanceEmployee onClickCancelRead={goBackToAllAssistanceTable} assistance={reading} />
            </BeShowed>
        </>
    );
}