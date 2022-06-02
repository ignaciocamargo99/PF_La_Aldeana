import Axios from 'axios';
import React, { useEffect, useState, useRef } from "react";
import BeShowed from "../../../common/BeShowed";
import LoaderSpinner from "../../../common/LoaderSpinner";
import DeleteAdvancesButton from './DeleteAdvancesButton';
import backupAdvances from './EditAdvances/backupAdvances';
import EditAdvances from "./EditAdvances/EditAdvances";
import EditAdvancesButton from "./EditAdvances/EditAdvancesButton";
import ReadAdvances from './ReadAdvances/ReadAdvances';
import ReadAdvancesButton from "./ReadAdvances/ReadAdvancesButton";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import warningMessage from "../../../utils/WarningMessages/warningMessage";
import Pagination from '../../../common/TablePagination/Pagination';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { dateBDToString } from "../../../utils/ConverterDate/dateBDToString";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FaFile } from 'react-icons/fa';
import Viewer from 'views/Reports/ProductSales/components/PDFModalViewer';
import MyDocument from './PDFAdvancesReport';
import dateText from 'utils/DateFormat/dateText';
import { calculateDiferenceDays } from "../../../utils/DiferenceDate/calculateDiferenceDays";

const PORT = require('../../../config');

export default function AdvancesTable(props) {

    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isReading, setIsReading] = useState(false);
    const [advances, setAdvances] = useState([]);
    const [editing, setEditing] = useState({});
    const [reading, setReading] = useState({});
    let permissionsAccess = props.permissionsAccess;
    const [MyDoc, setMyDoc] = useState('');
    const [showPdf, setShowPDF] = useState(false);

    const dateInitRef = useRef();
    const dateFinishRef = useRef();
    const [dateInit, setDateInit] = useState(null);
    const [dateFinish, setDateFinish] = useState(null);

    useEffect(() => {
        Axios.get(PORT() + '/api/advances')
            .then((response) => {
                let auxAdvances = response.data;
                auxAdvances.forEach((person) => {
                    person.fullName = person.last_name;
                    person.fullName += ', ';
                    person.fullName += person.name;
                });
                handlerLoadingSpinner();
                setAdvances(auxAdvances);
            })
            .catch((error) => console.log(error));
    }, []);

    const deleteAdvances = (i) => {
        let aux = [];
        advances?.forEach((e, j) => {
            if (j !== i) {
                aux[j] = e;
            }
        });
        setAdvances(aux);
    }

    const editAdvances = (advances) => {
        let aux = backupAdvances(advances);
        setEditing(aux);
        setIsEditing(true);
    }

    const readAdvances = (advances) => {
        let aux = advances;
        setReading(aux);
        setIsReading(true);
    }

    const cancelEditAdvances = () => {
        <div style={{ display: 'none' }}>{document.title = "Adelantos"}</div>
        setIsEditing(false);
        window.scrollTo(0, 0);
        //window.location.replace('/app/advances');
    }
    const returnReadAdvances = () => {
        <div style={{ display: 'none' }}>{document.title = "Adelantos"}</div>
        setIsReading(false);
        window.scrollTo(0, 0);
        //window.location.replace('/app/advances');
    }

    const handleEdit = () => warningMessage('Atención', 'Plazo de edición vencido. Solo podrá editar el adelanto antes del pago de la primer cuota.', 'warning');
    const handleDelete = () => warningMessage('Atención', 'Plazo de cancelación vencido. Solo podrá cancelar el adelanto antes del pago de la primer cuota.', 'warning');

    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage] = useState(10);
    const [filteredElements, setFilteredElements] = useState([]);
    const [listTable, setListTable] = useState([]);
    const [nameSearch, setNameSearch] = useState('');

    const showRenderPDF = () => setShowPDF(true);

    const cancel = () => setShowPDF(false);

    useEffect(() => {
        if (advances) {
            handlerLoadingSpinner();
            setListTable(advances);
        }
    }, [advances]);

    useEffect(() => {
        let auxAdvances = advances;
        if (dateInit) auxAdvances = auxAdvances.filter((elem) => {
            return elem.date >= dateInit;
        });
        if (dateFinish) auxAdvances = auxAdvances.filter((elem) => {
            return elem.date <= dateFinish;
        });
        setListTable(auxAdvances);
    }, [dateFinish, dateInit]);

    useEffect(() => {
        if (nameSearch !== "") {
            const filteredElementsList = listTable.filter((elem) => {
                return elem.fullName.toUpperCase().includes(nameSearch.toUpperCase());
            });
            setFilteredElements(filteredElementsList);
        }
        else setFilteredElements(listTable);
    }, [nameSearch, listTable]);

    const columnsHeaders = [
        {
            name: 'DNI',
            width: '10%'
        },
        {
            name: 'Empleado',
            width: '20%'
        },
        {
            name: 'Fecha de adelanto',
            width: '10%'
        },
        {
            name: 'Monto total',
            width: '15%'
        },
        {
            name: 'Pagado hasta la fecha',
            width: '15%'
        },
        {
            name: 'Ver',
            width: '10%'
        },
        {
            name: 'Editar',
            width: '10%'
        },
        {
            name: 'Cancelar',
            width: '10%'
        }
    ];

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Get page elements
    const indexOfLastElement = currentPage * elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - elementsPerPage;
    const currentElements = filteredElements.slice(indexOfFirstElement, indexOfLastElement);

    const onClickNewAdvances = () => window.location.replace('/app/registerAdvances');

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    useEffect(()=>{
        setMyDoc(<MyDocument title={(dateInit? (dateFinish? "(":'') +dateText(dateInit, true, true):' ')+ (dateFinish&&dateInit?" a ":'')  + (dateFinish?dateText(dateFinish, true, true):' ')+(dateFinish&&dateInit?")":'')} advances={filteredElements}  description={(nameSearch.length === 0 ? '' : 'Filtrado por nombres que coincidan con: "' + nameSearch + '"')} />);
    }, [dateInit, dateFinish, filteredElements, nameSearch])

    const onChangeDateInit = (e) => {
        if (dateInitRef.current.value !== "") {
            setDateInit(dateInitRef.current.value);
            dateFinishRef.current.min = e.target.value;
            if (dateFinishRef.current.value !== "") {
                onChangeDates();
            }
        } 
    }

    const onChangeDateFinish = (e) => {
        if (dateFinishRef.current.value !== "") {
            setDateFinish(dateFinishRef.current.value);

            if (dateInitRef.current.value !== "") {
                onChangeDates();
            }
        } 
    }
    const onChangeDates = () => {
        let aux = calculateDiferenceDays(dateInitRef.current.value, dateFinishRef.current.value);
        aux++;
        if (aux <= 0) {
            dateFinishRef.current.value = dateInitRef.current.value;
            aux = 1;
        }
    }

    return (
        <>
            <div className="viewTitleBtn">
                <h1>Adelantos</h1>
                <button id='printAdvancesButton' onClick={showRenderPDF} type="button" className="btn btn-light printBtn"><FaFile /> Imprimir informe</button>
                <BeShowed show={permissionsAccess === 2 || permissionsAccess === 3} >
                    <button id='editAdvancesButton' onClick={onClickNewAdvances} type="button" className="btn btn-light newBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                </BeShowed>
                <BeShowed show={permissionsAccess === 1} >
                    <button id='editAdvancesButton' disabled type="button" className="disabledNewBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                </BeShowed>
            </div>
            <div className="formRow">
                <label>Seleccione el rango de fechas sobre el que desea generar el informe.</label>
            </div>
            <div className="formRow d-flex justify-content-between">
                <label htmlFor="dateFrom" className="col-sm-2">Fecha desde*</label>
                <div className="col-sm-3" style={{ textAlign: 'right' }} >
                    <input type="date" style={{ maxWidth: "9em", marginRight: '1em' }} id='dateFrom' ref={dateInitRef} onChange={(e) => { onChangeDateInit(e) }}></input>
                </div>
                <label htmlFor="dateTo" className="col-sm-2">Fecha hasta*</label>
                <div className="col-sm-3" style={{ textAlign: 'right' }} >
                    <input type="date" style={{ maxWidth: "9em", marginRight: '1em' }} id='dateTo' ref={dateFinishRef}  onChange={(e) => { onChangeDateFinish(e) }}></input>
                </div>
            </div>
            {isLoadingSpinner ?
                <LoaderSpinner color="primary" loading="Cargando..." />
                : advances.length === 0
                    ?
                    <div>
                        <br />
                        <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No se encontraron adelantos registrados hasta el momento.</h4>
                    </div>
                    : (
                        <BeShowed show={!isEditing && !isReading}>
                            <div className="viewBody">
                                <div className="formRow title-searcher">
                                    <h4 className="text-secondary">Adelantos:</h4>
                                    <div className="search-input">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="inputGroup-sizing-default"><FontAwesomeIcon icon={faSearch} /></span>
                                            </div>
                                            <input id="inputSearchName" type="text" className="form-control" placeholder="Buscar por empleado..." onChange={(e) => setNameSearch(e.target.value)} aria-describedby="inputGroup-sizing-default" />
                                        </div>
                                    </div>
                                </div>
                                {currentElements.length > 0 && (
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
                                                {currentElements?.map((element, i) => {
                                                    return (
                                                        <tr key={i}>
                                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.nroDNI}</td>
                                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.fullName}</td>
                                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{dateBDToString(element.date, 'Es')}</td>
                                                            <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>{element.amount}</td>
                                                            <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>{element.pay}</td>
                                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                                <ReadAdvancesButton advances={element} read={readAdvances} />
                                                            </td>
                                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                                <BeShowed show={permissionsAccess === 3}>
                                                                    <BeShowed show={new Date(element.date).getMonth() + 1 > new Date().getMonth() || (new Date(element.date).getDate() > new Date().getDate() && new Date(element.date).getMonth() + 1 === new Date().getMonth())}>
                                                                        <EditAdvancesButton advances={element} edit={editAdvances} permissionsAccess />
                                                                    </BeShowed>
                                                                    <BeShowed show={element.pay === 1 || new Date(element.date).getMonth() + 1 < new Date().getMonth() || (new Date(element.date).getDate() <= new Date().getDate() && new Date(element.date).getMonth() + 1 === new Date().getMonth())}>
                                                                        <button id='editAdvancesButton' type="button" className="disabledSendBtn" onClick={handleEdit}><FontAwesomeIcon icon={faEdit} /></button>
                                                                    </BeShowed>
                                                                </BeShowed>
                                                                <BeShowed show={permissionsAccess !== 3}>
                                                                    <button id='editAdvancesButton' type="button" className="disabledSendBtn" disabled><FontAwesomeIcon icon={faEdit} /></button>
                                                                </BeShowed>

                                                            </td>
                                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                                <BeShowed show={permissionsAccess === 3}>
                                                                    <BeShowed show={new Date(element.date).getMonth() + 1 > new Date().getMonth() || (new Date(element.date).getDate() > new Date().getDate() && new Date(element.date).getMonth() + 1 === new Date().getMonth())}>
                                                                        <DeleteAdvancesButton advances={element} index={i} deleteEmployee={deleteAdvances} />
                                                                    </BeShowed>
                                                                    <BeShowed show={element.pay === 1 || new Date(element.date).getMonth() + 1 < new Date().getMonth() || (new Date(element.date).getDate() <= new Date().getDate() && new Date(element.date).getMonth() + 1 === new Date().getMonth())}>
                                                                        <button id='deleteAdvancesButton' type="button" className="disabledSendBtn" onClick={handleDelete}><FontAwesomeIcon icon={faMinus} /></button>
                                                                    </BeShowed>
                                                                </BeShowed>
                                                                <BeShowed show={permissionsAccess !== 3}>
                                                                    <button id='deleteAdvancesButton' type="button" className="disabledSendBtn" disabled><FontAwesomeIcon icon={faMinus} /></button>
                                                                </BeShowed>

                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                {currentElements.length === 0 && (
                                    <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No se encontró un adelanto correspondiente al empleado ingresado...</h4>
                                )}
                                <Pagination elementsperpage={elementsPerPage} totalelements={filteredElements.length} paginate={paginate}></Pagination>
                            </div>
                            <Viewer MyDoc={MyDoc} showPdf={showPdf} cancel={cancel} title={(dateInit?(dateFinish? "(":'')  +dateText(dateInit, true, true):' ')+ (dateFinish&&dateInit?" a ":'')  + (dateFinish?dateText(dateFinish, true, true):' ')+(dateFinish&&dateInit?")":'')} reportOf='adelantos' description={(nameSearch.length === 0 ? '' : 'Filtrado por nombres que coincidan con: "' + nameSearch + '"')} ></Viewer>
                        </BeShowed>
                    )}
            <BeShowed show={isEditing}>
                <EditAdvances cancel={cancelEditAdvances} advances={editing} />
            </BeShowed>
            <BeShowed show={isReading}>
                <ReadAdvances return={returnReadAdvances} advances={reading} />
            </BeShowed>
        </>
    );
}