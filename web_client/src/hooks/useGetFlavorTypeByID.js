import { useState, useEffect } from 'react';
import { getFlavorTypeByID } from '../helpers/getFlavorTypeByID';

export const useGetFlavorTypeByID = (flavorTypeId) => {

    const createStateModel = (flavorType, loadingFlavorType) => {
        return {
            flavorType: flavorType,
            loadingFlavorType: loadingFlavorType,
        }
    }

    const [state, setstate] = useState(createStateModel({}, true));

    useEffect(() => {
        getFlavorTypeByID(flavorTypeId)
            .then(({ data }) => {
                setstate(createStateModel(data))
            })
            .catch(() => {
                setstate(createStateModel({}, true))
            })
    }, [flavorTypeId])

    return state;
};
