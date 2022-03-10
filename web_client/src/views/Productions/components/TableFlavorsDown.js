import Table from '../../../common/Table/Table';
import HeaderTable from '../../../common/Table/HeaderTable';
import BodyTable from '../../../common/Table/BodyTable';
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TableFlavorsDown({ flavors, download, data }) {
    return (
        <>
            <h4 className="text-secondary">Sabores cargados: </h4>
            <Table>
                <HeaderTable
                    th={
                        <>
                            {!data.reading && (
                                <>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '200px', verticalAlign: 'middle' }}>Sabor</th>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '100px', verticalAlign: 'middle' }}>Cantidad (Baldes)</th>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '150px', verticalAlign: 'middle' }}>Eliminar</th>
                                </>
                            )}
                            {data.reading && (
                                <>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '80px', verticalAlign: 'middle' }}>Sabor</th>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '100px', verticalAlign: 'middle' }}>Descripción</th>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '70px', verticalAlign: 'middle' }}>Cantidad (Baldes)</th>
                                </>
                            )}
                        </>}
                />
                <BodyTable
                    tbody={flavors?.map((element, i) => {
                        return (
                            <tbody key={i}>
                                <tr>
                                    {data.reading && (
                                        <>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.description}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.quantity}</td>
                                        </>
                                    )}
                                    {!data.reading && (
                                        <>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.quantity}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                <button type="button" className="sendDelete"
                                                    onClick={() => download(element)}><FontAwesomeIcon icon={faMinus} /></button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            </tbody>
                        )
                    })}
                />
            </Table>
        </>
    );
}