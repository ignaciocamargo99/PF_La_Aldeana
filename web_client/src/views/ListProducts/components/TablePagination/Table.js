import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import DeleteProductButton from '../DeleteProductButton';
import EditProductButton from '../EditProducts/EditProductButton';
import ReadProductButton from "../ReadProducts/ReadProductButton";

const Table = ({ setNameSearch, pageElements, columnsHeaders, handleRead, handleEdit, handleDelete, permissionsAccess }) => {
    return (
        <>
            <div className="formRow title-searcher">
                <h4 className="text-secondary">Productos disponibles:</h4>
                <div className="search-input">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default"><FontAwesomeIcon icon={faSearch} /></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Buscar producto..." onChange={(e) => setNameSearch(e.target.value)} aria-describedby="inputGroup-sizing-default" />
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
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <ReadProductButton product={element} read={handleRead} />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <EditProductButton product={element} edit={handleEdit} permissionsAccess={permissionsAccess} />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <DeleteProductButton deleteProduct={handleDelete} product={element} index={i} permissionsAccess={permissionsAccess} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                :
                <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No existen productos con el nombre ingresado...</h4>
            }

        </>
    )
};

export default Table;
