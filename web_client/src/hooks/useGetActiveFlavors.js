import { useState, useEffect } from 'react'
import { getActiveFlavors } from '../helpers/getActiveFlavors'

export const useGetActiveFlavors = () => {
    const [state, setstate] = useState({
        activeFlavors: [],
        loadingFlavors: true,
    });

    useEffect(() => {
        getActiveFlavors().then(({ Ok, Data }) => {
            setstate({
                activeFlavors: Data,
                loadingFlavors: false,
            });
        })
    }, [])

    return state;
};
