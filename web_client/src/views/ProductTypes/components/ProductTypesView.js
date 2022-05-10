import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BeShowed from 'common/BeShowed';
import LoaderSpinner from 'common/LoaderSpinner';
import React, { useState, useEffect } from 'react';
import { assembleColumnHeaders } from '../customHooks/assembleColumnHeaders';
import { useGetProductTypes } from '../customHooks/useGetProductTypes';
import { useReadEditProductType } from '../customHooks/useReadEditProductType';
import EditProductTypes from './EditProductTypes/EditProductTypes';
import ReadProductTypes from './ReadProductTypes/ReadProductTypes';
import TablePagination from './TablePagination/TablePagination';

const ProductTypesView = ({ permissionsAccess }) => {
    const columnsHeaders = assembleColumnHeaders();
    /* Destructuring the object returned by the useGetProductTypes() hook. */
    const { loadingProductTypes, productTypes } = useGetProductTypes();
    /* A custom hook that is used to read and edit a product type. */
    const [elementToDo, setElementToDo] = useState();
    const [action, setAction] = useState('');
    const { productTypeToDo } = useReadEditProductType(elementToDo, action);

    const [listProductTypes, setListProductTypes] = useState();
    useEffect(() => { setListProductTypes(productTypes) }, [productTypes])

    const deleteProductType = (i) => {
        let aux = [];
        listProductTypes?.forEach((e, j) => {
            if (j !== i) {
                aux[j] = e;
            }
        });
        setListProductTypes(aux);
    };

    const handleNewProductTypeBtnClicked = () => window.location.replace('/app/productTypes/new');

    const goBackToTable = () => {
        <div style={{ display: 'none' }}>{document.title = "Tipos de producto"}</div>
        setAction('')
        window.scrollTo(0, 0);
    }

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Tipos de producto"}</div>
            {loadingProductTypes &&
                <LoaderSpinner color="primary" loading="Cargando..." />
            }
            {(!loadingProductTypes && action === '') &&
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
                        {listProductTypes && listProductTypes?.length > 0
                            ?
                            <TablePagination
                                columnsHeaders={columnsHeaders}
                                currentElements={listProductTypes}
                                handleRead={(productType) => { setAction('R'); setElementToDo(productType) }}
                                handleEdit={(productType) => { setAction('E'); setElementToDo(productType) }}
                                handleDelete={deleteProductType}
                                permissionsAccess={permissionsAccess}
                            />
                            :
                            <h4 className="row justify-content-center" style={{ color: '#C16100', padding: '0 auto' }}>
                                No se encontraron tipos de productos registrados...
                            </h4>
                        }
                    </div>
                </>
            }
            {action === 'R' && <ReadProductTypes onClickCancelRead={goBackToTable} productTypeToRead={productTypeToDo} />}
            {action === 'E' && <EditProductTypes onClickCancelEdit={goBackToTable} productTypeToEdit={productTypeToDo} />}
        </>
    )
}

export default ProductTypesView