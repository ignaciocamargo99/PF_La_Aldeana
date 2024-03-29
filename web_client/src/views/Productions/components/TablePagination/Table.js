import CleanFilters from 'common/CleanFilters';
import moment from 'moment';
import React, { useRef } from 'react';
import DeleteProductionButton from '../DeleteProductionButton';
import EditProductionButton from '../EditProduction/EditProductionButton';
import ReadProductionButton from "../ReadProduction/ReadProductionButton";

const PORT = require('../../../../config');

const Table = ({ setDateSearch1, setDateSearch2, pageElements, columnsHeaders, handleRead, handleEdit, handleDelete, permissionsAccess }) => {
    const dateFilter1 = useRef(null);
    const dateFilter2 = useRef(null);

    const onClickFilter = () => {
        dateFilter1.current.value = '';
        dateFilter2.current.value = '';
        setDateSearch1('');
        setDateSearch2('');
    }

    return (
        <>
            <div className="formRow title-searcher">
                <h4 className="text-secondary">Producciones registradas:</h4>
                <div className="search-input">
                    <div className="me-3">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Fecha desde</span>
                            </div>
                            <input id="inputSearchName" className="form-control" type="date" onChange={(e) => setDateSearch1(e.target.value)} ref={dateFilter1} />
                        </div>
                    </div>
                    <div className="me-3">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default">Fecha hasta</span>
                            </div>
                            <input id="inputSearchName" className="form-control" type="date" onChange={(e) => setDateSearch2(e.target.value)} ref={dateFilter2} />
                        </div>
                    </div>
                    <CleanFilters onClick={onClickFilter} />
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
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{
                                            PORT() === ''
                                                ?
                                                moment(element.date_production).format('DD/MM/YYYY')
                                                :
                                                moment(element.date_production).add(1, 'days').format('DD/MM/YYYY')}
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.total_quantity}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <ReadProductionButton production={element} read={handleRead} />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <EditProductionButton production={element} edit={handleEdit} permissionsAccess={permissionsAccess} />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <DeleteProductionButton deleteProduction={handleDelete} production={element} index={i} permissionsAccess={permissionsAccess} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            {pageElements.length === 0 && (
                <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No se encontró registro de producción en la fecha seleccionada...</h4>
            )}

        </>
    )
};

export default Table;
