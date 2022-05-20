import { useState, useEffect } from 'react';
import { getFlavorTypes } from '../helpers/getFlavorTypes';

export const useGetFlavorTypes = () => {
    const [state, setstate] = useState({
        flavorTypes: [],
        loadingFlavorTypes: true,
    });

    useEffect(() => {
        getFlavorTypes().then(({ activeFlavorTypes }) => {
            setstate({
                flavorTypes: activeFlavorTypes,
                loadingFlavorTypes: false,
            });
        })
    }, [])

    return state;
};
