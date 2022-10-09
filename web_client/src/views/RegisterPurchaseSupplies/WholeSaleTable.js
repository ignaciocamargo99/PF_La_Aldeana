import moment from 'moment';
import { WHOLESALE_VIEW_PAGE } from 'routes/routes';
import ReadButton from './ReadButton';

const WholeSaleTable = ({ pageElements, permissionsAccess }) => {
    const columnsHeaders = [
        {
            name: 'Nro. de ingreso',
            width: '15%'
        },
        {
            name: 'Fecha de ingreso',
            width: '25'
        },
        {
            name: 'Proveedor',
            width: '25%'
        },
        {
            name: 'Monto ($)',
            width: '15%'
        },
        {
            name: 'Ver',
            width: '10%'
        }
    ];

    const thereAreElements = pageElements && pageElements.length > 0;

    if (!(thereAreElements)) {
        return (
            <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No existen ingresos con los filtros ingresados...</h4>
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
                                        {element.number}
                                    </td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        {moment(element.purchase_date).format('DD-MM-YYYY')}
                                    </td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        {element.supplier}
                                    </td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        {element.total}
                                    </td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        <ReadButton link={!permissionsAccess ? '#' : `${WHOLESALE_VIEW_PAGE}/${element.number}`} />
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