import React from "react";
import { useParams } from 'react-router-dom';

export const ReadWholeSale = () => {
    const { idWholesale } = useParams();

    return(
        <h3>Consultar venta mayorista</h3>
    )
}