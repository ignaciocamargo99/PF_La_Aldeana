import { useState, useEffect } from 'react'
import { getActiveFlavors } from '../helpers/getActiveFlavors'

export const useGetActiveFlavors = () => {
    const [state, setstate] = useState({
        activeFlavors: [],
        loadingFlavors: true,
    });

    useEffect(() => {
        getActiveFlavors().then((flavors) => {
            setstate({
                activeFlavors: flavors,
                loadingFlavors: false,
            });
        })
    }, [])

    return state;
};
