import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from 'axios';
import BeShowed from 'common/BeShowed';
import LoaderSpinner from 'common/LoaderSpinner';
import { useEffect, useState } from 'react';
import displayError from 'utils/ErrorMessages/errorMesage';
import EditProducts from './EditProducts/EditProducts';
import productData from './productData';
import ProductsSearch from './ProductsSearch';
import ReadProducts from './ReadProducts/ReadProducts';

const PORT = require('../../../config');

const ProductsPage = ({ permissionsAccess, }) => {
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isReading, setIsReading] = useState(false);
    const [productToEdit, setProductToEdit] = useState({});
    const [productToRead, setProductToRead] = useState({});
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
            let aux = productData(product, productSupplies)
            aux.editing = true;
            setProductToEdit(aux);
            setIsEditing(true);
        }
        catch {
            displayError();
        }
    };

    const readProduct = async (product) => {
        try {
            const { data: productSupplies } = await Axios.get(PORT() + `/api/productSupply/${product.id_product}`)
            let aux = productData(product, productSupplies);
            aux.reading = true;
            setProductToRead(aux);
            setIsReading(true);
        }
        catch {
            displayError();
        }
    }

    const onClickCancelEdit = () => {
        <div style={{ display: 'none' }}>{document.title = "Productos"}</div>
        setIsEditing(false);
        window.scrollTo(0, 0);
    }

    const onClickCancelRead = () => {
        <div style={{ display: 'none' }}>{document.title = "Productos"}</div>
        setIsReading(false);
        window.scrollTo(0, 0);
    }

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    const onClickNewProduct = () => window.location.replace('/app/registerProducts');

    return (
        <>
            {isLoadingSpinner ?
                <LoaderSpinner color="primary" loading="Cargando..." />
                : products && products.length === 0
                    ?
                    <div>
                        <div className="viewTitleBtn">
                            <h1>Productos</h1>
                            <BeShowed show={permissionsAccess === 2 || permissionsAccess === 3}>
                                <button id='editProductButton' onClick={onClickNewProduct} type="button" className="btn btn-light newBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                            </BeShowed>
                            <BeShowed show={permissionsAccess === 1}>
                                <button id='editProductButton' disabled type="button" className="disabledNewBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                            </BeShowed>
                        </div>
                        <br />
                        <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No se encontraron productos registrados hasta el momento.</h4>
                    </div>
                    : (
                        <>
                            <BeShowed show={!isEditing && !isReading}>
                                <div className="viewTitleBtn">
                                    <h1>Productos</h1>
                                    <BeShowed show={permissionsAccess === 2 || permissionsAccess === 3}>
                                        <button id='editProductButton' onClick={onClickNewProduct} type="button" className="btn btn-light newBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                                    </BeShowed>
                                    <BeShowed show={permissionsAccess === 1}>
                                        <button id='editProductButton' disabled type="button" className="disabledNewBtn"><FontAwesomeIcon icon={faPlus} /> Nuevo</button>
                                    </BeShowed>
                                </div>
                                <div className="viewBody">
                                    <ProductsSearch
                                        currentElements={products}
                                        handleRead={readProduct}
                                        handleEdit={editProduct}
                                        handleDelete={productWasSuccessfullyDeleted}
                                        permissionsAccess={permissionsAccess}
                                    ></ProductsSearch>
                                </div>
                            </BeShowed>
                            <BeShowed show={isEditing}>
                                <EditProducts onClickCancelEdit={onClickCancelEdit} productToEdit={productToEdit} />
                            </BeShowed>
                            <BeShowed show={isReading}>
                                <ReadProducts onClickCancelRead={onClickCancelRead} productToRead={productToRead} />
                            </BeShowed>
                        </>
                    )}
        </>
    );
};

export default ProductsPage;