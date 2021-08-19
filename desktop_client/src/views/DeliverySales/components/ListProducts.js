import Table from '../../../common/Table/Table';
import HeaderTable from '../../../common/Table/HeaderTable';
import BodyTable from '../../../common/Table/BodyTable';
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ListProducts = (props) => {

    return (
        <>
            <Table>
                <HeaderTable
                    th={
                        <>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center' }}>Nombre</th>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center' }}></th>
                        </>
                    }
                />
                <BodyTable
                    tbody={props.products?.map((elemento, i) => {
                        return (
                            <tbody key={i}>
                                <tr>
                                    <td style={{ textAlign: 'center' }}>{elemento.name}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button type="button" className="btn btn-info btn-sm px-3" onClick={() => {props.onClick(elemento.id_product)}}><FontAwesomeIcon icon={props.icon === '+'?faPlus:faMinus} /></button>
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

export default ListProducts