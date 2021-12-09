import Axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from "react";
import BeShowed from "../../../common/BeShowed";
import LoaderSpinner from "../../../common/LoaderSpinner";
import BodyTable from "../../../common/Table/BodyTable";
import HeaderTable from "../../../common/Table/HeaderTable";
import Table from '../../../common/Table/Table';
import DeleteEmployeeButton from './DeleteEmployeeButton';
import backupEmployee from './EditEmployee/backupEmployee';
import EditEmployee from "./EditEmployee/EditEmployee";
import EditEmployeeButton from "./EditEmployee/EditEmployeeButton";
import ReadEmployee from './ReadEmployee/ReadEmployee';
import ReadEmployeeButton from "./ReadEmployee/ReadEmployeeButton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PORT = require('../../../config');

export default function EmployeesTable() {
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isReading, setIsReading] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [editing, setEditing] = useState({});
    const [reading, setReading] = useState({});

    useEffect(() => {
        Axios.get(PORT() + '/api/employees')
            .then((response) => {
                handlerLoadingSpinner();
                let auxSupply = response.data;
                setEmployees(auxSupply);
            })
            .catch((error) => console.log(error));
    }, []);

    const deleteEmployee = (i) => {
        let aux = [];
        employees?.forEach((e, j) => {
            if (j !== i) {
                aux[j] = e;
            }
        });
        setEmployees(aux);
    }

    const editEmployee = (employees) => {
        let aux = backupEmployee(employees);
        aux.name = employees.name;
        aux.lastName = employees.last_name;
        aux.date = moment(employees.date_admission).add(1, 'days').format('YYYY-MM-DD');
        aux.previousDni = employees.dni;
        aux.editing = true;
        setEditing(aux);
        setIsEditing(true);
    }

    const readEmployee = (employees) => {
        let aux = employees;
        aux.lastName = employees.last_name;
        aux.employmentRelationship = employees.employment_relationship;
        aux.date = moment(employees.date_admission).add(1, 'days').format('YYYY-MM-DD');
        aux.reading = true;
        setReading(aux);
        setIsReading(true);
    }

    const cancelEditEmployee = () => {
        <div style={{ display: 'none' }}>{document.title = "Empleados"}</div>
        setIsEditing(false);
        window.scrollTo(0, 0);
    }
    const returnReadEmployee = () => {
        <div style={{ display: 'none' }}>{document.title = "Empleados"}</div>
        setIsReading(false);
        window.scrollTo(0, 0);
    }

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    const onClickNewEmployee = () => {
        window.location.replace('/app/registerEmployees');
    }

    return (
        <>
            {isLoadingSpinner && (
                <LoaderSpinner color="primary" loading="Cargando..." />
            )}
            {!isLoadingSpinner && (
                <BeShowed show={!isEditing && !isReading}>
                    <div className="viewTitleBtn">
                        <h1>Empleados</h1>
                        <button id='editEmployeeButton' onClick={onClickNewEmployee} type="button" className="newBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                    </div>

                    <div className="viewBody">
                        <Table>
                            <HeaderTable
                                th={
                                    <>
                                        <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>DNI</th>
                                        <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Nombre</th>
                                        <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Apellido</th>
                                        <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Fecha de ingreso</th>
                                        <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Ver</th>
                                        <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Editar</th>
                                        <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Eliminar</th>
                                    </>
                                }
                            />
                            <BodyTable
                                tbody={employees?.map((element, i) => {
                                    return (
                                        <tbody key={i}>
                                            <tr>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.dni}</td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name}</td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.last_name}</td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{moment(element.date_admission).add(1, 'days').format('YYYY-MM-DD')}</td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                    <ReadEmployeeButton employee={element} read={readEmployee} />
                                                </td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                    <EditEmployeeButton employee={element} edit={editEmployee} />
                                                </td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                    <DeleteEmployeeButton employee={element} index={i} deleteEmployee={deleteEmployee} />
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            />
                        </Table>
                    </div>
                </BeShowed>
            )}
            <BeShowed show={isEditing}>
                <EditEmployee cancel={cancelEditEmployee} employee={editing} />
            </BeShowed>
            <BeShowed show={isReading}>
                <ReadEmployee return={returnReadEmployee} employee={reading} />
            </BeShowed>
        </>
    );
}