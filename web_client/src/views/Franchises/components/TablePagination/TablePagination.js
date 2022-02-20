import React, { useEffect, useState } from 'react';
import Pagination from '../../../../common/TablePagination/Pagination';
import Table from './Table';

const TablePagination = ({ columnsHeaders, currentElements, handleRead, handleEdit, handleDelete }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage] = useState(10);
    const [filteredElements, setFilteredElements] = useState([]);

    useEffect(() => {
        setFilteredElements(currentElements);
        setCurrentPage(1);
    }, [currentElements]);

    const indexOfLastElement = currentPage * elementsPerPage;

    const indexOfFirstElement = indexOfLastElement - elementsPerPage;

    const pageElements = filteredElements.slice(indexOfFirstElement, indexOfLastElement);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Table
                columnsHeaders={columnsHeaders}
                pageElements={pageElements}
                handleRead={handleRead}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
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
