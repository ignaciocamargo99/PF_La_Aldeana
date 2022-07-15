import React from 'react'
import SuppliesDetail from './SuppliesDetail';

const WholesaleSuppliesDetails = ({ supplies, handleRemoveSupply, modifySupplyAmountToSell }) => {

    const thereAreSuppliesToSell = supplies?.length > 0;

    return (
        <>
            <h3>Detalle de Insumos</h3>
            {!thereAreSuppliesToSell && (
                <label className='fs-6'>Aún no ha seleccionado ningún insumo para la venta.</label>
            )}
            {thereAreSuppliesToSell && (
                <SuppliesDetail
                    supplies={supplies}
                    handleRemoveSupply={handleRemoveSupply}
                    modifySupplyAmountToSell={modifySupplyAmountToSell}
                />
            )}
        </>
    )
}

export default WholesaleSuppliesDetails