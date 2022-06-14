import React, { useEffect, useState } from 'react';
import Pagination from 'common/TablePagination/Pagination';
import ProductsTable from './ProductsTable';

const elementsPerPage = 10;

const ProductsTablePagination = ({ filteredElements, handleRead, handleEdit, handleDelete, permissionsAccess }) => {

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
            <ProductsTable
                pageElements={pageElements}
                handleRead={handleRead}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                permissionsAccess={permissionsAccess}
            >
            </ProductsTable>
            <Pagination
                elementsperpage={elementsPerPage}
                paginate={paginate}
                totalelements={filteredElements.length}
            ></Pagination>
        </>
    )
};

export default ProductsTablePagination;
