import Axios from 'axios';
import { useEffect, useState } from 'react';

const PORT = require('../../../config')

export const useGetSupplies = () => {

    const [hookState, setHookState] = useState({
        supplies: [],
        loadingSupplies: true,
    });

    /* A hook that is used to fetch supplies from the server. */
    useEffect(() => {
        Axios.get(`${PORT()}/api/supplies`)
            .then((response) => {
                setHookState({
                    supplies: response.data,
                    loadingSupplies: false,
                });
            })
    }, []);

    return hookState

}