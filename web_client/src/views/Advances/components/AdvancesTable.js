import Axios from 'axios';
import React, { useEffect, useState } from "react";
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

const PORT = require('../../../config');

export default function AdvancesTable() {

    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isReading, setIsReading] = useState(false);
    const [advances, setAdvances] = useState([]);
    const [editing, setEditing] = useState({});
    const [reading, setReading] = useState({});

    useEffect(() => {
        Axios.get(PORT() + '/api/advances')
            .then((response) => {
                handlerLoadingSpinner();
                let auxAdvances = response.data;
                auxAdvances.forEach((person)=>{
                    person.fullName = person.last_name;
                    person.fullName += ', ';
                    person.fullName += person.name;
                });
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
        //window.scrollTo(0, 0);
        window.location.replace('/app/advances');
    }
    const returnReadAdvances = () => {
        <div style={{ display: 'none' }}>{document.title = "Adelantos"}</div>
        setIsReading(false);
        //window.scrollTo(0, 0);
        window.location.replace('/app/advances');
    }

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    const handleEdit = () => warningMessage('Atención','Plazo de edición vencido. Solo podrá editar el adelanto antes del pago de la primer cuota.', 'warning');
    const handleDelete = () => warningMessage('Atención','Plazo de cancelación vencido. Solo podrá cancelar el adelanto antes del pago de la primer cuota.', 'warning');

    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage] = useState(10);
    const [filteredElements, setFilteredElements] = useState([]);
    const [listTable, setListTable] = useState([]);
    const [nameSearch, setNameSearch] = useState('');

    useEffect(() => {
        if (advances){
            handlerLoadingSpinner();

            setListTable(advances);
        }
    }, [advances]);

    useEffect(() => {
        if (nameSearch !== "") {
            const filteredElementsList = listTable.filter((elem) => {
                return elem.fullName.toUpperCase().includes(nameSearch.toUpperCase());
            });

            setFilteredElements(filteredElementsList);
        } else {
            setFilteredElements(listTable);
        }
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


    const onClickNewAdvances = () => {
        window.location.replace('/app/registerAdvances');
    }

    return (
        <>
            {isLoadingSpinner && (
                <LoaderSpinner color="primary" loading="Cargando adelantos" />
            )}

            {!isLoadingSpinner && advances && advances.length === 0
                ? 
                <div>
                    <div className="viewTitleBtn">
                        <h1>Adelantos</h1>
                        <button id='editAdvancesButton' onClick={onClickNewAdvances} type="button" className="newBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                    </div>
                    <br/>
                    <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No se encontraron adelantos registrados hasta el momento.</h4>
                </div>
                : (
                <>
                <BeShowed show={!isEditing && !isReading}>
                    <div className="viewTitleBtn">
                        <h1>Adelantos</h1>
                        <button id='editAdvancesButton' onClick={onClickNewAdvances} type="button" className="newBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                    </div>
                    <div className="viewBody">
                        <div className="formRow title-searcher">
                            <h4 className="text-secondary">Adelantos</h4>
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
                                    {currentElements?.map((element, i) => {
                                        return (
                                            <tr key={i}>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.nroDNI}</td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.fullName}</td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{dateBDToString(element.date, 'Es')}</td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.amount}</td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.pay}</td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                    <ReadAdvancesButton advances={element} read={readAdvances} />
                                                </td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                    <BeShowed show={new Date(element.date).getMonth() + 1 > new Date().getMonth() || (new Date(element.date).getDate() > new Date().getDate() && new Date(element.date).getMonth() + 1 === new Date().getMonth())}>
                                                        <EditAdvancesButton advances={element} edit={editAdvances} />
                                                    </BeShowed>
                                                    <BeShowed show={element.pay === 1 || new Date(element.date).getMonth() + 1 < new Date().getMonth() || (new Date(element.date).getDate() <= new Date().getDate() && new Date(element.date).getMonth() + 1 === new Date().getMonth())}>
                                                        <button id='editAdvancesButton' type="button" className="sendDelete" style={{backgroundColor: 'grey'}} onClick={handleEdit}><FontAwesomeIcon icon={faEdit} /></button>
                                                    </BeShowed>
                                                </td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>

                                                    <BeShowed show={new Date(element.date).getMonth() + 1 > new Date().getMonth() || (new Date(element.date).getDate() > new Date().getDate() && new Date(element.date).getMonth() + 1 === new Date().getMonth())}>
                                                        <DeleteAdvancesButton advances={element} index={i} deleteEmployee={deleteAdvances} />
                                                    </BeShowed>
                                                    <BeShowed show={element.pay === 1 || new Date(element.date).getMonth() + 1 < new Date().getMonth() || (new Date(element.date).getDate() <= new Date().getDate() && new Date(element.date).getMonth() + 1 === new Date().getMonth())}>
                                                        <button id='deleteAdvancesButton' type="button" className="sendDelete" style={{backgroundColor: 'grey'}} onClick={handleDelete}><FontAwesomeIcon icon={faMinus} /></button>
                                                    </BeShowed>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <Pagination elementsperpage={elementsPerPage} totalelements={filteredElements.length} paginate={paginate}></Pagination>
                    </div>
                </BeShowed>
                </>
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