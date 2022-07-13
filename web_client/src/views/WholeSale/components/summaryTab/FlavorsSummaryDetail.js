import React from 'react'
import ItemDetailPlaceholder from './ItemDetailPlaceholder';
import ItemSummary from './ItemSummary';

const FlavorsSummaryDetail = ({ flavorsCategoriesIds, flavors, weightsByCategory, subtotalFlavors }) => {

    const flavorsSelected = flavorsCategoriesIds?.length > 0;

    return (
        <div>
            <ItemSummary name={'Sabores'} value={subtotalFlavors} />
            {!flavorsSelected && (
                <label className='text-black-50'>&nbsp;{'0 sabores seleccionados'}</label>
            )}
            {flavorsSelected && (
                flavorsCategoriesIds.map(categoryId => {
                    const flavorsOfCategory = flavors.filter(f => +f.FlavorType.idFlavorType === +categoryId);
                    const catWeight = weightsByCategory.find(bw => +bw.idFlavorType === +categoryId)?.weight || '';
                    const category = flavorsOfCategory[0].FlavorType;

                    const amount = flavorsOfCategory.length;
                    const amountPlaceholder = amount === 1 ? `1 sabor seleccionado` : `${amount} sabores seleccionados`;

                    const flavorDetailDescrip = `${catWeight || '---'} Kg ${category.name} (${amountPlaceholder})`;
                    const flavorDetailSubtotal = `${+category.price * +catWeight}`;

                    return (
                        <ItemDetailPlaceholder key={categoryId} description={flavorDetailDescrip} value={flavorDetailSubtotal} />
                    )
                })
            )}
        </div>
    )
}

export default FlavorsSummaryDetail