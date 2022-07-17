import React from 'react'
import calculateSupplySubtotal from '../calculateSupplySubtotal';
import ItemDetailPlaceholder from './ItemDetailPlaceholder';
import ItemSummary from './ItemSummary'

const SuppliesSummaryDetail = ({ supplies, subtotalSupplies }) => {

    const suppliesSelected = supplies?.length > 0;

    return (
        <div>
            <ItemSummary name={'Insumos'} value={subtotalSupplies} />
            {!suppliesSelected && (
                <label className='text-black-50'>&nbsp;{'0 insumos seleccionados'}</label>
            )}
            {suppliesSelected && (
                supplies.map(s => {
                    const supplyDetailDescrip = `${s.amountToSell}x ${s.name}`;
                    const supplyDetailSubtotal = `${calculateSupplySubtotal(s)}`;

                    return (
                        <ItemDetailPlaceholder key={s.id_supply} description={supplyDetailDescrip} value={supplyDetailSubtotal} />
                    )
                })
            )}
        </div>
    )
}

export default SuppliesSummaryDetail