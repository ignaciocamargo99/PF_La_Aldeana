import Axios from "axios";
import DeleteButton from "common/Table/DeleteButton";
import moment from "moment";
import React from 'react';
import displayError from 'utils/ErrorMessages/errorMessage';
import displaySuccess from 'utils/SuccessMessages/sucessSweetAlert2';
import EditEmployeeButton from "../EditEmployee/EditEmployeeButton";
import ReadEmployeeButton from "../ReadEmployee/ReadEmployeeButton";
import { employeesTableColumnHeaders } from './getEmployeesTableColumnHeaders';

const PORT = require('../../../../config');

const EmployeesRealTable = ({ pageElements, handleRead, handleEdit, permissionsAccess }) => {

    const thereAreEmployeesToShow = pageElements && pageElements.length > 0;

    const deleteEmployee = ({ name, dni }) => {
        Axios.delete(PORT() + `/api/employees/${dni}`)
            .then(() => {
                displaySuccess(`'${name}' dado de baja exitosamente.`).then(() => {
                    window.location.reload();
                })
            })
            .catch((error) => {
                console.log(error);
                displayError();
            });
    }

    return (
        <>
            {(!thereAreEmployeesToShow) && (
                <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No existen empleados activos con el nombre ingresado...</h4>
            )}

            {(thereAreEmployeesToShow) && (
                <div className="table-responsive-md">
                    <table className="table table-control table-hover" >
                        <thead>
                            <tr>
                                {employeesTableColumnHeaders?.map((element, i) => {
                                    return (
                                        <th key={i} scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: element.width }}>
                                            {element.name}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {pageElements?.map((element, i) => {
                                return (
                                    <tr key={i}>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.dni}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.last_name}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{
                                            moment(element.date).format('DD-MM-YYYY')
                                        }</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <ReadEmployeeButton
                                                employeeData={element}
                                                handleReadEmpoyeeClicked={handleRead}
                                            />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <EditEmployeeButton
                                                employeeData={element}
                                                handleEditEmpoyeeClicked={handleEdit}
                                                permissionsAccess={permissionsAccess}
                                            />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <DeleteButton
                                                disable={+permissionsAccess === 3}
                                                onConfirm={() => { deleteEmployee(element) }}
                                                warningTitle={`¿Seguro que desea eliminar a ${element.name}?`}
                                                warningText={'El empleado ya no será visible para el personal de la empresa.'}
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
};

export default EmployeesRealTable;
