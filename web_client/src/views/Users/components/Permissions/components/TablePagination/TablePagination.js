import React, { useEffect, useState } from 'react';
import Pagination from '../../../../../../common/TablePagination/Pagination';
import Table from './Table';

const TablePagination = ({ columnsHeaders, currentElements, permission, cancelChanges, matrix, load, valueSelect}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage] = useState(15);
    const [filteredElements, setFilteredElements] = useState([]);

    useEffect(() => {
        if (currentElements) {
            setFilteredElements(currentElements);
            setCurrentPage(1);
        }
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
                permission={permission}
                cancelChanges={cancelChanges}
                matrix={matrix}
                load={load}
                valueSelect={valueSelect}
            >
            </Table>
            <Pagination
                elementsperpage={elementsPerPage}
                paginate={paginate}
                totalelements={filteredElements.length}
            />
        </>
    )
};

export default TablePagination;