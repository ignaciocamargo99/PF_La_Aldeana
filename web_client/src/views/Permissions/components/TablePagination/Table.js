import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState, useEffect } from 'react';
// import DeleteProductButton from '../DeleteProductButton';
// import EditProductButton from '../EditProducts/EditProductButton';
// import ReadProductButton from "../ReadProducts/ReadProductButton";

const Table = ({ pageElements, columnsHeaders, handleRead }) => {


    return (
        <>
            <div className="formRow">
                <h4 className="text-secondary">Permisos para empleados:</h4>
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
                                            <input type="checkbox" id="enabledDisabledCheckBox" />
                                            {/* <ReadProductButton product={element} read={handleRead} /> */}
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <input type="checkbox" />
                                            {/* <EditProductButton product={element} edit={handleEdit} /> */}
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <input type="checkbox" />
                                            {/* <DeleteProductButton deleteProduct={handleDelete} product={element} index={i} /> */}
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <input type="checkbox" />
                                            {/* <DeleteProductButton deleteProduct={handleDelete} product={element} index={i} /> */}
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <input type="checkbox" />
                                            {/* <DeleteProductButton deleteProduct={handleDelete} product={element} index={i} /> */}
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