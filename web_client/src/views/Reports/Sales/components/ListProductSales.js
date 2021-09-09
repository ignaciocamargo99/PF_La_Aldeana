import Table from '../../../../common/Table/Table';
import HeaderTable from '../../../../common/Table/HeaderTable';
import BodyTable from '../../../../common/Table/BodyTable';
import { connect } from 'react-redux';

const ListProductSales = (props) => {

    const dateToString = (date) =>{
        let d = "";
        let stringDate = date

        for (let i = 0; i < 19; i++){
            if(date.charAt(i) !== 'T'){
                d += date.charAt(i);
            } else {
                d += ' ';
            }
        }


        return d

    }

    return (
        <>
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
        </>
    )
}


const mapStateToProps = state => {
    return {
        productSales: state.productSales
    }
}

export default connect(mapStateToProps)(ListProductSales);