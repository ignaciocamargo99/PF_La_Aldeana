import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import DeleteUserButton from '../DeleteUserButton';
import EditUserButton from '../EditUsers/EditUserButton';
import ReadUserButton from "../ReadUsers/ReadUserButton";

const Table = ({ setNameSearch, pageElements, columnsHeaders, handleRead, handleEdit, handleDelete, permissionsAccess }) => {

    return (
        <>
            <div className="formRow title-searcher">
                <h4 className="text-secondary">Usuarios activos:</h4>
                <div className="search-input">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default"><FontAwesomeIcon icon={faSearch} /></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Buscar usuario..." onChange={(e) => setNameSearch(e.target.value)} aria-describedby="inputGroup-sizing-default" />
                    </div>
                </div>
            </div>
            {pageElements.length > 0 && (
                <div className="table-responsive-md">
                    <table className="table table-control table-hover" >
                        <thead>
                            <tr>
                                {columnsHeaders?.map((element, i) => {
                                    return (
                                        <th key={i} scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: element.width }}>{element.name}</th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {pageElements?.map((element, i) => {
                                return (
                                    <tr key={i}>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.nick_user}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.first_name}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.last_name}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <ReadUserButton data={element} read={handleRead} />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <EditUserButton data={element} edit={handleEdit} permissionsAccess={permissionsAccess} />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <DeleteUserButton data={element} deleteUser={handleDelete} index={i} permissionsAccess={permissionsAccess} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            {pageElements.length === 0 && (
                <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No se encontró un usuario con el nombre ingresado...</h4>
            )}
        </>
    )
};

export default Table;
