import Pagination from 'common/TablePagination/Pagination';
import { useEffect, useState } from 'react';
import FlavorsToSellTableTable from './FlavorsToSellTableTable';

const elementsPerPage = 5;

const FlavorsToSellTablePagination = ({ filteredElements, handleRemoveFlavor }) => {

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
            <FlavorsToSellTableTable
                pageElements={pageElements}
                handleRemoveFlavor={handleRemoveFlavor}
            >
            </FlavorsToSellTableTable>
            <Pagination
                elementsperpage={elementsPerPage}
                paginate={paginate}
                totalelements={filteredElements.length}
            ></Pagination>
        </>
    )
}

export default FlavorsToSellTablePagination