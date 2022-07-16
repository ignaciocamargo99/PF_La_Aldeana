import { useState, useEffect } from 'react';
import { getSectors } from '../helpers/getSectors';

export const useGetSectors = () => {
    const [state, setstate] = useState({
        sectors: [],
        loadingSectors: true,
    });

    useEffect(() => {
        getSectors().then((sectors) => {
            setstate({
                sectors: sectors,
                loadingSectors: false,
            });
        })
    }, [])

    return state;
};