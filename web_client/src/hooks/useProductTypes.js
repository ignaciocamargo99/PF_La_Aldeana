import { getProductTypes } from 'helpers/getProductTypes';
import { useState, useEffect } from 'react';

export const useProductTypes = () => {
    const [state, setstate] = useState({
        productTypes: [],
        loadingProductTypes: true,
    });

    useEffect(() => {
        getProductTypes().then((productTypes) => {
            setstate({
                productTypes: productTypes,
                loadingProductTypes: false,
            });
        })
    }, [])

    return state;
};