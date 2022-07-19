import React from 'react'
import SuppliesSearch from './SuppliesSearch';

const SuppliesTableFilter = ({ supplies, handleAddSupply }) => {
    const thereAreNoSupplies = supplies?.length === 0;

    if (thereAreNoSupplies) {
        return (
            < label className="row justify-content-center fs-6">
                Actualmente no hay ningún insumo disponible.
            </label >
        )
    }

    if (!thereAreNoSupplies) {
        return (
            <>
                <SuppliesSearch
                    currentElements={supplies}
                    handleAddSupply={handleAddSupply}
                />
            </>
        )
    }
}

export default SuppliesTableFilter