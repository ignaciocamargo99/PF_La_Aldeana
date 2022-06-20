import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import ReactTooltip from 'react-tooltip';

const StockFlavorTable = ({ flavor }) => {

    console.log('StockFlavorTable');

    let labelClass = '';
    let stockClass = '';
    let showWarnOrErrorStock;
    let tooltipWarnOrErrorStock;

    const getStockLabelStyle = () => {
        if (!(flavor.stock) || +flavor.stock === 0) {
            showWarnOrErrorStock = true;
            tooltipWarnOrErrorStock = 'No hay stock';
            [labelClass, stockClass] = ['fw-bold', 'text-danger'];
            return;
        }

        if ((flavor.reorderStock) && (+flavor.stock < +flavor.reorderStock)) {
            showWarnOrErrorStock = true;
            tooltipWarnOrErrorStock = 'Stock menor al reorden';
            [labelClass, stockClass] = ['fw-bold', 'text-warning'];
        }
    }

    getStockLabelStyle();

    return (
        <td className={labelClass} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
            <>
                {flavor.stock ? flavor.stock : '0'}
                {showWarnOrErrorStock && (
                    <>
                        &nbsp;
                        <FontAwesomeIcon className={stockClass} data-tip={tooltipWarnOrErrorStock} icon={faExclamationTriangle} />
                        <ReactTooltip />
                    </>
                )}
            </>
        </td>
    )
}

export default StockFlavorTable