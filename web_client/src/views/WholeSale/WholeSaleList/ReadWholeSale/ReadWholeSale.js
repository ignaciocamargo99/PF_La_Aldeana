import React from "react";
import { useParams } from 'react-router-dom';
import { useGetWholeSaleByID } from "views/WholeSale/customHooks/useGetWholeSaleByID";

export const ReadWholeSale = () => {
    const { idWholesale } = useParams();
    const { loadingWholeSale, wholeSale } = useGetWholeSaleByID(idWholesale);

    return (
        <>
            <h3>Consultar venta mayorista</h3>
            {console.log(wholeSale)}
        </>
    )
}