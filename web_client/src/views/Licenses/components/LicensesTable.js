import { faEdit, faEye, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import { useState, useEffect } from "react";
import { defaultQuestionSweetAlert2 } from "utils/questionMessages/sweetAlert2Questions";
import '../../../assets/Buttons.css';
import BeShowed from "../../../common/BeShowed";
import BodyTable from "../../../common/Table/BodyTable";
import HeaderTable from "../../../common/Table/HeaderTable";
import Table from '../../../common/Table/Table';
import { dateBDToString } from '../../../utils/ConverterDate/dateBDToString';
import warningMessage from '../../../utils/WarningMessages/warningMessage';
import Pagination from '../../../common/TablePagination/Pagination';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const PORT = require('../../../config');

export default function LicensesTable(props) {

    const [date] = useState(new Date().setHours(0, 0, 0, 0))
    let permissionsAccess = props.permissionsAccess;

    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage] = useState(15);
    const [filteredElements, setFilteredElements] = useState([]);
    const [listTable, setListTable] = useState([]);
    const [nameSearch, setNameSearch] = useState('');

    useEffect(() => {
        if (props.licenses.length > 0) {

            setListTable(props.licenses);
        }
    }, [props.licenses]);

    useEffect(() => {
        props.setNameSearch(nameSearch);
        if (nameSearch !== "") {
            const filteredElementsList = listTable.filter((elem) => {
                return elem.fullName.toUpperCase().includes(nameSearch.toUpperCase());
            });

            setFilteredElements(filteredElementsList);
            props.setFilteredElements(filteredElementsList);
        } else {
            setFilteredElements(listTable);
            props.setFilteredElements(listTable);
        }
    }, [nameSearch, listTable]);

    const columnsHeaders = [
        {
            name: 'Inicio',
            width: '15%'
        },
        {
            name: 'Fin',
            width: '15%'
        },
        {
            name: 'Empleado',
            width: '20%'
        },
        {
            name: 'Motivo',
            width: '20%'
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
            name: 'Eliminar',
            width: '10%'
        }
    ];

    const deleteLicense = (idLicense) => {
        Axios.delete(`${PORT()}/api/licenses/${idLicense}`)
            .then((response) => {
                if (response.data.Ok) {
                    warningMessage('Atención', 'Licencia cancelada exitosamente', 'success');
                    props.setReloadList(!props.reloadList);
                }
                else warningMessage("Error", `${response.data.Message}`, "error")
            })
            .then(() => {
            })
            .catch((error) => console.error(error))
    }

    const confirmDeleteLicense = async (idLicense) => {
        const warningTitle = `¿Seguro que desea cancelar la licencia seleccionada?`;
        const warningText = 'La licencia ya no será visible para el personal de la empresa.';
        const deletionConfirmed = (await defaultQuestionSweetAlert2(warningTitle, warningText)).isConfirmed;
        if (deletionConfirmed) deleteLicense(idLicense);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Get page elements
    const indexOfLastElement = currentPage * elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - elementsPerPage;
    const currentElements = filteredElements.slice(indexOfFirstElement, indexOfLastElement);

    return (
        <>
            <BeShowed show={props.licenses.length > 0}>
                <div className="formRow title-searcher">
                    <h4 className="text-secondary">Licencias:</h4>
                    <div className="search-input">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default"><FontAwesomeIcon icon={faSearch} /></span>
                            </div>
                            <input id="inputSearchName" type="text" className="form-control" placeholder="Buscar por empleado..." onChange={(e) => setNameSearch(e.target.value)} aria-describedby="inputGroup-sizing-default" />
                        </div>
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
                        {currentElements?.map((license, i) => {
                            if (
                                (props.filter === "All") ||
                                (props.filter === "Finish" && (new Date(dateBDToString(license.date_finish, 'En')).getTime() < date)) ||
                                (props.filter === "Current" && (new Date(dateBDToString(license.date_init, 'En')).getTime() <= date) && (new Date(dateBDToString(license.date_finish, 'En')).getTime() >= date)) ||
                                (props.filter === "OnComing" && (new Date(dateBDToString(license.date_init, 'En')).getTime() > date))
                            ) {
                                return (
                                    <tbody key={i}>
                                        <tr>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{dateBDToString(license.date_init, 'Es')}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{dateBDToString(license.date_finish, 'Es')}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{license.fullName}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{license.reason}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                <button className="btn btn-warning btnRead" onClick={() => { props.setActionLicense('Ver', license) }}>
                                                    <FontAwesomeIcon icon={faEye} />
                                                </button>
                                            </td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                <BeShowed show={permissionsAccess === 3} >
                                                    <button className="btn btn-info btnEdit" onClick={() => { props.setActionLicense('Editar', license) }} style={(new Date(dateBDToString(license.date_finish, 'En')).getTime() < date) ? { backgroundColor: 'grey', boxShadow: '0px 4px 4px rgba(180, 208, 232, 0.25)' } : null}
                                                        disabled={(new Date(dateBDToString(license.date_finish, 'En')).getTime() < date)}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                </BeShowed>
                                                <BeShowed show={permissionsAccess !== 3} >
                                                    <button className="disabledSendBtn" disabled><FontAwesomeIcon icon={faEdit} /></button>
                                                </BeShowed>

                                            </td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                <BeShowed show={permissionsAccess === 3}>
                                                    <button className="btn btn-danger btnDelete" onClick={() => { confirmDeleteLicense(license.id_license) }} style={(new Date(dateBDToString(license.date_finish, 'En')).getTime() < date) ? { backgroundColor: 'grey', boxShadow: '0px 4px 4px rgba(180, 208, 232, 0.25)' } : null}
                                                        disabled={(new Date(dateBDToString(license.date_finish, 'En')).getTime() < date)}>
                                                        <FontAwesomeIcon icon={faMinus} />
                                                    </button>
                                                </BeShowed>
                                                <BeShowed show={permissionsAccess !== 3}>
                                                    <button className="disabledSendBtn" disabled><FontAwesomeIcon icon={faMinus} /></button>
                                                </BeShowed>

                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            }
                        })}
                    </table>
                </div>
                <Pagination elementsperpage={elementsPerPage} totalelements={filteredElements.length} paginate={paginate}></Pagination>
            </BeShowed>
            <BeShowed show={!props.showSpinner && props.licenses.length === 0}>
                <br />
                <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No se encontraron licencias registradas hasta el momento.</h4>
            </BeShowed>
        </>
    );
}