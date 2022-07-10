import React from 'react'
import SuppliesDetailsTable from './SuppliesDetailsTable';
import SuppliesSummary from './SuppliesSummary';

const SuppliesDetail = ({ supplies, modifySupplyAmountToSell, handleRemoveSupply }) => {
    const suppliesPlaceholder = supplies.length === 1 ? `${supplies.length} insumo` : `${supplies.length} insumos`;

    return (
        <div className='bg-grey-jira p-2 mt-4 mb-4'>
            <label className='text-black-50'>{suppliesPlaceholder}</label>
            <div className='d-flex flex-wrap p-4'>
                <SuppliesDetailsTable
                    supplies={supplies}
                    handleRemoveSupply={handleRemoveSupply}
                    modifySupplyAmountToSell={modifySupplyAmountToSell}
                />
                <SuppliesSummary />
            </div>
        </div>
    )
}

export default SuppliesDetail