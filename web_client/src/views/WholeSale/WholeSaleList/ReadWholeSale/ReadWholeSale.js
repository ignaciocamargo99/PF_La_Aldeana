import React from "react";
import { useParams } from 'react-router-dom';
import { useGetWholeSaleByID } from "views/WholeSale/customHooks/useGetWholeSaleByID";
import { faIceCream } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from 'common/Breadcrumb';
import { WHOLESALE_PAGE } from "routes/routes";

export const ReadWholeSale = () => {
    const { idWholesale } = useParams();
    const { loadingWholeSale, wholeSale } = useGetWholeSaleByID(idWholesale);

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Consultar venta mayorista"}</div>
            <Breadcrumb
                icon={faIceCream}
                currentName='Consultar venta mayorista'
                parentLink={WHOLESALE_PAGE}
                parentName='Ventas mayoristas'
            />
            <div className="viewTitle">
                <h1>Consultar venta N° {idWholesale}</h1>
            </div>
            <div className="viewBody">
                {console.log(wholeSale)}
            </div>
        </>
    )
}