import React from 'react'
import Pagination from 'common/TablePagination/Pagination';
import { useEffect, useState } from 'react';
import SuppliesTable from './SuppliesTable';

const elementsPerPage = 5;

const SuppliesTablePagination = ({ filteredElements, handleAddSupply }) => {
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
            <SuppliesTable
                pageElements={pageElements}
                handleAddSupply={handleAddSupply}
            >
            </SuppliesTable>
            <Pagination
                elementsperpage={5}
                paginate={paginate}
                totalelements={filteredElements.length}
            ></Pagination>
        </>
    )
}

export default SuppliesTablePagination