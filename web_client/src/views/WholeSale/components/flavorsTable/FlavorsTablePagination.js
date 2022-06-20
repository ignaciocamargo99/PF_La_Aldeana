import Pagination from 'common/TablePagination/Pagination';
import { useEffect, useState } from 'react';
import FlavorsTable from './FlavorsTable';

const elementsPerPage = 5;

const FlavorsTablePagination = ({ filteredElements, handleAddFlavor }) => {

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
                handleAddFlavor={handleAddFlavor}
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