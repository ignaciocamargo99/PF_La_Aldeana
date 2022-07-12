import { useState, useEffect } from 'react';
import { getWholeSaleByID } from './getWholeSaleByID'

export const useGetWholeSaleByID = (wholeSaleId) => {

    const createStateModel = (wholeSale, loadingWholeSale) => {
        return {
            wholeSale: wholeSale,
            loadingWholeSale: loadingWholeSale,
        }
    }

    const [stateSale, setStateSale] = useState(createStateModel({}, true));

    useEffect(() => {
        getWholeSaleByID(wholeSaleId)
            .then(({ data }) => {
                setStateSale(createStateModel(data))
            })
            .catch(() => {
                setStateSale(createStateModel({}, true))
            })
    }, [wholeSaleId])

    return stateSale;
};
