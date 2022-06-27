
const getFlavorsTableColumnHeaders = () => {
    return [
        {
            name: 'Nombre',
            width: '21%'
        },
        {
            name: 'Familia',
            width: '15%'
        },
        {
            name: 'Categoría',
            width: '10%'
        },
        {
            name: 'Stock (baldes)',
            width: '10%'
        },
        {
            name: 'Stock de reorden',
            width: '10%'
        },
        {
            name: 'Ver',
            width: '8%'
        },
        {
            name: 'Editar',
            width: '8%'
        },
        {
            name: 'Eliminar',
            width: '8%'
        }
    ];
};

export default getFlavorsTableColumnHeaders;
