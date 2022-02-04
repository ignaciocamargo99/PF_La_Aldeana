import React, { useEffect, useState } from 'react';
import Pagination from '../../../../common/TablePagination/Pagination';
import Table from './Table';
import moment from 'moment';

const TablePagination = ({ columnsHeaders, currentElements, handleRead, handleEdit, handleDelete }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage] = useState(10);
    const [filteredElements, setFilteredElements] = useState([]);
    const [dateSearch, setDateSearch] = useState('');

    useEffect(() => {
        if (dateSearch !== "") {
            let dateFormatted = moment(dateSearch).format('DD-MM-YYYY')
            const filteredElementsList = currentElements.filter((elem) => moment(elem.date_production).format('DD-MM-YYYY') === dateFormatted);
            console.log(filteredElementsList)
            setFilteredElements(filteredElementsList);
            setCurrentPage(1);
        } else {
            setFilteredElements(currentElements);
            setCurrentPage(1);
        }
    }, [dateSearch, currentElements]);

    const indexOfLastElement = currentPage * elementsPerPage;

    const indexOfFirstElement = indexOfLastElement - elementsPerPage;

    const pageElements = filteredElements.slice(indexOfFirstElement, indexOfLastElement);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Table
                columnsHeaders={columnsHeaders}
                pageElements={pageElements}
                setDateSearch={setDateSearch}
                handleRead={handleRead}
            // handleEdit={handleEdit}
            // handleDelete={handleDelete}
            >
            </Table>
            <Pagination
                elementsperpage={elementsPerPage}
                paginate={paginate}
                totalelements={filteredElements.length}
            ></Pagination>
        </>
    )
};

export default TablePagination;
