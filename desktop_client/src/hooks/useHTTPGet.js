import { useState, useEffect } from 'react';
import Axios from 'axios';

export default function useHTTPGet(UrlApi) {
    const [dataResponse, setDataResponse] = useState()

    useEffect(() => {
        Axios.get(UrlApi)
            .then((response) => {
                setDataResponse(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return dataResponse;
}