import React from 'react'
import BucketsSummaryTable from './BucketsSummaryTable';
import BucketsTable from './BucketsTable';

const CategoryDetail = ({
    category,
    flavors,
    handleRemoveFlavor,
    handleWeightChange,
    modifyFlavorAmountToSell,
    weight,
}) => {

    const categoryPlaceholder = flavors.length === 1 ? `${flavors.length} sabor` : `${flavors.length} sabores`;

    return (
        <div className='bg-grey-jira p-2 mt-4 mb-4'>
            <label className='fw-bold me-4'>{category.name}</label>
            <label className='text-black-50'>{categoryPlaceholder}</label>
            <div className='d-flex flex-wrap p-4'>
                <BucketsTable flavors={flavors} handleRemoveFlavor={handleRemoveFlavor} modifyFlavorAmountToSell={modifyFlavorAmountToSell} />
                <BucketsSummaryTable category={category} flavors={flavors} weight={weight} handleWeightChange={handleWeightChange} />
            </div>
        </div>
    )
}

export default CategoryDetail