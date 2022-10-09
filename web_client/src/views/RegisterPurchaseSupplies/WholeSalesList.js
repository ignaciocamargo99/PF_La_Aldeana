import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoaderSpinner from 'common/LoaderSpinner';
import { Link } from 'react-router-dom';
import { useGetWholeSales } from './customHooks/useGetWholeSales';
import { formatDateEnd, formatDateStart } from './formatDate';
import { WholeSaleFilter } from './WholeSaleFilter';
export const WholeSalesList = ({ permissionsAccess }) => {
    const startDate = formatDateStart(null);
    const endDate = formatDateEnd(null);
    // to do cambiar hook para que traiga solo activos
    const { loadingSpinner, wholeSales } = useGetWholeSales(startDate, endDate);

    let newButtonStyle = 'btn btn-light newBtn';
    if (permissionsAccess === 1) {
        newButtonStyle = 'disabledNewBtn';
    }

    if (loadingSpinner) {
        return (
            <LoaderSpinner color="primary" loading="Cargando..." />
        )
    }

    if (!loadingSpinner) {
        return (
            <>
            {console.log(permissionsAccess)}
                <div style={{ display: 'none' }}>{document.title = "Ingresos de insumos"}</div>
                <div className="viewTitleBtn">
                    <h1>Ingresos de insumos</h1>
                    <Link to={permissionsAccess === 1 ? '#' : '/app/newPurchaseSupplies'}>
                        <button
                            disabled={permissionsAccess === 1 ? true : false}
                            type="button"
                            className={newButtonStyle}
                        >
                            <FontAwesomeIcon icon={faPlus} /> Nuevo
                        </button>
                    </Link>
                </div>
                <div className="viewBody">
                    <WholeSaleFilter
                        currentElements={wholeSales}
                        permissionsAccess={permissionsAccess}
                    />
                </div>
            </>
        )
    }
}