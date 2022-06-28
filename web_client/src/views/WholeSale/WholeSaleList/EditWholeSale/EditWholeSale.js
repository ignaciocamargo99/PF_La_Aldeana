import React from "react";
import { useParams } from 'react-router-dom';

export const EditWholeSale = () => {
    const { idFlavorType } = useParams();

    return (
        <h3>Editar venta mayorista</h3>
    )
}