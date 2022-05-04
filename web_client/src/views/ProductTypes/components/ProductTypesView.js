import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BeShowed from 'common/BeShowed';
import LoaderSpinner from 'common/LoaderSpinner';
import React from 'react'
import { useGetProductTypes } from '../customHooks/useGetProductTypes';
import ProductTypesTable from './ProductTypesTable';

const ProductTypesView = ({ permissionsAccess }) => {
    /* Destructuring the object returned by the useGetProductTypes() hook. */
    const { loadingProductTypes, productTypes } = useGetProductTypes();
    
    const handleNewProductTypeBtnClicked = () => window.location.replace('/app/productTypes/new');

    

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Tipos de producto"}</div>
            {loadingProductTypes &&
                <LoaderSpinner color="primary" loading="Cargando..." />
            }
            {!loadingProductTypes &&
                <>
                    <div className="viewTitleBtn">
                        <h1>Tipos de producto</h1>
                        <BeShowed show={permissionsAccess === 2 || permissionsAccess === 3}>
                            <button onClick={handleNewProductTypeBtnClicked} type="button" className="btn btn-light newBtn">
                                <FontAwesomeIcon icon={faPlus} /> Nuevo
                            </button>
                        </BeShowed>
                        <BeShowed show={permissionsAccess === 1}>
                            <button disabled type="button" className="disabledNewBtn">
                                <FontAwesomeIcon icon={faPlus} /> Nuevo
                            </button>
                        </BeShowed>
                    </div>
                    <div className="viewBody">
                        {productTypes && productTypes.length > 0
                            ?
                            <ProductTypesTable productTypes={productTypes} permissionsAccess={permissionsAccess} />
                            :
                            <h4 className="row justify-content-center" style={{ color: '#C16100', padding: '0 auto' }}>
                                No se encontraron tipos de productos registrados...
                            </h4>
                        }
                    </div>
                </>
            }
        </>
    )
}

export default ProductTypesView
