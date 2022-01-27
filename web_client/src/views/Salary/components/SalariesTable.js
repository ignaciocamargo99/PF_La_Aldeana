import BeShowed from "../../../common/BeShowed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import '../../../assets/Buttons.css';
import { useEffect, useState } from "react";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Pagination from '../../../common/TablePagination/Pagination';
import Axios from "axios";

const PORT = require('../../../config');

export default function SalariesTable(props) {

    const [employees, setEmployees] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage] = useState(10);
    const [filteredElements, setFilteredElements] = useState([]);
    const [listTable, setListTable] = useState([]);
    const [nameSearch, setNameSearch] = useState('');

    useEffect(() => {
        Axios.get(PORT() + '/api/employees')
            .then((response) => {
                let aux = response.data;
                let display = [];
                aux.forEach((person)=>{
                    person.fullName = person.last_name;
                    person.fullName += ', ';
                    person.fullName += person.name;
                    const exist = props.allSalaries?.filter((elem) => {
                        return elem.dni_employee.includes(person.dni);
                    });
                    //console.log(person.fullName + " - " + exist);
                    //console.log(exist.length);
                    if (exist.length < 1) display.push(person);
                });
                setEmployees(display);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        if (props.salaries.length > 0){
            if (props.salaries.length !== listTable.length) setCurrentPage(1);
            setListTable(props.salaries);
        } else if (employees.length > 0) {
            if (employees.length !== listTable.length) setCurrentPage(1);
            setListTable(employees);
        }
    }, [props.salaries, employees, props]);

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
            width: '20%'
        },
        {
            name: 'Nombre',
            width: '30%'
        },
        {
            name: 'Tipo de Relación',
            width: '20%'
        },
        {
            name: 'Total',
            width: '10%'
        },
        {
            name: 'Editar',
            width: '10%'
        },
        {
            name: 'Ver',
            width: '10%'
        }
    ];

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Get page elements
    const indexOfLastElement = currentPage * elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - elementsPerPage;
    const currentElements = filteredElements.slice(indexOfFirstElement, indexOfLastElement);

    return (
        <> 
            <BeShowed show={props.salaries.length !== 0}>
                <div className="formRow title-searcher">
                    <h4 className="text-secondary">Salarios:</h4>
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
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.dni}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.fullName}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name_emp_relationship}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.total}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <button className="sendAdd" onClick={() => {props.setActionSalary('Ver',element)}}>
                                                <FontAwesomeIcon icon={faEye}/>
                                            </button>
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <button className="sendEdit" onClick={() => {props.setActionSalary('Editar',element)}}>
                                                 {/*style={(new Date(dateBDToString(element.month_year,'En')).getTime() < date) ? {backgroundColor: 'grey'}:null}
                                                    disabled={(new Date(dateBDToString(element.month_year,'En')).getTime() < date)} */} 
                                                <FontAwesomeIcon icon={faEdit}/>
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
            <BeShowed show={!props.showSpinner && props.salaries.length === 0 && props.isValidSearch && props.filter === 'NonGenerate'}>
            <div className="formRow title-searcher">
                    <h4 className="text-secondary">Salarios:</h4>
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
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.dni}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.fullName}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name_emp_relationship}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>------</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <button className="sendAdd" style={{backgroundColor: 'grey'}} disabled={true} >
                                                <FontAwesomeIcon icon={faEye}/>
                                            </button>
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <button className="sendEdit" style={{backgroundColor: 'grey'}} disabled={true} >
                                                <FontAwesomeIcon icon={faEdit}/>
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
            <BeShowed show={!props.showSpinner && props.salaries.length === 0 && props.isValidSearch && props.filter !== 'NonGenerate'}>
                <br/>
                <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No se encontraron salarios que coincidan con las condiciones de busqueda hasta el momento.</h4>
            </BeShowed>
        </>
    );
}