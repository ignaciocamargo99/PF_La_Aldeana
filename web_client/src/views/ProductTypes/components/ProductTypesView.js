import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BeShowed from 'common/BeShowed';
import LoaderSpinner from 'common/LoaderSpinner';
import React from 'react'

const ProductTypesView = ({ permissionsAccess }) => {

    // to do hook para buscar tipos de producto
    const loadingProductTypes = false;

    const handleNewProductTypeBtnClicked = () => {
        window.location.replace('/app/productTypes/new');
    }

    return (
        <>
            {loadingProductTypes &&
                <LoaderSpinner color="primary" loading="Cargando..." />
            }
            {!loadingProductTypes &&
                <>
                    <div className="viewTitleBtn">
                        <h1>Tipos de Producto</h1>
                        <BeShowed show={permissionsAccess === 2 || permissionsAccess === 3}>
                            <button
                                onClick={handleNewProductTypeBtnClicked}
                                type="button"
                                className="btn btn-light newBtn"
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

export default ProductTypesView
