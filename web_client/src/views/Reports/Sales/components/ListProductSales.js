import Table from '../../../../common/Table/Table';
import HeaderTable from '../../../../common/Table/HeaderTable';
import BodyTable from '../../../../common/Table/BodyTable';

const ListProductSales = (props) => {
    return (
        <>
            <Table>
                <HeaderTable
                    th={
                        <>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '20em', verticalAlign: 'middle' }}>Nombre</th>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '20em', verticalAlign: 'middle' }}>Tipo</th>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '5em', verticalAlign: 'middle' }}>Cant. de Ventas</th>
                        </>
                    }
                />
                {/*
                <BodyTable
                    tbody={props.productSales?.map((elemento, i) => {
                        return (
                            <tbody key={i}>
                                <tr>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{elemento.name}</td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{elemento.type}</td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{elemento.sales}</td>
                                </tr>
                            </tbody>
                        )
                    })
                }
                />
                */}
            </Table>
        </>
    )
}

export default (ListProductSales);