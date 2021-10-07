import Axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from "react";
import BeShowed from "../../../common/BeShowed";
import LoaderSpinner from "../../../common/LoaderSpinner";
import BodyTable from "../../../common/Table/BodyTable";
import HeaderTable from "../../../common/Table/HeaderTable";
import Table from '../../../common/Table/Table';
import EditAssistanceButton from './EditAssistanceEmployee/EditAssistanceButton';
import DeleteAssistanceButton from './DeleteAssistanceButton'
// import DeleteEmployeeButton from './DeleteEmployeeButton';
// import backupEmployee from './EditEmployee/backupEmployee';
// import EditEmployee from "./EditEmployee/EditEmployee";
// import EditEmployeeButton from "./EditEmployee/EditEmployeeButton";
// import ReadEmployee from './ReadEmployee/ReadEmployee';
// import ReadEmployeeButton from "./ReadEmployee/ReadEmployeeButton";

const PORT = require('../../../config');

export default function EmployeesTable() {
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isReading, setIsReading] = useState(false);
    const [assistance, setAssistance] = useState();
    // const [editing, setEditing] = useState({});
    // const [reading, setReading] = useState({});

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
            if (j !== i) {
                aux[j] = e;
            }
        });
        setAssistance(aux);
    }

    // const editEmployee = (employees) => {
    //     let aux = backupEmployee(employees);
    //     aux.name = employees.name;
    //     aux.lastName = employees.last_name;
    //     aux.date = moment(employees.date_admission).format('YYYY-MM-DD');
    //     aux.previousDni = employees.dni;
    //     aux.editing = true;
    //     setEditing(aux);
    //     setIsEditing(true);
    // }

    // const readEmployee = (employees) => {
    //     let aux = employees;
    //     aux.lastName = employees.last_name;
    //     aux.employmentRelationship = employees.employment_relationship;
    //     aux.date = moment(employees.date_admission).format('YYYY-MM-DD');
    //     aux.reading = true;
    //     setReading(aux);
    //     setIsReading(true);
    // }

    // const cancelEditEmployee = () => {
    //     <div style={{ display: 'none' }}>{document.title = "Empleados"}</div>
    //     setIsEditing(false);
    //     window.scrollTo(0, 0);
    // }
    // const returnReadEmployee = () => {
    //     <div style={{ display: 'none' }}>{document.title = "Empleados"}</div>
    //     setIsReading(false);
    //     window.scrollTo(0, 0);
    // }

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    return (
        <>
            <h3>Registros del día {new Date().toLocaleDateString('en-EN')}</h3>
            {isLoadingSpinner && (
                <LoaderSpinner color="primary" loading="Cargando..." />
            )}
            {!isLoadingSpinner && (
                <BeShowed show={!isEditing && !isReading}>
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
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{moment(element.date_entry).format('LT')}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.date_egress ? moment(element.date_egress).format('LT') : '-'}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                {/* <ReadEmployeeButton employee={element} read={readEmployee} /> */}
                                            </td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                <EditAssistanceButton employee={element} />
                                            </td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                <DeleteAssistanceButton assistance={element} index={i} deleteAssistance={deleteAssistance}/>
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                        />
                    </Table>
                </BeShowed>
            )}
            {/* <BeShowed show={isEditing}>
                <EditEmployee cancel={cancelEditEmployee} employee={editing} />
            </BeShowed>
            <BeShowed show={isReading}>
                <ReadEmployee return={returnReadEmployee} employee={reading} />
            </BeShowed> */}
        </>
    );
}