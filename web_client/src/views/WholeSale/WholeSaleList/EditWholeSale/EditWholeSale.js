import { faIceCream } from '@fortawesome/free-solid-svg-icons';
import Breadcrumb from 'common/Breadcrumb';
import { useParams } from 'react-router-dom';
import { WHOLESALE_PAGE } from "routes/routes";
import { useGetWholeSaleByID } from "views/WholeSale/customHooks/useGetWholeSaleByID";

export const EditWholeSale = () => {
    const { idWholesale } = useParams();
    const { loadingWholeSale, wholeSale } = useGetWholeSaleByID(idWholesale);

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Editar venta mayorista"}</div>
            <Breadcrumb
                icon={faIceCream}
                currentName='Editar venta mayorista'
                parentLink={WHOLESALE_PAGE}
                parentName='Ventas mayoristas'
            />
            <div className="viewTitle">
                <h1>Editar venta N° {idWholesale}</h1>
            </div>
            <div className="viewBody">
                {console.log(wholeSale)}
            </div>
        </>
    )
}