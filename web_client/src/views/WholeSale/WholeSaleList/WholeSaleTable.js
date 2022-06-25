// import EditButton from 'common/Table/EditButton';
// import ReadButton from 'common/Table/ReadButton'
// import DeleteButton from 'common/Table/DeleteButton'
import React, { useState, useEffect } from 'react'
// import { handleDeleteClicked } from './flavorTypeDeletion';

const WholeSaleTable = ({ pageElements, readOnly }) => {
    // const [loadingSales, setLoadingSales] = useState(true)
    const columnsHeaders = [
        {
            name: 'Nro. de venta',
            width: '10%'
        },
        {
            name: 'Fecha de venta',
            width: '20%'
        },
        {
            name: 'Franquicia',
            width: '25%'
        },
        {
            name: 'Ciudad',
            width: '25%'
        },
        {
            name: 'Monto ($)',
            width: '10%'
        },
        {
            name: 'Ver',
            width: '10%'
        },
        {
            name: 'Editar',
            width: '10%'
        }
    ];

    // useEffect(() => { setLoadingSales(false) }, [pageElements])

    const thereAreElements = pageElements && pageElements.length > 0;

    if (!(thereAreElements)) {
        return (
            <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No existen ventas los filtros ingresados...</h4>
        )
    }
    if (thereAreElements) {
        return (
            <div className="table-responsive-md">
                <table className="table table-control table-hover" >
                    <thead>
                        <tr>
                            {columnsHeaders.map((element, i) => {
                                return (
                                    <th key={i} scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: element.width }}>
                                        {element.name}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {pageElements?.map((element, i) => {
                            return (
                                <tr key={i}>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        {element.id_sale_branch}
                                    </td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        {element.date}
                                    </td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        {element.franchise.name}
                                    </td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        {element.franchise.city}
                                    </td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        {element.amount}
                                    </td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        {/* <EditButton
                                            link={readOnly ? '#' : `${FLAVOR_TYPES_LINK}/edit/${element.idFlavorType}`}
                                            disable={readOnly}
                                        /> */}
                                    </td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        {/* <DeleteButton
                                            disable={readOnly}
                                            onConfirm={() => { handleDeleteClicked(element) }}
                                            warningTitle='¿Seguro que desea eliminar la categoría seleccionada?'
                                            warningText={`"${element.name}" ya no estará disponible.`}
                                        /> */}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default WholeSaleTable