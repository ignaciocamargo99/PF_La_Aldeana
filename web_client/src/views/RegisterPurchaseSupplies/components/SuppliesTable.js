import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from '../../../common/Table/Table';
import BodyTable from '../../../common/Table/BodyTable';
import HeaderTable from '../../../common/Table/HeaderTable';


const SuppliesTable = ({ supplies, upload }) => {

    return (
        <>
            <Table>
                <HeaderTable
                    th={
                        <>
                            <th scope="col" style={{ textAlign: 'center' }}><label><b>Nombre</b></label></th>
                            <th scope="col" style={{ textAlign: 'center', width: '150px' }}><label><b>Agregar</b></label></th>
                        </>
                    }
                />
                <BodyTable
                    tbody={supplies?.map((element, i) => {
                        return (
                            <tbody key={i}>
                                <tr>
                                    <td style={{ textAlign: 'center' }}><label>{element.name}</label></td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button id='uploadSupplyButton' type="button" className="btn-sm px-3" style={{ backgroundColor: '#A5DEF9', borderColor: '#A5DEF9' }} onClick={() => { upload(element.id_supply) }}><FontAwesomeIcon icon={faPlus} /></button>
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
};

export default SuppliesTable;
