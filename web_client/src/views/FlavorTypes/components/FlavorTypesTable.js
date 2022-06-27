import EditButton from 'common/Table/EditButton';
import ReadButton from 'common/Table/ReadButton'
import DeleteButton from 'common/Table/DeleteButton'
import React from 'react'
import { FLAVOR_TYPES_LINK } from '../constants';
import { handleDeleteClicked } from './flavorTypeDeletion';

const FlavorTypesTable = ({ pageElements, readOnly }) => {

    const columnsHeaders = [
        {
            name: 'Nombre',
            width: '30%'
        },
        {
            name: 'Descripción',
            width: '30%'
        },
        {
            name: 'Precio por kilo ($)',
            width: '16%'
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

    const thereAreElements = pageElements && pageElements.length > 0;

    if (!(thereAreElements)) {
        return (
            <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No existen categorías con el nombre ingresado...</h4>
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
                                        {element.name}
                                    </td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        {element.description}
                                    </td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        {element.price}
                                    </td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        <ReadButton
                                            link={`${FLAVOR_TYPES_LINK}/view/${element.idFlavorType}`}
                                        />
                                    </td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        <EditButton
                                            link={readOnly ? '#' : `${FLAVOR_TYPES_LINK}/edit/${element.idFlavorType}`}
                                            disable={readOnly}
                                        />
                                    </td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        <DeleteButton
                                            disable={readOnly}
                                            onConfirm={() => { handleDeleteClicked(element) }}
                                            warningTitle='¿Seguro que desea eliminar la categoría seleccionada?'
                                            warningText={`"${element.name}" ya no estará disponible.`}
                                        />
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

export default FlavorTypesTable