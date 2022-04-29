import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';

const Table = ({ setNameSearch, pageElements, columnsHeaders, addBtnClicked }) => {
    return (
        <>
            <div className="formRow title-searcher">
                <h4 className="text-secondary">Insumos disponibles:</h4>
                <div className="search-input">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default"><FontAwesomeIcon icon={faSearch} /></span>
                        </div>
                        <input type="text" className="form-control" placeholder="Buscar insumo..." onChange={(e) => setNameSearch(e.target.value)} aria-describedby="inputGroup-sizing-default" />
                    </div>
                </div>
            </div>

            {(pageElements && pageElements?.length > 0)
                ?
                <>
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
                                            <td style={{ textAlign: 'center' }}>
                                                <button type="button" className="btnAdd btn btn-info" onClick={() => addBtnClicked(element.id_supply)}><FontAwesomeIcon icon={faPlus} /></button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
                :
                <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No existen insumos con el nombre ingresado...</h4>
            }
        </>
    )
};

export default Table;
