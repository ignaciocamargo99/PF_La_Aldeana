import React from 'react'
import RegisterPurchaseSupplies from './RegisterPurchaseSupplies'

const PurchaseSuppliesView = ({user}) => {
    return (
        <>
            <div className="viewTitle">
                <h1>Registrar Ingreso de insumos</h1>
            </div>
            <div className="viewBody">
                <RegisterPurchaseSupplies user={user}/>
            </div>
        </>
    )
}

export default PurchaseSuppliesView