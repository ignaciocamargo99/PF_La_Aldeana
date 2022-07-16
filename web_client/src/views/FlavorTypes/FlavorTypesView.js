import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoaderSpinner from 'common/LoaderSpinner';
import { useGetFlavorTypes } from 'hooks/useGetFlavorTypes';
import React from 'react';
import { Link } from 'react-router-dom';
import FlavorTypesSearch from './components/FlavorTypesSearch';
import { FLAVOR_TYPES_VIEW_TITLE } from './constants';

const FlavorTypesView = ({ permissionsAccess }) => {
    // to do cambiar hook para que traiga solo activos
    const { loadingFlavorTypes, flavorTypes } = useGetFlavorTypes();

    let newButtonStyle = 'btn btn-light newBtn';
    if (permissionsAccess === 1) {
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
                    <h1>{FLAVOR_TYPES_VIEW_TITLE}</h1>
                    <Link to={permissionsAccess === 1 ? '#': '/app/flavorTypes/new'}>
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
                    <FlavorTypesSearch
                        currentElements={flavorTypes}
                        permissionsAccess={permissionsAccess}
                    />
                </div>
            </>
        )
    }
}

export default FlavorTypesView