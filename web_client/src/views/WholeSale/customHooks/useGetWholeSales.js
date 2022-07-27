import { useState, useEffect } from 'react';
import getWholeSales from './getWholeSales';

export const useGetWholeSales = (startDate, endDate) => {
    const [state, setstate] = useState({ wholeSales: [], loadingSpinner: true, });

    useEffect(() => {
        getWholeSales('FINISH', startDate, endDate).then((result) => {
            setstate({
                wholeSales: result,
                loadingSpinner: false,
            });
        })
    }, [])

    return state;
};
