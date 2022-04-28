import React, { useEffect, useState } from 'react';
import Pagination from '../../../../common/TablePagination/Pagination';
import Table from './Table';
import moment from 'moment';

const PORT = require('../../../../config');

const TablePagination = ({ columnsHeaders, currentElements, handleRead, handleEdit, handleDelete, permissionsAccess }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [elementsPerPage] = useState(10);
    const [filteredElements, setFilteredElements] = useState([]);
    const [dateSearch1, setDateSearch1] = useState('');
    const [dateSearch2, setDateSearch2] = useState('');

    useEffect(() => {
        if (dateSearch1 !== "" && dateSearch2 !== "") {
            let dateFormatted1;
            let dateFormatted2;

            if (PORT() === "") {
                dateFormatted1 = moment(dateSearch1).format('YYYY-MM-DD');
                dateFormatted2 = moment(dateSearch2).format('YYYY-MM-DD');
            }
            else {
                dateFormatted1 = moment(dateSearch1).subtract(1, 'days').format('YYYY-MM-DD');
                dateFormatted2 = moment(dateSearch2).subtract(1, 'days').format('YYYY-MM-DD');
            }

            const filteredElementsList = currentElements.filter((elem) => (moment(elem.date_entry).format('YYYY-MM-DD') >= dateFormatted1) && (moment(elem.date_entry).format('YYYY-MM-DD') <= dateFormatted2));
            setFilteredElements(filteredElementsList);
            setCurrentPage(1);
        }

        else if (dateSearch1 !== "" && dateSearch2 === "") {
            let dateFormatted1;

            if (PORT() === "") dateFormatted1 = moment(dateSearch1).format('YYYY-MM-DD');
            else dateFormatted1 = moment(dateSearch1).subtract(1, 'days').format('YYYY-MM-DD');

            const filteredElementsList = currentElements.filter((elem) => (moment(elem.date_entry).format('YYYY-MM-DD') >= dateFormatted1));
            setFilteredElements(filteredElementsList);
            setCurrentPage(1);
        }

        else if (dateSearch1 === "" && dateSearch2 !== "") {
            let dateFormatted2;

            if (PORT() === "") dateFormatted2 = moment(dateSearch2).format('YYYY-MM-DD');
            else dateFormatted2 = moment(dateSearch2).subtract(1, 'days').format('YYYY-MM-DD');

            const filteredElementsList = currentElements.filter((elem) => moment(elem.date_entry).format('YYYY-MM-DD') <= dateFormatted2);
            setFilteredElements(filteredElementsList);
            setCurrentPage(1);
        }
        else {
            let filteredNowDate = currentElements.filter((elem) => (moment(elem.date_entry).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')));
            // else filteredNowDate = currentElements.filter((elem) => (moment(elem.date_entry).subtract(1, 'days').format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')));

            setFilteredElements(filteredNowDate);
            setCurrentPage(1);
        }
    }, [dateSearch1, dateSearch2, currentElements]);

    const indexOfLastElement = currentPage * elementsPerPage;

    const indexOfFirstElement = indexOfLastElement - elementsPerPage;

    const pageElements = filteredElements.slice(indexOfFirstElement, indexOfLastElement);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Table
                columnsHeaders={columnsHeaders}
                pageElements={pageElements}
                setDateSearch1={setDateSearch1}
                setDateSearch2={setDateSearch2}
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
