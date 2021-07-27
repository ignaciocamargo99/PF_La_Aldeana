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
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '200px' }}>Nombre</th>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '200px' }}>Descripción</th>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '200px' }}>Cantidad</th>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '200px' }}>Eliminar</th>
                        </>
                    }
                />
                <BodyTable
                    tbody={props.supplies?.map((element, i) => {
                        return (
                            <tbody key={i}>
                                <tr>
                                    <td style={{ textAlign: 'center' }}>{element.name}</td>
                                    <td style={{ textAlign: 'center' }}>{element.description}</td>
                                    <SuppliesAmount supplies={element} load={handlerAmount} supply={i} />
                                    <td style={{ textAlign: 'center' }}>
                                        <button className="btn btn-primary" type="button" style={{backgroundColor: '#2284B6'}}
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