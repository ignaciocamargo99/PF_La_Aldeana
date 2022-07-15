import React from "react";
import { useParams } from 'react-router-dom';
import { useGetWholeSaleByID } from "views/WholeSale/customHooks/useGetWholeSaleByID";
import { faIceCream } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from 'common/Breadcrumb';
import { WHOLESALE_PAGE } from "routes/routes";
import DateInput from "views/WholeSale/components/DateInput";
import FranchiseInput from "views/WholeSale/components/FranchiseInput";
import LoaderSpinner from "common/LoaderSpinner";

export const ReadWholeSale = () => {
    const { idWholesale } = useParams();
    const { loadingWholeSale, wholeSale } = useGetWholeSaleByID(idWholesale);

    if (loadingWholeSale) {
        return (
            <LoaderSpinner color="primary" loading="Cargando..." />
        )
    }
    if (!loadingWholeSale) {
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
                    <h1>Resumen venta N° {idWholesale}</h1>
                </div>
                <div className="viewBody">
                    <DateInput wholesaleDate={wholeSale.date} read={true} />
                    <FranchiseInput wholesaleFranchise={wholeSale.franchise} read={true} />
                    {console.log(wholeSale)}
                </div>
            </>
        )
    }
}