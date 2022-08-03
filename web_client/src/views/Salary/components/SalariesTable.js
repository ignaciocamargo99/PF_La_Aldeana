import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import '../../../assets/Buttons.css';
import { useEffect, useState } from "react";
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import BeShowed from "common/BeShowed";
import Pagination from 'common/TablePagination/Pagination';
import {filterEmployeesByEmploymentDate} from "./filterEmployeesByEmploymentDate";
import Axios from "axios";
import { getSalariesTableColumunsHeaders } from "./getSalariesTableColumunsHeaders";
import { CONFIRM, NON_GENEATE, ON_HOLD } from "./filtersConstants";

const PORT = require('../../../config');

export default function SalariesTable({
    allSalaries,
    permissionsAccess,
    reloadList,
    salaries,
    selectedFilter,
    selectedMonth,
    setActionSalary,
    showSpinner, 
}) {

    const [employees, setEmployees] = useState([]);
    const [nonConfirmLoader, setNonConfirmLoader] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage] = useState(10);
    const [filteredElements, setFilteredElements] = useState([]);
    const [listTable, setListTable] = useState([]);
    const [nameSearch, setNameSearch] = useState('');

    useEffect(() => {
        Axios.get(PORT() + '/api/employees')
            .then((response) => {
                let aux = filterEmployeesByEmploymentDate(response.data, selectedMonth);
                let display = [];
                aux?.forEach((person) => {
                    person.fullName = person.last_name;
                    person.fullName += ', ';
                    person.fullName += person.name;
                    if (allSalaries?.length > 1) {
                        const exist = allSalaries.filter((elem) => {
                            return elem.dni === person.dni;
                        });
                        if (exist.length < 1) display.push(person);
                    } else display.push(person);
                });
                setEmployees(display);
                setNonConfirmLoader(true);
            })
            .catch((error) => console.log(error));
    }, [reloadList]);

    useEffect(() => {
        if (salaries.length > 0) {
            if (salaries.length !== listTable.length) setCurrentPage(1);
            setListTable(salaries);
        } else if (employees.length > 0) {
            if (employees.length !== listTable.length) setCurrentPage(1);
            setListTable(employees);
        }
    }, [salaries, employees]);

    useEffect(() => {
        if (nameSearch !== "") {
            const filteredElementsList = listTable.filter(salary => {
                if (selectedFilter === CONFIRM && salary.id_state == 2) return true;
                else if (selectedFilter === ON_HOLD && salary.id_state == 1) return true;
                else if (selectedFilter === NON_GENEATE) return true;
            }).filter((elem) => {
                return elem.fullName.toUpperCase().includes(nameSearch.toUpperCase());
            });

            setFilteredElements(filteredElementsList);
        } else {
            setFilteredElements(listTable.filter(salary => {
                if (selectedFilter === CONFIRM && salary.id_state == 2) return true;
                else if (selectedFilter === ON_HOLD && salary.id_state == 1) return true;
                else if (selectedFilter === NON_GENEATE) return true;
            }));
        }
    }, [nameSearch, listTable, selectedFilter]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Get page elements
    const indexOfLastElement = currentPage * elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - elementsPerPage;
    const currentElements = filteredElements.slice(indexOfFirstElement, indexOfLastElement);

    return (
        <>
            <BeShowed show={salaries.length !== 0}>
                <div className="formRow title-searcher">
                    <h4 className="text-secondary">Salarios:</h4>
                    <div className="search-input">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default"><FontAwesomeIcon icon={faSearch} /></span>
                            </div>
                            <input type="text" className="form-control" placeholder="Buscar por empleado..." onChange={(e) => setNameSearch(e.target.value)} aria-describedby="inputGroup-sizing-default" />
                        </div>
                    </div>
                </div>
                <div className="table-responsive-md">
                    <table className="table table-control table-hover" >
                        <thead>
                            <tr>
                                {getSalariesTableColumunsHeaders(true, true).map((element, i) => {
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
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.dni}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.fullName}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name_emp_relationship}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.total}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <BeShowed show={permissionsAccess !== 3} >
                                                <button className="disabledSendBtn" disabled >
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                            </BeShowed>
                                            <BeShowed show={permissionsAccess === 3} >
                                                <BeShowed show={selectedFilter === CONFIRM && ((new Date()).getTime() - (new Date(selectedMonth)).getTime()) / 1000 / 60 / 60 / 24 > 15}>
                                                    <button className="disabledSendBtn" disabled >
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                </BeShowed>
                                                <BeShowed show={selectedFilter !== CONFIRM || (selectedFilter === CONFIRM && ((new Date()).getTime() - (new Date(selectedMonth)).getTime()) / 1000 / 60 / 60 / 24 <= 15)}>
                                                    <button className="btn btn-info btnEdit" onClick={() => { setActionSalary('Editar', element) }}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                </BeShowed>
                                            </BeShowed>
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <button className="btn btn-warning btnRead" onClick={() => { setActionSalary('Ver', element) }}>
                                                <FontAwesomeIcon icon={faEye} />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <Pagination elementsperpage={elementsPerPage} totalelements={filteredElements.length} paginate={paginate}></Pagination>
            </BeShowed>
            <BeShowed show={!showSpinner && selectedFilter === NON_GENEATE}>
                <div className="formRow title-searcher">
                    <h4 className="text-secondary">Salarios:</h4>
                    <div className="search-input">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default"><FontAwesomeIcon icon={faSearch} /></span>
                            </div>
                            <input type="text" className="form-control" placeholder="Buscar por empleado..." onChange={(e) => setNameSearch(e.target.value)} aria-describedby="inputGroup-sizing-default" />
                        </div>
                    </div>
                </div>
                <div className="table-responsive-md">
                    <table className="table table-control table-hover" >
                        <thead>
                            <tr>
                                {getSalariesTableColumunsHeaders().map((element, i) => {
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
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.dni}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.fullName}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name_emp_relationship}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <Pagination elementsperpage={elementsPerPage} totalelements={filteredElements.length} paginate={paginate}></Pagination>
            </BeShowed>
            <BeShowed show={!showSpinner && currentElements.length === 0 && nonConfirmLoader}>
                <br />
                <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No se encontraron salarios que coincidan con las condiciones de busqueda hasta el momento.</h4>
            </BeShowed>
        </>
    );
}