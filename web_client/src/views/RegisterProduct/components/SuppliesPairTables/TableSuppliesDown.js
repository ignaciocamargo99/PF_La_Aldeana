import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BodyTable from '../../../../common/Table/BodyTable';
import HeaderTable from '../../../../common/Table/HeaderTable';
import Table from '../../../../common/Table/Table';
import '../../../../assets/Buttons.css';
import BeShowed from "../../../../common/BeShowed";

const TableSuppliesDown = ({ supplies, download, data }) => {
    return (
        <>
            <h4 className="text-secondary">Insumos cargados: </h4>
            <Table>
                <HeaderTable
                    th={
                        <>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '200px', verticalAlign: 'middle' }}>Nombre</th>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '200px', verticalAlign: 'middle' }}>Descripción</th>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '100px', verticalAlign: 'middle' }}>Cantidad ingresada</th>
                            <BeShowed show={data && !data.reading}>
                                <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '150px', verticalAlign: 'middle' }}>Acción</th>
                            </BeShowed>
                        </>
                    }
                />
                <BodyTable
                    tbody={supplies?.map((element, i) => {
                        return (
                            <tbody key={i}>
                                <tr>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.name}</td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{element.description}</td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle', width: '130px' }}>{element.number_supply}</td>
                                    <BeShowed show={data && !data.reading}>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <button type="button" className="sendDelete"
                                                onClick={(e) => download(element)}><FontAwesomeIcon icon={faMinus} /></button>
                                        </td>
                                    </BeShowed>

                                </tr>
                            </tbody>
                        )
                    })}
                />
            </Table>
        </>
    );
};

export default TableSuppliesDown;