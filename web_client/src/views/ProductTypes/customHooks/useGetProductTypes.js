import Axios from 'axios';
import { useEffect, useState } from 'react';

const PORT = require('../../../config')

export const useGetProductTypes = () => {

    const [hookState, setHookState] = useState({
        productTypes: [],
        loadingProductTypes: true,
    });

    /* A hook that is used to fetch productTypes from the server. */
    useEffect(() => {
        Axios.get(`${PORT()}/api/productTypes`)
            .then((response) => {
                setHookState({
                    productTypes: response.data,
                    loadingProductTypes: false,
                });
            })
    }, []);

    return hookState

}