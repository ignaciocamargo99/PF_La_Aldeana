import { useState, useEffect } from 'react';
import { getPurchaseByID } from './getPurchaseByID'

export const useGetPurchaseByID = (purchaseId) => {

    const createStateModel = (purchase, loadingPurchase) => {
        return {
            purchase: purchase,
            loadingPurchase: loadingPurchase,
        }
    }

    const [stateSale, setStateSale] = useState(createStateModel({}, true));

    useEffect(() => {
        getPurchaseByID(purchaseId)
            .then(({ data }) => {
                setStateSale(createStateModel(data))
            })
            .catch(() => {
                setStateSale(createStateModel({}, true))
            })
    }, [purchaseId])

    return stateSale;
};
