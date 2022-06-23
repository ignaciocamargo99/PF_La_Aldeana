import React from 'react'
import CategoryDetail from './CategoryDetail';

const Categories = ({ flavors, handleRemoveFlavor }) => {

    const categories = [...new Set(flavors.map(f => f.FlavorType.name))];

    return (
        <div className='ps-3 pe-3'>
            {categories.map((categoryName) => {
                return (
                    <CategoryDetail
                        key={categoryName}
                        flavors={flavors.filter(f => f.FlavorType.name === categoryName)}
                        handleRemoveFlavor={handleRemoveFlavor}
                    />
                )
            })}
        </div>
    )
}

export default Categories