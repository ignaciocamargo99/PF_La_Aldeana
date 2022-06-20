
const getFlavorsToSellTableColumnHeaders = () => {
    return [
        {
            name: 'Nombre',
            width: '16%'
        },
        {
            name: 'Familia',
            width: '14%'
        },
        {
            name: 'Categoría',
            width: '14%'
        },
        {
            name: 'Stock (baldes)',
            width: '14%'
        },
        {
            name: 'Stock de reorden',
            width: '14%'
        },
        {
            name: 'Precio',
            width: '6%'
        },
        {
            name: 'Cantidad',
            width: '6%'
        },
        {
            name: 'Subtotal',
            width: '6%'
        },
        {
            name: 'Eliminar',
            width: '10%'
        },
    ];
};

export default getFlavorsToSellTableColumnHeaders;
