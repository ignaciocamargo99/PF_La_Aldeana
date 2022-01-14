import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import DeleteProductButton from '../DeleteProductButton';
import EditProductButton from '../EditProductButton';
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Table = ({ setNameSearch, pageElements, columnsHeaders, handleEdit, handleDelete }) => {
    return (
        <>
            <div className="formRow title-searcher">
                <h4 className="text-secondary">Productos disponibles:</h4>
                <div className="search-input">
                    <FontAwesomeIcon icon={faSearch} />
                    <input id="inputSearchName" type="text" placeholder="Buscar..." onChange={(e) => setNameSearch(e.target.value)}></input>
                </div>
            </div>
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
                                        <button id='readProductButton' type="button" className="sendEdit" ><FontAwesomeIcon icon={faEye} /></button>
                                    </td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        <EditProductButton product={element} edit={handleEdit} />
                                    </td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        <DeleteProductButton deleteProduct={handleDelete} product={element} index={i} />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
};

export default Table;
