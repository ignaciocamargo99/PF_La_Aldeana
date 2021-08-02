import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from '../../../common/Table/Table';
import BodyTable from '../../../common/Table/BodyTable';
import HeaderTable from '../../../common/Table/HeaderTable';
import { updateFlavorQuantity } from '../../../actions/FlavorActions';
import { connect } from 'react-redux';


const TableFlavorsUp = (props) => {

    const changeQuantity = (quantity,i) => {
        props.updateFlavorQuantity(quantity,i)
    }

    return (
        <>
            <h4 className="text-secondary">Sabores disponibles:</h4>
            <Table>
                <HeaderTable
                    th={
                        <>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '200px', verticalAlign: 'middle' }}>Sabor</th>
                            <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '130px', verticalAlign: 'middle' }}>Cantidad</th>
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
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        <input style={{ width: '150px'}} className="form-control-md" id="flavorsAmount" type="number" min="1" onChange={(e) => {changeQuantity(e.target.value,i)}} placeholder="0" />
                                    </td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                        <button type="button" className="btn btn-primary btn-sm px-3" style={{ backgroundColor: '#2284B6' }}
                                            onClick={() => {props.upload(element.id_flavor)}}><FontAwesomeIcon icon={faPlus} /></button>
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

const mapStateToProps = state => {
    return {
        flavorQuantity: state.flavorQuantity
    }
}

const mapDispatchToProps = {
    updateFlavorQuantity
}

export default connect(mapStateToProps, mapDispatchToProps)(TableFlavorsUp);