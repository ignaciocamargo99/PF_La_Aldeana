import BeShowed from '../../../../common/BeShowed';
import Pagination from '../../../../common/TablePagination/Pagination'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

const ListConsuptions = (props) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage] = useState(15);
    const [filteredElements, setFilteredElements] = useState([]);
    const [listTable, setListTable] = useState([]);
    const [nameSearch, setNameSearch] = useState('');

    useEffect(() => {
        if (props.consuptions[0].length > 0){
            setListTable(props.consuptions[0]);
        }
    }, [props.consuptions]);

    useEffect(() => {
        if (nameSearch !== "") {
            const filteredElementsList = listTable.filter((elem) => {
                return elem.name.toUpperCase().includes(nameSearch.toUpperCase());
            });

            setFilteredElements(filteredElementsList);
        } else {
            setFilteredElements(listTable);
        }
    }, [nameSearch, listTable]);

    const columnsHeaders = [
        {
            name: 'Nombre',
            width: '25%'
        },
        {
            name: 'Tipo',
            width: '15%'
        },
        {
            name: 'Familia',
            width: '15%'
        },
        {
            name: 'Producción (baldes)',
            width: '15%'
        },
        {
            name: 'Consumo (baldes)',
            width: '15%'
        },
        {
            name: 'Diferencia',
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
            <BeShowed show={props.consuptions.length > 0}>
                <div className="formRow title-searcher">
                    <h4 className="text-secondary">Sabor de helado:</h4>
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
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.type}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.family}</td>
                                        <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>{element.prod}</td>
                                        <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>{element.consum}</td>
                                        <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>{element.prod - element.consum}</td>
                                    </tr>
                                )
                            })}
                            {currentElements && currentElements.length < props.consuptions[0].length ?
                                    <tr key='blanckSpace'>
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
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>.......</td>
                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>.......</td>
                                <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>{props.consuptions[1][0].quantity}</td>
                                <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>{props.consuptions[1][1].quantity}</td>
                                <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>{props.consuptions[1][0].quantity - props.consuptions[1][1].quantity}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Pagination elementsperpage={elementsPerPage} totalelements={filteredElements.length} paginate={paginate}></Pagination>
            </BeShowed>
            <BeShowed show={props.consuptions[0].length === 0}>
                <br />
                <div className="text-center">
                    <h4>No se encontró información de sabores de helados que coincida con la búsqueda</h4>
                </div>
            </BeShowed>
        </>
    )
}

export default ListConsuptions;