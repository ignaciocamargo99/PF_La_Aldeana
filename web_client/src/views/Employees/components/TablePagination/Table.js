import moment from "moment";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import ReadEmployeeButton from "../ReadEmployee/ReadEmployeeButton";
import DeleteEmployeeButton from "../DeleteEmployeeButton";
import EditEmployeeButton from "../EditEmployee/EditEmployeeButton";

const PORT = require('../../../../config');

const Table = ({ setNameSearch, pageElements, columnsHeaders, handleRead, handleEdit, handleDelete, permissionsAccess }) => {
    return (
        <>
            <div className="formRow title-searcher">
                <h4 className="text-secondary">Empleados activos:</h4>
                <div className="search-input">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default"><FontAwesomeIcon icon={faSearch} /></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Buscar empleado..." onChange={(e) => setNameSearch(e.target.value)} aria-describedby="inputGroup-sizing-default" />
                    </div>
                </div>
            </div>
            {(pageElements && pageElements.length > 0)
                ?
                <div className="table-responsive-md">
                    <table className="table table-control table-hover" >
                        <thead>
                            <tr>
                                {columnsHeaders?.map((element, i) => {
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
                                            // PORT() === ''
                                            //     ?
                                            moment(element.date).format('DD-MM-YYYY')
                                            // :
                                            // moment(element.date).add(1, 'days').format('DD-MM-YYYY')
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
                                            <DeleteEmployeeButton employee={element} index={i}
                                                deleteEmployee={handleDelete}
                                                permissionsAccess={permissionsAccess}
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                :
                <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No existen empleados activos con el nombre ingresado...</h4>
            }

        </>
    )
};

export default Table;
