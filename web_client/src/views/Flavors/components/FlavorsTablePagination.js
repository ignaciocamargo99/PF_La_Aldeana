import React, { useEffect, useState } from 'react';
import Pagination from 'common/TablePagination/Pagination';
import SearchFilter from 'common/SearchFilter';
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

    const onFilterInputChange = (nameSearch) => {
        if (nameSearch.trim() !== "") {
            const filteredElementsList = currentElements.filter((elem) => {
                return elem.name.toUpperCase().includes(nameSearch.toUpperCase());
            });

            setFilteredElements(filteredElementsList);
            setCurrentPage(1);
        } else {
            setFilteredElements(currentElements);
            setCurrentPage(1);
        }
    }

    return (
        <>
            <div className="formRow title-searcher">
                <h4 className="text-secondary">Sabores activos:</h4>
                <div className="search-input">
                    <SearchFilter onChange={onFilterInputChange} />
                </div>
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
