import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import ReactTooltip from 'react-tooltip';

const StockFlavorTable = ({ flavor }) => {

    let stockClass = '';
    let showWarnOrErrorStock;
    let tooltipWarnOrErrorStock;

    const getStockLabelStyle = () => {
        if (!(flavor.stock) || +flavor.stock === 0) {
            showWarnOrErrorStock = true;
            tooltipWarnOrErrorStock = 'No hay stock';
            stockClass = 'text-danger';
            return;
        }

        if ((flavor.reorderStock) && (+flavor.stock < +flavor.reorderStock)) {
            showWarnOrErrorStock = true;
            tooltipWarnOrErrorStock = 'Stock menor al reorden';
            stockClass = 'text-warning';
        }
    }

    getStockLabelStyle();

    return (
        <td className={stockClass} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
            <>
                {flavor.stock ? flavor.stock : '0'}
                {showWarnOrErrorStock && (
                    <>
                        &nbsp;
                        <FontAwesomeIcon data-tip={tooltipWarnOrErrorStock} icon={faExclamationTriangle} />
                        <ReactTooltip />
                    </>
                )}
            </>
        </td>
    )
}

export default StockFlavorTable