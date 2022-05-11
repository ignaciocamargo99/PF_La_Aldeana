import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoaderSpinner from 'common/LoaderSpinner';
import { useGetFlavorTypes } from 'hooks/useGetFlavorTypes';
import React from 'react';
import { Link } from 'react-router-dom';
import FlavorTypesList from './components/FlavorTypesList';

const FlavorTypesView = ({ permissionsAccess }) => {
    // to do cambiar hook para que traiga solo activos
    const { loadingFlavorTypes, flavorTypes } = useGetFlavorTypes();

    const readOnly = permissionsAccess === 1;

    let newButtonStyle = 'btn btn-light newBtn';
    if (readOnly) {
        newButtonStyle = 'disabledNewBtn';
    }

    if (loadingFlavorTypes) {
        return (
            <LoaderSpinner color="primary" loading="Cargando..." />
        )
    }

    if (!loadingFlavorTypes) {
        return (
            <>
                <div className="viewTitleBtn">
                    <h1>Tipos de Sabores</h1>
                    <Link to='/app/flavorTypes/new'>
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
                    <FlavorTypesList currentElements={flavorTypes} permissionsAccess={permissionsAccess} />
                </div>
            </>
        )
    }
}

export default FlavorTypesView