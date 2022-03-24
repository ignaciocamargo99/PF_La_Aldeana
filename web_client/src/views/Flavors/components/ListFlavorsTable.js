import React from 'react';
import { useGetActiveFlavors } from '../../../hooks/useGetActiveFlavors';

const ListFlavorsTable = ({ flavors }) => {

    const thereAreNoFlavors = flavors.length === 0;

    if (thereAreNoFlavors) {
        return (
            < h4 className="row justify-content-center">
                Actualmente no hay ningún sabor registrado.
            </h4 >
        )
    }
    else {
        return (
            < h4 className="row justify-content-center">
                En desarrollo...
            </h4 >
        )
    }
};

export default ListFlavorsTable;
