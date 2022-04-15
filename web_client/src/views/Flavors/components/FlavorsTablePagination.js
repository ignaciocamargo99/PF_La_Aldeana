import React, { useEffect, useState } from 'react';
import Pagination from 'common/TablePagination/Pagination';
import FlavorsTable from './FlavorsTable';

const FlavorsTablePagination = ({ columnsHeaders, currentElements, deleteFlavor, permissionsAccess }) => {

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
            <div className="formRow title-searcher">
                <h4 className="text-secondary">Sabores activos:</h4>
            </div>
            <FlavorsTable
                columnsHeaders={columnsHeaders}
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
};

export default FlavorsTablePagination;
