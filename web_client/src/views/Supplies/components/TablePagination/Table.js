import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
// import DeleteProductTypeButton from "../DeleteProductTypeButton";
// import DeleteUserButton from '../DeleteProductTypeButton';
// import EditProductTypeButton from '../EditProductTypes/EditProductTypeButton';
import ReadSupplyButton from "../ReadSupplies/ReadSupplyButton";

const Table = ({ setNameSearch, pageElements, columnsHeaders, handleRead, handleEdit, handleDelete, permissionsAccess }) => {

    return (
        <>
            <div className="formRow title-searcher">
                <h4 className="text-secondary">Tipos de producto disponibles:</h4>
                <div className="search-input">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default"><FontAwesomeIcon icon={faSearch} /></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Buscar por nombre..." onChange={(e) => setNameSearch(e.target.value)} aria-describedby="inputGroup-sizing-default" />
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
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{!element.description ? '--' : element.description}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{!element.price_wholesale ? '--' : element.price_wholesale}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{!element.price_retail ? '--' : element.price_retail}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <ReadSupplyButton data={element} read={handleRead} />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            {/* <EditProductTypeButton data={element} edit={handleEdit} permissionsAccess={permissionsAccess} /> */}
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            {/* <DeleteProductTypeButton data={element} delete={handleDelete} index={i} permissionsAccess={permissionsAccess} /> */}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            {pageElements.length === 0 && (
                <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No se encontró un insumo con el nombre ingresado...</h4>
            )}
        </>
    )
};

export default Table;