import Axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from "react";
import BeShowed from "../../../common/BeShowed";
import LoaderSpinner from "../../../common/LoaderSpinner";
import BodyTable from "../../../common/Table/BodyTable";
import HeaderTable from "../../../common/Table/HeaderTable";
import Table from '../../../common/Table/Table';
import EditAssistanceButton from './EditAssistanceEmployee/EditAssistanceButton';
import DeleteAssistanceButton from './DeleteAssistanceButton';
import EditAssistance from "./EditAssistanceEmployee/EditAssistance";
import backupAssistance from './EditAssistanceEmployee/backupAssistance';
import ReadAssistanceEmployee from './ReadAssistanceEmployee/ReadAssistanceEmployee';
import ReadAssistanceButton from "./ReadAssistanceButton";

const PORT = require('../../../config');

export default function EmployeesTable() {
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isReading, setIsReading] = useState(false);
    const [assistance, setAssistance] = useState();
    const [editing, setEditing] = useState({});
    const [reading, setReading] = useState({});

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
        aux.dni = assistance.employee;
        aux.inputDateEntry = assistance.date_entry.slice(0, 10);
        if (assistance.date_egress) aux.inputDateEgress = assistance.date_egress.slice(0, 10);
        if (PORT() === '') {
            aux.date_entry = moment(assistance.date_entry).add(3, 'hours').format('HH:mm');
            aux.date_egress = moment(assistance.date_egress).add(3, 'hours').format('HH:mm');
            aux.lastDateEntry = moment(assistance.date_entry).add(3, 'hours').format('YYYY-MM-DD HH:mm:ss');
        }
        else {
            aux.date_entry = moment(assistance.date_entry).format('HH:mm');
            aux.date_egress = moment(assistance.date_egress).format('HH:mm');
            aux.lastDateEntry = moment(assistance.date_entry).format('YYYY-MM-DD HH:mm:ss');
        }
        aux.id_assistance = assistance.id_assistance;
        aux.editing = true;
        setEditing(aux);
        setIsEditing(true);
    }

    const readAssistance = (assistance) => {
        let aux = backupAssistance(assistance);
        aux.name = assistance.name;
        aux.dni = assistance.employee;
        aux.inputDateEntry = assistance.date_entry.slice(0, 10);
        if (assistance.date_egress) aux.inputDateEgress = assistance.date_egress.slice(0, 10);
        if (PORT() === '') {
            aux.date_entry = moment(assistance.date_entry).add(3, 'hours').format('HH:mm');
            aux.date_egress = moment(assistance.date_egress).add(3, 'hours').format('HH:mm');
        }
        else {
            aux.date_entry = moment(assistance.date_entry).format('HH:mm');
            aux.date_egress = moment(assistance.date_egress).format('HH:mm');
        }
        aux.reading = true;
        setReading(aux);
        setIsReading(true);
    }

    const cancelEditAssistance = () => {
        <div style={{ display: 'none' }}>{document.title = "Asistencias"}</div>
        setIsEditing(false);
        window.scrollTo(0, 0);
    }

    const returnReadAssistance = () => {
        <div style={{ display: 'none' }}>{document.title = "Asistencias"}</div>
        setIsReading(false);
        window.scrollTo(0, 0);
    }

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    return (
        <>
            {isLoadingSpinner && (
                <LoaderSpinner color="primary" loading="Cargando..." />
            )}
            {!isLoadingSpinner && assistance && assistance.length === 0
                ? <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No ha marcado nadie el ingreso/egreso en esta fecha</h4>
                : (

                    <BeShowed show={!isEditing && !isReading}>
                            <h3>Registros del día {new Date().toLocaleDateString()}</h3>
                            <Table>
                                <HeaderTable
                                    th={
                                        <>
                                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>DNI</th>
                                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Nombre</th>
                                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Apellido</th>
                                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Hora de ingreso</th>
                                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Hora de egreso</th>
                                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Ver</th>
                                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Editar</th>
                                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Eliminar</th>
                                        </>
                                    }
                                />
                                <BodyTable
                                    tbody={assistance?.map((element, i) => {
                                        return (
                                            <tbody key={i}>
                                                <tr>
                                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.employee}</td>
                                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name}</td>
                                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.last_name}</td>
                                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                        {PORT() !== ''
                                                            ? moment(element.date_entry).add(3, 'hours').format('HH:mm')
                                                            : moment(element.date_entry).format('HH:mm')
                                                        }
                                                    </td>
                                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                        {(element.date_egress)
                                                            ? (PORT() !== ''
                                                                ? moment(element.date_egress).add(3, 'hours').format('HH:mm')
                                                                : moment(element.date_egress).format('HH:mm'))
                                                            : '-'}
                                                    </td>
                                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                        <ReadAssistanceButton assistance={element} read={readAssistance} />
                                                    </td>
                                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                        <EditAssistanceButton assistance={element} edit={editAssistance} />
                                                    </td>
                                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                        <DeleteAssistanceButton assistance={element} index={i} deleteAssistance={deleteAssistance} />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                    })}
                                />
                            </Table>
                    </BeShowed>
                )}
            <BeShowed show={isEditing}>
                <EditAssistance cancel={cancelEditAssistance} assistance={editing} />
            </BeShowed>
            <BeShowed show={isReading}>
                <ReadAssistanceEmployee return={returnReadAssistance} assistance={reading} />
            </BeShowed>
        </>
    );
}