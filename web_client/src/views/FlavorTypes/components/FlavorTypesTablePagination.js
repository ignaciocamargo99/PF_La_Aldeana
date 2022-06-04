import React, { useEffect, useState } from 'react';
import Pagination from 'common/TablePagination/Pagination';
import FlavorTypesTable from './FlavorTypesTable';

const elementsPerPage = 10;

const FlavorTypesTablePagination = ({ readOnly, filteredElements }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastElement = currentPage * elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - elementsPerPage;

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredElements]);

    const pageElements = filteredElements.slice(indexOfFirstElement, indexOfLastElement);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <FlavorTypesTable
                pageElements={pageElements}
                readOnly={readOnly}
            >   
            </FlavorTypesTable>
            <Pagination
                elementsperpage={elementsPerPage}
                paginate={paginate}
                totalelements={filteredElements.length}
            ></Pagination>
        </>
    )
}

export default FlavorTypesTablePagination