import React from 'react';
import FlavorsTablePagination from './FlavorsTablePagination';

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
        const columnsHeaders = [
            {
                name: 'Nombre',
                width: '15%'
            },
            {
                name: 'Familia',
                width: '15%'
            },
            {
                name: 'Tipo',
                width: '10%'
            },
            {
                name: 'Stock',
                width: '10%'
            },
            {
                name: 'Stock de Reorden',
                width: '10%'
            },
            {
                name: 'Precio',
                width: '10%'
            },
            {
                name: 'Ver',
                width: '10%'
            },
            {
                name: 'Editar',
                width: '10%'
            },
            {
                name: 'Eliminar',
                width: '10%'
            }
        ];

        return (
            <FlavorsTablePagination
                columnsHeaders={columnsHeaders}
                currentElements={flavors}
            >
            </FlavorsTablePagination>
        )
    }
};

export default ListFlavorsTable;
