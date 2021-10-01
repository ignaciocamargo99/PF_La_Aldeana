import React, { useEffect, useState } from 'react';
import Pagination from '../../../common/TablePagination/Pagination';
import Table from './Table';

const TablePagination = ({ columnsHeaders, currentElements, addBtnClicked }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage] = useState(10);
    const [filteredElements, setFilteredElements] = useState([]);
    const [nameSearch, setNameSearch] = useState('');

    useEffect(() => {
        if (nameSearch !== "") {
            const filteredElementsList = currentElements.filter((elem) => {
                return elem.name.toUpperCase().includes(nameSearch.toUpperCase());
            });

            setFilteredElements(filteredElementsList);
        } else {
            setFilteredElements(currentElements);
        }
    }, [nameSearch, currentElements]);

    const indexOfLastElement = currentPage * elementsPerPage;
    const indexOfFirstElement = indexOfLastElement - elementsPerPage;
    const pageElements = filteredElements.slice(indexOfFirstElement, indexOfLastElement);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Table
                addBtnClicked={addBtnClicked}
                columnsHeaders={columnsHeaders}
                pageElements={pageElements}
                setNameSearch={setNameSearch}
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
