import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoaderSpinner from 'common/LoaderSpinner';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetWholeSales } from '../customHooks/useGetWholeSales';
import { WholeSaleFilter } from './WholeSaleFilter'

export const WholeSalesList = ({ readOnly }) => {
    // to do cambiar hook para que traiga solo activos
    const { loadingSpinner, wholeSales } = useGetWholeSales();

    let newButtonStyle = 'btn btn-light newBtn';
    if (readOnly) {
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
                <div className="viewTitleBtn">
                    <h1>Ventas mayoristas</h1>
                    <Link to={readOnly ? '#' : '/app/wholesales/new'}>
                        <button
                            disabled={readOnly}
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
                        readOnly={readOnly}
                    />
                    {/* <FlavorTypesSearch
                        currentElements={flavorTypes}
                        readOnly={readOnly}
                    /> */}
                </div>
            </>
        )
    }
}