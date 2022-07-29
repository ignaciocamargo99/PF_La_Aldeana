import React from 'react'
import SuppliesTableFilter from './suppliesTable/SuppliesTableFilter'

const AddSuppliesTable = ({
    supplies,
    handleAddSupply,
    loadingSupplies,
}) => {

    //let loadingSupplies = true;

    return (
        <>
            <label className="fs-6" htmlFor="date" >Agregue los insumos a vender:</label>
            <div className='mt-3 ps-5 pe-5'>
                <div>
                    {(loadingSupplies) && (
                        <div className="mt-3 mb-5 d-flex justify-content-center">
                            <div>
                                <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                &nbsp;
                                <label className="text-black-50 fs-6">Cargando tabla de insumos...</label>
                            </div>
                        </div>
                    )}
                    {(!loadingSupplies) && (
                        <SuppliesTableFilter supplies={supplies} handleAddSupply={handleAddSupply} />
                    )}
                </div>
            </div>
        </>
    )
}

export default AddSuppliesTable