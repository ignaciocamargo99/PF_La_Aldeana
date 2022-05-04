import React, { useState } from 'react';
import TablePagination from './TablePagination/TablePagination';
import { assembleColumnHeaders } from '../customHooks/assembleColumnHeaders';
import { useReadEditProductType } from '../customHooks/useReadEditProductType';
import ReadProductTypes from './ReadProductTypes/ReadProductTypes';
import EditProductTypes from './EditProductTypes/EditProductTypes';

const ProductTypesTable = ({ permissionsAccess, productTypes }) => {
    const columnsHeaders = assembleColumnHeaders();
    const [listProductTypes, setListProductTypes] = useState(productTypes);
    const { productTypeData, actionTable } = useReadEditProductType(listProductTypes, 1);

    const goBackToTable = () => {
        <div style={{ display: 'none' }}>{document.title = "Tipos de producto"}</div>
        window.scrollTo(0, 0);
    }

    return (
        <>
            {actionTable === ''
                ?
                <TablePagination
                    columnsHeaders={columnsHeaders}
                    currentElements={productTypes}
                    // handleRead={readUser}
                    // handleEdit={editUser}
                    // handleDelete={deleteUser}
                    permissionsAccess={permissionsAccess}
                />
                :
                actionTable === 'R'
                    ?
                    <ReadProductTypes onClickCancelRead={goBackToTable} userToRead={productTypeData}/>
                    :
                    <EditProductTypes onClickCancelEdit={goBackToTable} userToEdit={productTypeData}  />
            }
        </>
    );
}

export default ProductTypesTable;