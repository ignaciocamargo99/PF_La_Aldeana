import React, { useEffect, useState } from 'react';
import Pagination from 'common/TablePagination/Pagination';
import WholeSaleTable from './WholeSaleTable';

const elementsPerPage = 10;

const WholeSaleTablePagination = ({ readOnly, filteredElements, loadingSales }) => {

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
            <WholeSaleTable
                pageElements={pageElements}
                readOnly={readOnly}
            />   
            <Pagination
                elementsperpage={elementsPerPage}
                paginate={paginate}
                totalelements={filteredElements.length}
            ></Pagination>
        </>
    )
}

export default WholeSaleTablePagination