import Table from '../../../common/Table/Table';
import HeaderTable from '../../../common/Table/HeaderTable';
import BodyTable from '../../../common/Table/BodyTable';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlavorsAmount from './FlavorsAmount';

export default function TableFlavorsUp(props) {

    const handlerAmount = (amount, i) => {
        let aux = props.flavors;
        aux[i].amount = amount;  
    }

    return (
        <>
            <h4 className="text-secondary">Sabores disponibles:</h4>
            <Table>
                <HeaderTable
                    th={
                        <>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '200px', verticalAlign: 'middle' }}>Sabor</th>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '130px', verticalAlign: 'middle' }}>Cantidad (Baldes)</th>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '150px', verticalAlign: 'middle' }}>Agregar</th>
                        </>
                    }
                />
                <BodyTable
                    tbody={props.flavors?.map((element, i) => {
                        return (
                            <tbody key={i}>
                                <tr>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name}</td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}><FlavorsAmount flavors={element} load={handlerAmount} flavor={i}/></td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        <button type="button" className="btn btn-primary btn-sm px-3" style={{ backgroundColor: '#2284B6' }}
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