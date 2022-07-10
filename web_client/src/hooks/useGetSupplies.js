import { useState, useEffect } from 'react';
import { getSupplies } from '../helpers/getSupplies';

export const useGetSupplies = () => {
    const [state, setstate] = useState({
        supplies: [],
        loadingSupplies: true,
    });

    useEffect(() => {
        getSupplies().then((supplies) => {
            setstate({
                supplies: supplies,
                loadingSupplies: false,
            });
        })
    }, [])

    return state;
};