import Axios from 'axios';
import { useEffect, useState } from 'react';
import BeShowed from '../../../common/BeShowed';
import LoaderSpinner from '../../../common/LoaderSpinner';
import displayError from '../../../utils/ErrorMessages/errorMesage';
import EditProducts from './EditProducts/EditProducts';
import TablePagination from './TablePagination/TablePagination';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PORT = require('../../../config');

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [productToEdit, setProductToEdit] = useState({});
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

    const editProduct = async (product) => {
        try {
            const { data: productSupplies } = await Axios.get(PORT() + `/api/productSupply/${product.id_product}`)

            const aux = {
                active: product.active,
                description: product.description,
                editing: true,
                flagImageUpdate: product.flagImageUpdate,
                flavor: product.quantity_flavor,
                id_product: product.id_product,
                id_product_type: product.id_product_type,
                id_sector: product.id_sector,
                image: product.image,
                name: product.name,
                price: product.price,
                title: product.title,
                supplies: productSupplies.map(({ id_supply, number_supply }) => {
                    return {
                        id_supply: id_supply,
                        number_supply: number_supply
                    }
                })
            };

            setProductToEdit(aux);
            setIsEditing(true);
        }
        catch {
            displayError();
        }
    };

    const onClickCancelEdit = () => {
        <div style={{ display: 'none' }}>{document.title = "Productos"}</div>
        setIsEditing(false);
        window.scrollTo(0, 0);
    }

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    const columnsHeaders = [
        {
            name: 'Nombre',
            width: '70%'
        },
        {
            name: 'Ver',
            width: '10%'
        },
        {
            name: 'Editar',
            width: '10%'
        },
        {
            name: 'Eliminar',
            width: '10%'
        }
    ];

    const onClickNewProduct = () => window.location.replace('/app/registerProducts');

    return (
        <>
            {isLoadingSpinner && (
                <LoaderSpinner color="primary" loading="Cargando productos..." />
            )}
            {!isLoadingSpinner && (
                <>
                    <BeShowed show={!isEditing}>

                        <div className="viewTitleBtn">
                            <h1>Productos</h1>
                            <button id='editProductButton' onClick={onClickNewProduct} type="button" className="newBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                        </div>
                        <div className="viewBody">
                            <TablePagination
                                columnsHeaders={columnsHeaders}
                                currentElements={products}
                                handleEdit={editProduct}
                                handleDelete={productWasSuccessfullyDeleted}
                            ></TablePagination>
                        </div>
                    </BeShowed>
                    <BeShowed show={isEditing}>
                        <EditProducts onClickCancelEdit={onClickCancelEdit} productToEdit={productToEdit} />
                    </BeShowed>
                </>
            )}
        </>
    );
};

export default ProductTable;