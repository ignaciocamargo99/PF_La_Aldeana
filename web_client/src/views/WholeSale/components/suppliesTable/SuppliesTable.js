import React from 'react'
import AmountCell from '../AmountCell';
import getAddSuppliesTableColumnHeaders from "./getAddSuppliesTableColumnHeaders";
import StockSupplyTable from './StockSupplyTable';

const columnsHeaders = getAddSuppliesTableColumnHeaders();

const SuppliesTable = ({ pageElements, handleAddSupply }) => {
    return (
        <>
            {(pageElements && pageElements.length > 0)
                ?
                <div className="table-responsive-md">
                    <table className="table table-control table-hover fs-6" >
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
                                element.stock = element.stock_unit;

                                return (
                                    <tr key={i}>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            {element.name}
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            {element.price_wholesale}
                                        </td>
                                        <StockSupplyTable supply={element} />
                                        <AmountCell item={element} handleAddItem={handleAddSupply} />
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                :
                <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No existen insumos para los filtros ingresados...</h4>
            }
        </>
    )
}

export default SuppliesTable