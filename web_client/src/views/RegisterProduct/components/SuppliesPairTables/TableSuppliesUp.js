import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from 'react';
import BodyTable from '../../../../common/Table/BodyTable';
import HeaderTable from '../../../../common/Table/HeaderTable';
import Table from '../../../../common/Table/Table';
import SuppliesAmount from './SuppliesAmount';
import '../../../../assets/Buttons.css';

export default function TableSuppliesUp(props) {

    const [amounts, setAmounts] = useState([]);

    const handlerAmount = (amount, i) => {
        let aux = props.supplies;
        aux[i].amount = amount;
        setAmounts(aux);
    }

    return (
        <>
            <h4 className="text-secondary">Insumos disponibles:</h4>
            <Table>
                <HeaderTable
                    th={
                        <>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '200px', verticalAlign: 'middle' }}>Nombre</th>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '200px', verticalAlign: 'middle' }}>Descripción</th>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '100px', verticalAlign: 'middle' }}>Cantidad</th>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '150px', verticalAlign: 'middle' }}>Acción</th>
                        </>
                    }
                />
                <BodyTable
                    tbody={props.supplies?.map((element, i) => {
                        return (
                            <tbody key={i}>
                                <tr>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name}</td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.description}</td>
                                    <SuppliesAmount supplies={element} load={handlerAmount} supply={i} />
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        <button className="sendAdd" type="button" onClick={(e) => props.upload(i)}><FontAwesomeIcon icon={faPlus} /></button>
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