import React from 'react';
import DateProduction from './components/DateProduction';
import FlavorsTable from './components/FlavorsTable';

export default function RegisterProductionView (){
    return(
        <>
            <div className="viewTitle">
                <h1>Registrar Producción</h1>
            </div>
            
            <div className="viewBody">
                <DateProduction></DateProduction>
                <FlavorsTable></FlavorsTable>
            </div>
        </>
    )
}