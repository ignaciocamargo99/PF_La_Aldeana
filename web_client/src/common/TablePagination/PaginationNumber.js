import React, { useEffect, useState } from 'react';

const PaginationNumber = ({ paginate, number, isNumberActive }) => {

    const defaultStyle = 'page-item';
    const [numberStyle, setNumberStyle] = useState(defaultStyle);

    const handleNumberClicked = () => {
        paginate(number);
    };

    useEffect(() => {
        if (isNumberActive) {
            setNumberStyle(`${defaultStyle} active`);
        } else {
            setNumberStyle(defaultStyle);
        }
    }, [isNumberActive]);

    return (
        <li className={numberStyle}>
            <a onClick={handleNumberClicked} className='page-link'>
                {number}
            </a>
        </li>
    )
};

export default PaginationNumber;
