import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';

const StockSupplyTable = ({ supply }) => {

    const rowStock = +supply?.stock_unit || 0;
    const showNoStockAlert = rowStock === 0;

    return (
        <td className={showNoStockAlert ? 'fw-bold' : ''} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
            {rowStock}
            {showNoStockAlert && (
                <>
                    &nbsp;
                    <FontAwesomeIcon className={'text-danger'} data-tip={'No hay stock'} icon={faExclamationTriangle} />
                    <ReactTooltip />
                </>
            )}
        </td>
    )
}

export default StockSupplyTable