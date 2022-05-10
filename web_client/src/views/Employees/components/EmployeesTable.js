import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from 'axios';
import React, { useEffect, useState } from "react";
import BeShowed from "../../../common/BeShowed";
import LoaderSpinner from "../../../common/LoaderSpinner";
import BodyTable from "../../../common/Table/BodyTable";
import HeaderTable from "../../../common/Table/HeaderTable";
import Table from '../../../common/Table/Table';
import DeleteEmployeeButton from './DeleteEmployeeButton';
import EditEmployee from "./EditEmployee/EditEmployee";
import EditEmployeeButton from "./EditEmployee/EditEmployeeButton";
import ReadEmployee from './ReadEmployee/ReadEmployee';
import ReadEmployeeButton from "./ReadEmployee/ReadEmployeeButton";

const PORT = require('../../../config');

export default function EmployeesTable(props) {

    const [allEmployees, setAllEmployees] = useState([]);
    const [employeeDataToEdit, setEmployeeDataToEdit] = useState({});
    const [employeeDataToRead, setEmployeeDataToRead] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    const [isReading, setIsReading] = useState(false);
    let permissionsAccess = props.permissionsAccess;

    useEffect(() => {
        Axios.get(PORT() + '/api/employees')
        .then((response) => {
            setAllEmployees(response.data);
            setIsLoadingSpinner(false);
        })
        .catch((e) => console.log(e))
    }, []);

    const deleteEmployee = (i) => {
        let aux = [];
        allEmployees?.forEach((e, j) => {
            if (j !== i) {
                aux[j] = e;
            }
        });
        setAllEmployees(aux);
    };

    const handleEditEmpoyee = (selectedEmployeeForEdit) => {
        setEmployeeDataToEdit(selectedEmployeeForEdit);
        setIsEditing(true);
    };

    const handleReadEmpoyee = (selectedEmployeeForRead) => {
        setEmployeeDataToRead(selectedEmployeeForRead);
        setIsReading(true);
    };

    const goBackToAllEmployeesTable = () => {
        document.title = "Empleados";
        setIsEditing(false);
        setIsReading(false);
        window.scrollTo(0, 0);
    };

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    const onClickNewEmployee = () => {
        window.location.replace('/app/registerEmployees');
    };

    return (
        <>
            {isLoadingSpinner ?
                <LoaderSpinner color="primary" loading="Cargando..." /> :

                allEmployees?.length === 0
                    ?
                    <div>
                        <div className="viewTitleBtn">
                            <h1>Empleados</h1>
                            <BeShowed show={permissionsAccess === 2 || permissionsAccess === 3}>
                                <button id='editEmployeeButton' onClick={onClickNewEmployee} type="button" className="btn btn-light newBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                            </BeShowed>
                            <BeShowed show={permissionsAccess === 1}>
                                <button id='editEmployeeButton' disabled type="button" className="disabledNewBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                            </BeShowed>
                        </div>
                        <br />
                        <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No se encontraron empleados registrados hasta el momento.</h4>
                    </div>
                    : (
                        <BeShowed show={!isEditing && !isReading}>
                            <div className="viewTitleBtn">
                                <h1>Empleados</h1>
                                <BeShowed show={permissionsAccess === 2 || permissionsAccess === 3}>
                                    <button id='editEmployeeButton' onClick={onClickNewEmployee} type="button" className="btn btn-light newBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                                </BeShowed>
                                <BeShowed show={permissionsAccess === 1}>
                                    <button id='editEmployeeButton' disabled type="button" className="disabledNewBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                                </BeShowed>
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
                                        tbody={allEmployees?.map((element, i) => {
                                            return (
                                                <tbody key={i}>
                                                    <tr>
                                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.dni}</td>
                                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name}</td>
                                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.last_name}</td>
                                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.date}</td>
                                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                            <ReadEmployeeButton
                                                                employeeData={element}
                                                                handleReadEmpoyeeClicked={handleReadEmpoyee}
                                                            />
                                                        </td>
                                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                            <EditEmployeeButton
                                                                employeeData={element}
                                                                handleEditEmpoyeeClicked={handleEditEmpoyee}
                                                                permissionsAccess={permissionsAccess}
                                                            />
                                                        </td>
                                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                            <DeleteEmployeeButton employee={element} index={i}
                                                                deleteEmployee={deleteEmployee}
                                                                permissionsAccess={permissionsAccess}
                                                            />
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

            {isEditing &&
                <EditEmployee goBack={goBackToAllEmployeesTable} employeeData={employeeDataToEdit} />
            }

            {isReading &&
                <ReadEmployee goBack={goBackToAllEmployeesTable} employeeData={employeeDataToRead} />
            }
        </>
    );
}