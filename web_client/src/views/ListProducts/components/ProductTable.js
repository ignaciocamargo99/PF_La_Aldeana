import { useState, useEffect } from 'react';
import Table from '../../../common/Table/Table';
import HeaderTable from '../../../common/Table/HeaderTable';
import BodyTable from '../../../common/Table/BodyTable';
import Axios from 'axios';
import DeleteProductButton from './DeleteProductButton';
import EditProductButton from './EditProductButton';
import LoaderSpinner from '../../../common/LoaderSpinner';

const PORT = require('../../../config');

export default function ProductTable (props) {

    const [products, setProducts] = useState([]);

    const [isLoadingSpinner, setIsLoadingSpinner] = useState(true);

    useEffect(() => {
        Axios.get(PORT() + '/api/products')
            .then((response) => {
                handlerLoadingSpinner();
                let auxSupply = response.data;
                setProducts(auxSupply);
            })
            .catch((error) => {
                console.log(error);
            });
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


    const handlerLoadingSpinner = () => setIsLoadingSpinner(false);

    return (
        <>
        {isLoadingSpinner && (
                    <>
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <LoaderSpinner color = "primary" />
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <label className="text-muted" style={{margin: '10px', padding: '10px 50px 50px 50px'}}>Cargando productos...</label>
                            </div>
                        </div>
                    </>
                )}
            <Table>
                <HeaderTable
                    th={
                        <>
                            {//<th scope="col" className="d-none" style={{ textAlign: 'center', width: '150px' }}>Id</th>
                    }
                            <th scope="col" className="bg-success" style={{ textAlign: 'center' }}>Nombre</th>
                            <th scope="col" className="bg-success" style={{ textAlign: 'center', width: '150px' }}>Editar</th>
                            <th scope="col" className="bg-success" style={{ textAlign: 'center', width: '150px' }}>Eliminar</th>
                        </>
                    }
                />
                <BodyTable
                    tbody={products?.map((elemento, i) => {
                        return (
                            <tbody key={i}>
                                <tr>
                                    {//<td className="d-none" style={{ textAlign: 'center' }}>{elemento.id_product}</td>
                    }
                                    <td style={{ textAlign: 'center' }}>{elemento.name}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <EditProductButton product={elemento}/>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <DeleteProductButton deleteProduct={deleteProduct} product={elemento} index={i}/>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                    }
                />
            </Table>
        </>
    );
}