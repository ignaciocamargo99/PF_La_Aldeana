import React, { useRef, useEffect } from 'react';
import moment from 'moment';
import ReadAssistanceButton from "../ReadAssistanceButton";
import EditAssistanceButton from '../EditAssistanceEmployee/EditAssistanceButton';
import DeleteAssistanceButton from '../DeleteAssistanceButton';

const PORT = require('../../../../config');

export default function Table({ setDateSearch1, setDateSearch2, pageElements, columnsHeaders, handleRead, handleEdit, handleDelete, permissionsAccess }) {
    const dateFilter1 = useRef(null);
    const dateFilter2 = useRef(null);
    let dateNow = new Date().toLocaleDateString();

    const onClickFilter = () => {
        dateFilter1.current.value = '';
        dateFilter2.current.value = '';
        setDateSearch1('');
        setDateSearch2('');
    }

    return (
        <>
            <div className="formRow title-searcher">
                {dateFilter1.current && dateFilter1.current.value !== '' && dateFilter2.current && dateFilter2.current.value !== ''
                    ?
                    <h4 className="text-secondary">Asistencias registradas desde el {PORT() === ''
                        ?
                        moment(dateFilter1.current.value).format('DD/MM/YYYY')
                        :
                        moment(dateFilter1.current.value).add(1, 'days').format('DD/MM/YYYY')} hasta el {PORT() === ''
                            ?
                            moment(dateFilter2.current.value).format('DD/MM/YYYY')
                            :
                            moment(dateFilter2.current.value).add(1, 'days').format('DD/MM/YYYY')}
                    </h4>
                    :
                    dateFilter1.current && dateFilter1.current.value !== ''
                        ?
                        <h4 className="text-secondary">Asistencias registradas desde la fecha {PORT() === ''
                            ?
                            moment(dateFilter1.current.value).format('DD/MM/YYYY')
                            :
                            moment(dateFilter1.current.value).add(1, 'days').format('DD/MM/YYYY')}
                        </h4>
                        :
                        dateFilter2.current && dateFilter2.current.value !== ''
                            ?
                            <h4 className="text-secondary">Asistencias registradas hasta la fecha {PORT() === ''
                                ?
                                moment(dateFilter2.current.value).format('DD/MM/YYYY')
                                :
                                moment(dateFilter2.current.value).add(1, 'days').format('DD/MM/YYYY')}
                            </h4>
                            :
                            <h4 className="text-secondary">Asistencias registradas en la fecha {dateNow}</h4>
                }
                <div className="search-input">
                    <label className="lblDate">Fecha desde</label>
                    <input id="inputSearchName" type="date" onChange={(e) => setDateSearch1(e.target.value)} ref={dateFilter1} />
                    <label className="lblDate">Fecha hasta</label>
                    <input id="inputSearchName" type="date" onChange={(e) => setDateSearch2(e.target.value)} ref={dateFilter2} />
                    <button id='filterProductionButton' type="button" onClick={onClickFilter} className="filterBtn">Limpiar filtros</button>
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
                                                moment(element.date_entry).format('DD-MM-YYYY')
                                                :
                                                moment(element.date_entry).add(1, 'days').format('DD-MM-YYYY')}
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.employee}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.last_name}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            {PORT() !== ''
                                                ? moment(element.date_entry).add(3, 'hours').format('HH:mm')
                                                : moment(element.date_entry).format('HH:mm')
                                            }
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            {(element.date_egress)
                                                ? (PORT() !== ''
                                                    ? moment(element.date_egress).add(3, 'hours').format('HH:mm')
                                                    : moment(element.date_egress).format('HH:mm'))
                                                : '-'}
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <ReadAssistanceButton assistance={element} read={handleRead} />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <EditAssistanceButton assistance={element} edit={handleEdit} permissionsAccess={permissionsAccess} />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <DeleteAssistanceButton assistance={element} index={i} deleteAssistance={handleDelete} permissionsAccess={permissionsAccess} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            )}
            {pageElements.length === 0 && (
                <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No se encontraron asistencias registradas en la fecha seleccionada...</h4>
            )}
        </>
    );
}