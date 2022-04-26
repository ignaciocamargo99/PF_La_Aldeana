import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BeShowed from 'common/BeShowed';
import LoaderSpinner from 'common/LoaderSpinner';
import React from 'react'

const SuppliesView = ({ permissionsAccess }) => {

    // to do hook para buscar insumos
    const loadingSupplies = false;

    const handleNewSupplyBtnClicked = () => {
        window.location.replace('/app/supplies/new');
    }

    return (
        <>
            {loadingSupplies &&
                <LoaderSpinner color="primary" loading="Cargando..." />
            }
            {!loadingSupplies &&
                <>
                    <div className="viewTitleBtn">
                        <h1>Insumos</h1>
                        <BeShowed show={permissionsAccess === 2 || permissionsAccess === 3}>
                            <button
                                onClick={handleNewSupplyBtnClicked}
                                type="button"
                                className="newBtn"
                            >
                                <FontAwesomeIcon icon={faPlus} /> Nuevo
                            </button>
                        </BeShowed>
                        <BeShowed show={permissionsAccess === 1}>
                            <button
                                disabled
                                type="button"
                                className="disabledNewBtn"
                            >
                                <FontAwesomeIcon icon={faPlus} /> Nuevo
                            </button>
                        </BeShowed>
                    </div>
                </>
            }
        </>
    )
}

export default SuppliesView
