import { useState, useEffect } from 'react';
import getPurchases from './getPurchases';

export const useGetPurchases = (startDate, endDate) => {
    const [state, setstate] = useState({ wholeSales: [], loadingSpinner: true, });

    useEffect(() => {
        getPurchases('FINISH', startDate, endDate).then((result) => {
            setstate({
                purchases: result,
                loadingSpinner: false,
            });
        })
    }, [])

    return state;
};
