import React from "react";
import DetailSale from './components/DetailSale';
import ListProducts from './components/ListProducts';
import FilterProducts from './components/FilterProducts';

export default function Sales(){
    return(
        <>
            <div className="viewContent">
                <h1 className="display-5">Ventas</h1>  
                <hr/>
                <div className="row">
                    <div className="col-8">
                        <h3>Seleccione los productos...</h3>
                        <FilterProducts></FilterProducts>
                        <ListProducts></ListProducts>
                    </div>

                    <div className="col-4">
                        <h3>Detalle de la venta</h3>
                        <DetailSale></DetailSale>
                    </div>
                </div> 
            </div>
        </>
    );
}