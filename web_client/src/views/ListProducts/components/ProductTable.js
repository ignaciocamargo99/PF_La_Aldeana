import Axios from 'axios';
import { useEffect, useState } from 'react';
import BeShowed from '../../../common/BeShowed';
import LoaderSpinner from '../../../common/LoaderSpinner';
import backupProduct from '../../../utils/backupProduct';
import EditProducts from './EditProducts/EditProducts';
import TablePagination from './TablePagination/TablePagination'

const PORT = require('../../../config');

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editing, setEditing] = useState({});
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);

    const getProducts = () => {
        Axios.get(PORT() + '/api/products')
            .then((response) => {
                handlerLoadingSpinner();
                let auxSupply = response.data;
                setProducts(auxSupply);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getProducts();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const productWasSuccessfullyDeleted = () => {
        getProducts()
    };

    const editProduct = (product) => {
        let aux = backupProduct(product);
        aux.name = product.name;
        aux.flavor = product.quantity_flavor;
        aux.editing = true;
        setEditing(aux);
        setIsEditing(true);
    };

    const endEditProduct = (id) => {
        setIsEditing(false);
    }

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    const columnsHeaders = [
        {
            name: 'Nombre',
            width: '60%'
        },
        {
            name: 'Editar',
            width: '20%'
        },
        {
            name: 'Eliminar',
            width: '20%'
        }
    ];

    return (
        <>
            {isLoadingSpinner && (
                <LoaderSpinner color="primary" loading="Cargando productos..." />
            )}
            {!isLoadingSpinner && (
                <BeShowed show={!isEditing}>
                    <TablePagination
                        columnsHeaders={columnsHeaders}
                        currentElements={products}
                        handleEdit={editProduct}
                        handleDelete={productWasSuccessfullyDeleted}
                    ></TablePagination>
                </BeShowed>
            )}
            <BeShowed show={isEditing}>
                <EditProducts end={endEditProduct} product={editing} />
            </BeShowed>
        </>
    );
};

export default ProductTable;