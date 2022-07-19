import React from 'react'
import calculateCategorySubtotal from '../calculateCategorySubtotal';
import filterFlavorsByCategory from '../filterFlavorsByCategory';
import getCategoryWeight from '../getCategoryWeight';
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
                    const flavorsOfCategory = filterFlavorsByCategory(categoryId, flavors);
                    const catWeight = getCategoryWeight(categoryId, weightsByCategory);
                    const category = flavorsOfCategory[0].FlavorType;

                    const amount = flavorsOfCategory.length;
                    const amountPlaceholder = amount === 1 ? `1 sabor seleccionado` : `${amount} sabores seleccionados`;

                    const flavorDetailDescrip = `${catWeight || '---'} Kg ${category.name} (${amountPlaceholder})`;
                    const flavorDetailSubtotal = `${calculateCategorySubtotal(catWeight, category.price)}`;

                    return (
                        <ItemDetailPlaceholder key={categoryId} description={flavorDetailDescrip} value={flavorDetailSubtotal} />
                    )
                })
            )}
        </div>
    )
}

export default FlavorsSummaryDetail