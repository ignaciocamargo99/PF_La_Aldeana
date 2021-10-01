import { useState, useEffect } from 'react';
import Table from '../../../common/Table/Table';
import HeaderTable from '../../../common/Table/HeaderTable';
import BodyTable from '../../../common/Table/BodyTable';
import Axios from 'axios';
import DeleteProductButton from './DeleteProductButton';
import EditProductButton from './EditProductButton';
import LoaderSpinner from '../../../common/LoaderSpinner';
import EditProducts from './EditProducts/EditProducts';
import BeShowed from '../../../common/BeShowed';
import backupProduct from '../../../utils/backupProduct';

const PORT = require('../../../config');

export default function ProductTable() {
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editing, setEditing] = useState({});
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);

    useEffect(() => {
        Axios.get(PORT() + '/api/products')
            .then((response) => {
                handlerLoadingSpinner();
                let auxSupply = response.data;
                setProducts(auxSupply);
            })
            .catch((error) => console.log(error));
    }, []);

    const deleteProduct = (i) => {
        let aux = [];
        products?.map((e, j) => {
            if (j !== i) {
                aux[j] = e;
            }
        });
        setProducts(aux);
    }

    const editProduct = (product) => {
        let aux = backupProduct(product);
        aux.name = product.name;
        aux.flavor = product.quantity_flavor;
        aux.editing = true;
        setEditing(aux);
        setIsEditing(true);
    }

    const endEditProduct = () => {
        <div style={{ display: 'none' }}>{document.title = "Productos"}</div>
        setIsEditing(false);
        window.scrollTo(0, 0);
    }

    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    return (
        <>
            {isLoadingSpinner && (
                <LoaderSpinner color="primary" loading="Cargando productos..." />
            )}
            {!isLoadingSpinner && (
                <BeShowed show={!isEditing}>
                    <Table>
                        <HeaderTable
                            th={
                                <>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '400px', verticalAlign: 'middle' }}>Nombre</th>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '10px', verticalAlign: 'middle' }}>Editar</th>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '10px', verticalAlign: 'middle' }}>Eliminar</th>
                                </>
                            }
                        />
                        <BodyTable
                            tbody={products?.map((elemento, i) => {
                                return (
                                    <tbody key={i}>
                                        <tr>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{elemento.name}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                <EditProductButton product={elemento} edit={editProduct} />
                                            </td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                <DeleteProductButton deleteProduct={deleteProduct} product={elemento} index={i} />
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })
                            }
                        />
                    </Table>
                </BeShowed>
            )}
            <BeShowed show={isEditing}>
                <EditProducts end={endEditProduct} product={editing} />
            </BeShowed>
        </>
    );
}