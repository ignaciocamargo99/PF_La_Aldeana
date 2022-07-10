import { useState, useEffect } from 'react';
import { getSupplies } from '../helpers/getSupplies';

export const useGetSupplies = (conditions) => {
    const [state, setstate] = useState({
        supplies: [],
        loadingSupplies: true,
    });

    useEffect(() => {
        getSupplies(conditions).then((supplies) => {
            setstate({
                supplies: supplies,
                loadingSupplies: false,
            });
        })
    }, [])

    return state;
};