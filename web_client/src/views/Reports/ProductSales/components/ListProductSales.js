import { connect } from 'react-redux';
import BeShowed from '../../../../common/BeShowed';
import Pagination from '../../../../common/TablePagination/Pagination'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

const ListProductSales = (props) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage] = useState(15);
    const [filteredElements, setFilteredElements] = useState([]);
    const [listTable, setListTable] = useState([]);
    const [nameSearch, setNameSearch] = useState('');

    useEffect(() => {
        if (props.productSales.length > 0){

            setListTable(props.productSales);
        }
    }, [props.productSales]);

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
            width: '50%'
        },
        {
            name: 'Tipo',
            width: '20%'
        },
        {
            name: 'Cant. de undidades vendidas',
            width: '30%'
        }
    ];

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Get page elements
    const indexOfLastElement = currentPage * elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - elementsPerPage;
    const currentElements = filteredElements.slice(indexOfFirstElement, indexOfLastElement);

    return (
        <>
            <BeShowed show={props.productSales.length > 0}>
                <div className="formRow title-searcher">
                    <h4 className="text-secondary">Productos vendidos:</h4>
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
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.product_type}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.quantity} uds.</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <Pagination elementsperpage={elementsPerPage} totalelements={filteredElements.length} paginate={paginate}></Pagination>
                <label>Total de todos los productos vendidos en el plazo seleccionado: {props.typeProductSales.total}</label>
            </BeShowed>
        </>
    )
}


const mapStateToProps = state => {
    return {
        productSales: state.productSales,
        typeProductSales: state.typeProductSales
    }
}

export default connect(mapStateToProps)(ListProductSales);