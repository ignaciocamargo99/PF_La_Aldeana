import React, { useEffect, useState } from 'react';
import Pagination from 'common/TablePagination/Pagination';
import FlavorsTable from './FlavorsTable';

const elementsPerPage = 10;

const FlavorsTablePagination = ({ deleteFlavor, permissionsAccess, filteredElements }) => {

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
            <FlavorsTable
                pageElements={pageElements}
                deleteFlavor={deleteFlavor}
                permissionsAccess={permissionsAccess}
            >
            </FlavorsTable>
            <Pagination
                elementsperpage={elementsPerPage}
                paginate={paginate}
                totalelements={filteredElements.length}
            ></Pagination>
        </>
    )
}

export default FlavorsTablePagination