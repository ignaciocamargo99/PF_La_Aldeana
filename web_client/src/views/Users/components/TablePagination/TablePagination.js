import React, { useEffect, useState } from 'react';
import Pagination from '../../../../common/TablePagination/Pagination';
import Table from './Table';

const TablePagination = ({ columnsHeaders, currentElements, handleRead, handleEdit, handleDelete, permissionsAccess }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage] = useState(10);
    const [filteredElements, setFilteredElements] = useState([]);
    const [nameSearch, setNameSearch] = useState('');

    useEffect(() => {
        if (nameSearch !== "") {
            const filteredElementsList = currentElements.filter((elem) => {
                return (elem.nick_user).toUpperCase().includes(nameSearch.toUpperCase());
            });

            setFilteredElements(filteredElementsList);
            setCurrentPage(1);
        } else {
            setFilteredElements(currentElements);
            setCurrentPage(1);
        }
    }, [nameSearch, currentElements]);

    const indexOfLastElement = currentPage * elementsPerPage;

    const indexOfFirstElement = indexOfLastElement - elementsPerPage;

    const pageElements = filteredElements.slice(indexOfFirstElement, indexOfLastElement);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Table
                columnsHeaders={columnsHeaders}
                pageElements={pageElements}
                setNameSearch={setNameSearch}
                handleRead={handleRead}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                permissionsAccess={permissionsAccess}
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
