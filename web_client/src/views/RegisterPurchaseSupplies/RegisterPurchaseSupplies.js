import React from 'react';
import PurchaseNumber from './components/PurchaseNumber';
import PurchaseSupplier from './components/PurchaseSupplier';
import ListSupplies from './components/ListSupplies';

export default function RegisterPurchaseSupplies (){
    return(
        <>
            <div className="viewTitle">
                <h1>Registrar Compra de Insumos</h1>
            </div>
            <div className="viewBody">
               <PurchaseNumber />
               <PurchaseSupplier />
               <ListSupplies />              
            </div>
        </>
    )
}