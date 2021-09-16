import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const PORT = require('../../../config');

export default function EmployeesTable() {
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [editing, setEditing] = useState({});


    const [backup, setBackup] = useState({});



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
        aux.date = moment(employees.date_admission).format('YYYY-MM-DD')
        aux.editing = true;
        setBackup(employees);
        setEditing(aux);
        setIsEditing(true);
    }

    const cancelEditEmployee = () => setIsEditing(false);

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    return (
        <>
            {isLoadingSpinner && (
                <LoaderSpinner color="primary" loading="Cargando..." />
            )}
            {!isLoadingSpinner && (
                <BeShowed show={!isEditing}>
                    <Table>
                        <HeaderTable
                            th={
                                <>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>DNI</th>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Nombre</th>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Apellido</th>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', verticalAlign: 'middle' }}>Fecha ingreso</th>
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
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{moment(element.date_admission).format('YYYY-MM-DD')}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                <button id='readEmployeeButton' type="button" className="sendEdit"><FontAwesomeIcon icon={faEye} /></button>
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
                </BeShowed>
            )}
            <BeShowed show={isEditing}>
                <EditEmployee cancel={cancelEditEmployee} employee={editing} />
            </BeShowed>
        </>
    );
}