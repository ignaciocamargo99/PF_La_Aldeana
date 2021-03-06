import BeShowed from '../../../../common/BeShowed';
import Pagination from '../../../../common/TablePagination/Pagination'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import dateText from 'utils/DateFormat/dateText';

const ListSalaries = (props) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage] = useState(15);
    const [filteredElements, setFilteredElements] = useState([]);
    const [listTable, setListTable] = useState([]);
    const [nameSearch, setNameSearch] = useState('');

    useEffect(() => {
        if (props.salaries.length > 0){

            setListTable(props.salaries[0]);
        }
    }, [props.salaries]);

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
            name: 'Nombre',
            width: '20%'
        },
        {
            name: 'Hs. trabajadas/extras',
            width: '15%'
        },
        {
            name: 'Recibo de sueldo',
            width: '15%'
        },
        {
            name: 'Adicionales',
            width: '10%'
        },
        {
            name: 'Subtotal',
            width: '15%'
        },
        {
            name: 'Descuentos y anticipos',
            width: '10%'
        },
        {
            name: 'Total',
            width: '15%'
        }
    ];

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Get page elements
    const indexOfLastElement = currentPage * elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - elementsPerPage;
    const currentElements = filteredElements.slice(indexOfFirstElement, indexOfLastElement);

    return (
        <>
            <BeShowed show={props.salaries.length > 0}>
                <div className="formRow title-searcher">
                    <h4 className="text-secondary">Empleados:</h4>
                    <div className="search-input">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="inputGroup-sizing-default"><FontAwesomeIcon icon={faSearch} /></span>
                            </div>
                            <input id="inputSearchName" aria-describedby="inputGroup-sizing-default"  className="form-control" type="text" placeholder="Buscar..." onChange={(e) => setNameSearch(e.target.value)}></input>
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
                        <tbody>
                            {currentElements?.map((element, i) => {
                                return (
                                    <tr key={i}>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.fullName}</td>
                                        <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>$ {element.salary_hs}</td>
                                        <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>$ {element.paycheck}</td>
                                        <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>$ {element.plus}</td>
                                        <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>$ {element.subtotal}</td>
                                        <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>$ {element.minus}</td>
                                        <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>$ {element.total}</td>
                                    </tr>
                                )
                            })}
                            {currentElements && currentElements.length < props.salaries[0].length ?
                                    <tr key='blanckSpace'>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>.......</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>.......</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>.......</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>.......</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>.......</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>.......</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>.......</td>
                                    </tr>:''
                            }
                            <tr key='total'>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>Total</td>
                                <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>${props.salaries[1][0].quantity}</td>
                                <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>${props.salaries[1][1].quantity}</td>
                                <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>${props.salaries[1][2].quantity}</td>
                                <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>${props.salaries[1][3].quantity}</td>
                                <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>${props.salaries[1][4].quantity}</td>
                                <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>${props.salaries[1][5].quantity}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Pagination elementsperpage={elementsPerPage} totalelements={filteredElements.length} paginate={paginate}></Pagination>
            </BeShowed>
        </>
    )
}

export default ListSalaries;