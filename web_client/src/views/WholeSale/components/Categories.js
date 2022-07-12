import React from 'react'
import CategoryDetail from './CategoryDetail';

const Categories = ({
    bucketsWeights,
    flavors,
    handleRemoveFlavor,
    modifyFlavorAmountToSell,
    setBucketsWeights,
}) => {

    const categoriesIds = [...new Set(flavors.map(f => +f.FlavorType.idFlavorType))];

    const handleWeightChange = (category, newWeight) => {
        let updated;
        let aux = [...bucketsWeights];

        // update weight of currrent category
        for (let i = 0; i < aux.length; i++) {
            const element = aux[i];
            if (+element.idFlavorType === +category.idFlavorType) {
                element.weight = newWeight;
                updated = true;
                break;
            }
        }

        // category isn't in the array; let's add it
        if (!updated) {
            const cat = {
                idFlavorType: category.idFlavorType,
                name: category.name,
                weight: newWeight,
            }
            aux.push(cat);
        }

        setBucketsWeights(aux);
    }

    return (
        <div className='ps-3 pe-3'>
            {categoriesIds.map((categoryId) => {
                const flavorsOfCategory = flavors.filter(f => +f.FlavorType.idFlavorType === +categoryId);
                const catWeight = bucketsWeights.find(bw => +bw.idFlavorType === +categoryId)?.weight || '';
                const category = flavorsOfCategory[0].FlavorType;

                return (
                    <CategoryDetail
                        category={category}
                        flavors={flavorsOfCategory}
                        handleRemoveFlavor={handleRemoveFlavor}
                        key={categoryId}
                        modifyFlavorAmountToSell={modifyFlavorAmountToSell}
                        weight={catWeight}
                        handleWeightChange={handleWeightChange}
                    />
                )
            })}
        </div>
    )
}

export default Categories