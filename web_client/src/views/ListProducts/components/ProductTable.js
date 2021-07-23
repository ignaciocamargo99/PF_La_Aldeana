import Table from '../../../common/Table/Table';
import HeaderTable from '../../../common/Table/HeaderTable';
import BodyTable from '../../../common/Table/BodyTable';
import { faMinus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useHTTPGet from '../../../hooks/useHTTPGet';

const PORT = require('../../../config');

export default function ProductTable (props) {

    const products = useHTTPGet(PORT() + '/api/products');

    return (
        <>
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
                                        <button type="button" className="btn btn-success btn-sm px-3"><FontAwesomeIcon icon={faEdit} /></button>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button type="button" className="btn btn-danger btn-sm px-3"><FontAwesomeIcon icon={faMinus} /></button>
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