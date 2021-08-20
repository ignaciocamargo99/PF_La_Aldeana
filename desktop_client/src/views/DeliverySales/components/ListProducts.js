import Table from '../../../common/Table/Table';
import HeaderTable from '../../../common/Table/HeaderTable';
import BodyTable from '../../../common/Table/BodyTable';
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BeShowed from '../../../common/BeShowed';


const ListProducts = (props) => {

    const validateQuantity = (e,i) => {
        let quantity = parseInt(e.target.value)
        if(quantity >= 0 && typeof(quantity) === 'number'){
            e.target.className = "form-control"
            document.getElementById(`quantityValidation${i}`).innerHTML = ""
        }
        else {
            e.target.className = "form-control is-invalid"
            document.getElementById(`quantityValidation${i}`).innerHTML = "Número mayor a 0"            
        }
    }

    return (
        <>
            <Table>
                <HeaderTable
                    th={
                        <>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center' }}>Nombre</th>
                            <BeShowed show={props.icon==='+'}>    
                                <th scope="col" className="bg-info" style={{ textAlign: 'center' }}>Precio</th>
                            </BeShowed>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center' }}>Cantidad</th>
                            <BeShowed show={props.icon==='-'}>    
                                <th scope="col" className="bg-info" style={{ textAlign: 'center' }}>Subtotal</th>
                            </BeShowed>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center' }}></th>
                        </>
                    }
                />
                <BodyTable
                    tbody={props.products?.map((elemento, i) => {
                        return (
                            <tbody key={i}>
                                <tr>
                                    <td style={{ textAlign: 'center', width: '45%'}}>{elemento.name}</td>
                                    <BeShowed show={props.icon==='+'}>
                                        <td style={{ textAlign: 'center', width: '15%'}}>
                                            {elemento.price}
                                        </td>
                                    </BeShowed>
                                    <td style={{ textAlign: 'center', width: '15%'}}>
                                        {props.icon==='+'?
                                        <>
                                        <input id={`quantityInput${i}`} className="form-control" style={{textAlign: 'center'}} type='number' placeholder="0" maxLength="4" onChange={(e) => {validateQuantity(e,i)}}>
                                        </input>
                                        <label id={`quantityValidation${i}`} style={{color:'red'}}></label>
                                        </>
                                        :props.quantities[i]}
                                    </td>
                                    <BeShowed show={props.icon==='-'}>
                                        <td style={{ textAlign: 'center', width: '15%'}}>
                                            {props.subtotals?`$${props.subtotals[i]}`:null}
                                        </td>
                                    </BeShowed>
                                    <td style={{ textAlign: 'center', width: '10%'}}>
                                        <button type="button" className="btn btn-info btn-sm px-3" onClick={() => {props.onClick(elemento.id_product,i)}}><FontAwesomeIcon icon={props.icon === '+'?faPlus:faMinus} /></button>
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