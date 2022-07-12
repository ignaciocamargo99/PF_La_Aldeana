import { useState, useEffect } from 'react';
import getWholeSales from './getWholeSales';

export const useGetWholeSales = () => {
    const [state, setstate] = useState({wholeSales: [],loadingSpinner: true,});

    useEffect(() => {
        getWholeSales('PENDING').then((result) => {
            setstate({
                wholeSales: result,
                loadingSpinner: false,
            });
        })
    }, [])

    return state;
};
