import React from 'react';
import DeleteProductButton from '../DeleteProductButton';
import EditProductButton from '../EditProducts/EditProductButton';
import ReadProductButton from "../ReadProducts/ReadProductButton";
import { productsTableColumnHeaders } from './productsTableColumnHeaders';

const ProductsTable = ({ setNameSearch, pageElements, handleRead, handleEdit, handleDelete, permissionsAccess }) => {

    const thereAreProductsToShow = pageElements && pageElements.length > 0;

    return (
        <>
            {(!thereAreProductsToShow) && (
                <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No existen productos con el nombre ingresado...</h4>
            )}

            {(thereAreProductsToShow) && (
                <div className="table-responsive-md">
                    <table className="table table-control table-hover" >
                        <thead>
                            <tr>
                                {productsTableColumnHeaders?.map((element, i) => {
                                    return (
                                        <th key={i} scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: element.width }}>
                                            {element.name}
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {pageElements?.map((element, i) => {
                                return (
                                    <tr key={i}>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name_sector}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name_product_type}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.price}</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <ReadProductButton product={element} read={handleRead} />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <EditProductButton product={element} edit={handleEdit} permissionsAccess={permissionsAccess} />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <DeleteProductButton deleteProduct={handleDelete} product={element} index={i} permissionsAccess={permissionsAccess} />
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
};

export default ProductsTable;
