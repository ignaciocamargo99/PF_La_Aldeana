import { useState, useEffect } from 'react';
import { getFlavorFamilies } from '../helpers/getFlavorFamilies';

export const useGetFlavorFamilies = () => {
    const [state, setstate] = useState({
        flavorFamilies: [],
        loadingFlavorFamilies: true,
    });

    useEffect(() => {
        getFlavorFamilies().then(({ data: flavorFamiliesList }) => {
            setstate({
                flavorFamilies: flavorFamiliesList,
                loadingFlavorFamilies: false,
            });
        })
    }, [])

    return state;
};
