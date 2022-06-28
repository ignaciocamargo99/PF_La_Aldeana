// import EditButton from 'common/Table/EditButton';
// import ReadButton from 'common/Table/ReadButton'
// import DeleteButton from 'common/Table/DeleteButton'
import React, { useState, useEffect } from 'react'
// import { handleDeleteClicked } from './flavorTypeDeletion';
import moment from 'moment';
import EditButton from './buttonsTable/EditButton';
import ReadButton from './buttonsTable/ReadButton';
const WholeSaleTable = ({ pageElements, readOnly }) => {
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
        }
    ];
    const columnsHeadersPending = [...columnsHeaders]
    columnsHeadersPending.push({ name: 'Editar', width: '10%' })
    const columnsHeadersFinish = [...columnsHeaders]
    columnsHeadersFinish.push({ name: 'Ver', width: '10%' })

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
                            {pageElements[0].status === 'PENDING' &&
                                (columnsHeadersPending.map((element, i) => {
                                    return (
                                        <th key={i} scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: element.width }}>
                                            {element.name}
                                        </th>
                                    )
                                }))}
                            {pageElements[0].status === 'FINISH' &&
                                (columnsHeadersFinish.map((element, i) => {
                                    return (
                                        <th key={i} scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: element.width }}>
                                            {element.name}
                                        </th>
                                    )
                                }))}
                        </tr>
                    </thead>
                    <tbody>
                        {pageElements?.map((element, i) => {
                            console.log(pageElements[0].status)

                            return (
                                <tr key={i}>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        {element.id_sale_branch}
                                    </td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        {moment(element.date).format('DD-MM-YYYY')}
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
                                    {pageElements[0].status === 'PENDING' && (
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <EditButton link={readOnly ? '#' : '#'} disable={readOnly} />
                                            {/* <EditButton
                                            link={readOnly ? '#' : `${FLAVOR_TYPES_LINK}/edit/${element.idFlavorType}`}
                                            disable={readOnly}
                                        /> */}
                                        </td>
                                    )}
                                    {pageElements[0].status === 'FINISH' && (
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <ReadButton link={'#'} />
                                            {/*    <ReadButton
                                            link={`${FLAVOR_TYPES_LINK}/view/${element.idFlavorType}`}
                                        /> */}
                                        </td>
                                    )}
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