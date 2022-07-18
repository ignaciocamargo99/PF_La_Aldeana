import moment from 'moment';
import { WHOLESALE_VIEW_PAGE } from 'routes/routes';
import ReadButton from './ReadWholeSale/ReadButton';

const WholeSaleTable = ({ pageElements, permissionsAccess }) => {
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
        }
    ];

    const thereAreElements = pageElements && pageElements.length > 0;

    if (!(thereAreElements)) {
        return (
            <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No existen ventas con los filtros ingresados...</h4>
        )
    }
    if (thereAreElements) {
        return (
            <div className="table-responsive-md">
                <table className="table table-control table-hover" >
                    <thead>
                        <tr>
                            {(columnsHeaders.map((element, i) => {
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
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        <ReadButton link={!permissionsAccess ? '#' : `${WHOLESALE_VIEW_PAGE}/${element.id_sale_branch}`} />
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