import Table from '../../../../common/Table/Table';
import HeaderTable from '../../../../common/Table/HeaderTable';
import BodyTable from '../../../../common/Table/BodyTable';
import { connect } from 'react-redux';
import dateToString from '../../../../utils/ConverterDate/dateToString';
import BeShowed from '../../../../common/BeShowed';

const ListProductSales = (props) => {

    return (
        <>
            <BeShowed show={props.productSales.length > 0}>
                <label>Total de ventas: {props.typeProductSales.total}</label>
            <Table>
                <HeaderTable
                    th={
                        <>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '10em', verticalAlign: 'middle' }}>Fecha</th>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '20em', verticalAlign: 'middle' }}>Nombre</th>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '5em', verticalAlign: 'middle' }}>Tipo</th>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '5em', verticalAlign: 'middle' }}>Cant. de Ventas</th>
                        </>
                    }
                />
                <BodyTable
                    tbody={props.productSales?.map((elemento, i) => {
                        return (
                            <tbody key={i}>
                                <tr>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{dateToString(elemento.date_sale)}</td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{elemento.name}</td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{elemento.product_type}</td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{elemento.quantity}</td>
                                </tr>
                            </tbody>
                        )
                    })
                }
                />
            </Table>
            </BeShowed>
        </>
    )
}


const mapStateToProps = state => {
    return {
        productSales: state.productSales,
        typeProductSales: state.typeProductSales
    }
}

export default connect(mapStateToProps)(ListProductSales);