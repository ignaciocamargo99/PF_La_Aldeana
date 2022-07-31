export const getSalariesTableColumunsHeaders = (includeTotal, includeActions) => {
    let columnsHeaders = [
        {
            name: 'DNI',
            width: '20%'
        },
        {
            name: 'Nombre',
            width: '30%'
        },
        {
            name: 'Tipo de Relación',
            width: '20%'
        },
    ]

    if (includeTotal) {
        columnsHeaders.push({
            name: 'Total',
            width: '10%'
        });
    }

    if (includeActions) {
        columnsHeaders.push({
            name: 'Editar',
            width: '10%'
        });
        columnsHeaders.push({
            name: 'Ver',
            width: '10%'
        });
    }

    return columnsHeaders;
}