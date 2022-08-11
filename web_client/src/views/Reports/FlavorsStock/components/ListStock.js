import BeShowed from '../../../../common/BeShowed';
import Pagination from '../../../../common/TablePagination/Pagination'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

const ListStock = (props) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage] = useState(15);
    const [filteredElements, setFilteredElements] = useState([]);
    const [listTable, setListTable] = useState([]);
    const [nameSearch, setNameSearch] = useState('');

    useEffect(() => {
        if (props.stock.list?.length > 0){
            console.log(props.stock.list)
            setListTable(props.stock.list);
        }
    }, [props.stock]);

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
            name: 'Stock (baldes)',
            width: '15%'
        },
        {
            name: 'Punto de reorden (baldes)',
            width: '15%'
        },
        {
            name: 'Diferencia con punto de reorden',
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
            <BeShowed show={props.stock.list.length > 0}>
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
                                        <th key={i} scope="col" style={props.stock.id === 'Sin stock'?{ backgroundColor: 'rgba(255, 99, 132, 0.2)', textAlign: 'center', width: element.width }:
                                        props.stock.id === 'Stock menor o igual al punto de reorden'?{ backgroundColor: 'rgba(255, 206, 86, 0.2)', textAlign: 'center', width: element.width }:{ backgroundColor: '#A5DEF9', textAlign: 'center', width: element.width }}>
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
                                        <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>{element.stock}</td>
                                        <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>{element.reorder_stock}</td>
                                        <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>{element.stock - element.reorder_stock}</td>
                                    </tr>
                                )
                            })}
                            {currentElements && currentElements.length < props.stock.list.length ?
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
                                <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>{props.stock.totals[0].quantity}</td>
                                <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>{props.stock.totals[1].quantity}</td>
                                <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>{props.stock.totals[0].quantity - props.stock.totals[1].quantity}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Pagination elementsperpage={elementsPerPage} totalelements={filteredElements.length} paginate={paginate}></Pagination>
            </BeShowed>
            <BeShowed show={props.stock.list.length === 0}>
                <br />
                <div className="text-center">
                    <h4>No se encontró información de stock de sabores de helados que coincida con la búsqueda</h4>
                </div>
            </BeShowed>
        </>
    )
}

export default ListStock;