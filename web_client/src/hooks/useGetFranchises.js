import { useState, useEffect } from 'react';
import { getFranchises } from '../helpers/getFranchises';

export const useGetFranchises = () => {
    const [state, setstate] = useState(createGetFranchisesModel([], true));

    useEffect(() => {
        getFranchises().then((franchises) => {
            setstate(createGetFranchisesModel(franchises, true));
        })
    }, [])

    return state;
};

const createGetFranchisesModel = (franchises, loading = false) => {
    return {
        franchises: franchises,
        loadingFranchises: loading,
    }
}