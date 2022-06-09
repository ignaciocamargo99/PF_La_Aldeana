import React, { useEffect, useState } from 'react';
import Pagination from 'common/TablePagination/Pagination';
import EmployeesRealTable from './EmployeesRealTable';

const elementsPerPage = 10;

const EmployeesTablePagination = ({ readOnly, filteredElements, permissionsAccess, handleRead, handleEdit, }) => {

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
            <EmployeesRealTable
                pageElements={pageElements}
                readOnly={readOnly}
                permissionsAccess={permissionsAccess}
                handleRead={handleRead}
                handleEdit={handleEdit}
            >
            </EmployeesRealTable>
            <Pagination
                elementsperpage={elementsPerPage}
                paginate={paginate}
                totalelements={filteredElements.length}
            ></Pagination>
        </>
    )
}

export default EmployeesTablePagination
