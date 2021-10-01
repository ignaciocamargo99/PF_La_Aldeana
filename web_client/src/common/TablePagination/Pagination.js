import React, { useEffect, useState } from 'react';
import './Pagination.css';
import PaginationNumber from './PaginationNumber';

const Pagination = ({ elementsperpage, totalelements, paginate }) => {

    const [pageNumbersList, setPageNumbersList] = useState([]);

    useEffect(() => {
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(totalelements / elementsperpage); i++) {
            pageNumbers.push({
                number: i,
                active: i === 1 ? true : false,
            });
        };

        setPageNumbersList(pageNumbers);

    }, [elementsperpage,totalelements]);

    const makePagination = (number) => {
        refreshStyles(number);
        paginate(number);
    };

    const refreshStyles = (numberClicked) => {
        const pageNumbers = [...pageNumbersList].map(pageNumber => {
            pageNumber.active = pageNumber.number === numberClicked;
            return pageNumber;
        });

        setPageNumbersList(pageNumbers);
    };

    return (
        <nav>
            <ul className="pagination justify-content-end">
                {pageNumbersList.map(({ number, active }, index) => (
                    <PaginationNumber key={index} isNumberActive={active} paginate={makePagination} number={number}></PaginationNumber>
                ))}
            </ul>
        </nav>
    )
};

export default Pagination;
