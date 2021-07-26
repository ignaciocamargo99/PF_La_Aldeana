import { useState, useEffect } from 'react';
import Table from '../../../../common/Table/Table';
import HeaderTable from '../../../../common/Table/HeaderTable';
import BodyTable from '../../../../common/Table/BodyTable';
import BeShowed from "../../../../common/BeShowed";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SuppliesAmount from './SuppliesAmount';

export default function TableSuppliesUp(props) {

    const [amounts, setAmounts] = useState([]);

    const handlerAmount = (amount, i) => {
        let aux = props.supplies;
        aux[i].amount = amount;
        setAmounts(aux);
    }

    return (
        <>
            <Table>
                <HeaderTable
                    th={
                        <>
                            <th scope="col" className="bg-success" style={{ textAlign: 'center' }}>Nombre</th>
                            <th scope="col" className="bg-success" style={{ textAlign: 'center', width: '150px' }}>Cantidad</th>
                            <th scope="col" className="bg-success" style={{ textAlign: 'center', width: '150px' }}>Eliminar</th>
                        </>
                    }
                />
                <BodyTable
                    tbody={props.supplies?.map((element, i) => {
                        return (
                            <tbody key={i}>
                                <tr>
                                    <td style={{ textAlign: 'center' }}>{element.name}</td>
                                    <td style={{ textAlign: 'center' }}><SuppliesAmount supplies={element} load={handlerAmount} supply={i}/></td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button type="button" className="btn btn-success btn-sm px-3"
                                            onClick={(e) => props.upload(i)}><FontAwesomeIcon icon={faPlus} /></button>
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