import EditButton from 'common/Table/EditButton';
import ReadButton from 'common/Table/ReadButton'
import DeleteButton from 'common/Table/DeleteButton'
import React from 'react'

const FlavorTypesTable = ({ pageElements, readOnly }) => {

    const columnsHeaders = [
        {
            name: 'Nombre',
            width: '35%'
        },
        {
            name: 'Descripción',
            width: '35%'
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

    const thereAreElements = pageElements && pageElements.length > 0;

    if (!(thereAreElements)) {
        return (
            <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No existen tipos de sabores con el nombre ingresado...</h4>
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
                                        <ReadButton
                                            link='/app/flavorTypes'
                                        />
                                    </td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        <EditButton
                                            link='/app/flavorTypes'
                                            disable={readOnly}
                                        />
                                    </td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        <DeleteButton
                                            disable={readOnly}
                                            onConfirm={() => { }}
                                            warningTitle='¿Seguro que desea eliminar el tipo seleccionado?'
                                            warningText='El tipo de sabor ya no estará disponible.'
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