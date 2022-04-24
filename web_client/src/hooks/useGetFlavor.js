import { useState, useEffect } from 'react';
import { getFlavor } from '../helpers/getFlavor';

export const useGetFlavor = (flavorId) => {
    const [state, setstate] = useState({
        flavor: {},
        loadingFlavor: true,
    });

    useEffect(() => {
        getFlavor(flavorId).then(({ Ok, Data }) => {
            setstate({
                flavor: Data,
                loadingFlavor: false,
            });
        })
    }, [flavorId])

    return state;
};
