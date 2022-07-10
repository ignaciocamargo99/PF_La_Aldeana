import React from 'react'
import AddSuppliesTable from './AddSuppliesTable';

const TabSupplies = ({ showTab, allSupplies, loadingSupplies }) => {

    console.log('TabSupplies');

    const handleAddSupply = () => { };

    return (
        <>
            {showTab && (
                <>
                    <h3 className="mt-2 ">Insumos</h3>
                    <AddSuppliesTable supplies={allSupplies} handleAddSupply={handleAddSupply} loadingSupplies={loadingSupplies} />
                    <h3 className="mt-2 ">Detalle de Insumos</h3>
                    <>
                        En desarrollo...
                    </>
                </>
            )}
        </>
    )
}

export default TabSupplies