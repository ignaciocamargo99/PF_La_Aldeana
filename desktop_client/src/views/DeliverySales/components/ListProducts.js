import Table from '../../../common/Table/Table';
import HeaderTable from '../../../common/Table/HeaderTable';
import BodyTable from '../../../common/Table/BodyTable';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux';
import validateFloatNumbers from '../../../utils/Validations/validateFloatNumbers';
import { updateDeliveryProductQuantity } from '../../../actions/DeliverySalesActions';
import DynamicSearch from '../../../common/DynamicSearch';
import { useState } from 'react';

const ListProducts = (props) => {

    const [serchState,setSearchState] = useState('');

    const validateQuantity = (e,i) => {
        let quantity = parseInt(e.target.value)
        let productQuantityNew = {'product': props.productsQuantities[i].product,'quantity': quantity}
        props.updateDeliveryProductQuantity(productQuantityNew,i)
        if(quantity >= 0 && typeof(quantity) === 'number'){
            document.getElementById(`quantityValidation${i}`).innerHTML = ""
        }
        else {
            document.getElementById(`quantityValidation${i}`).innerHTML = "Número mayor a 0"            
        }
    }

    const onClick = (id,i) => {
        props.onClick(id,i)
        document.getElementById(`quantityInput${i}`).value = ''
    }

    return (
        <>
            <div className='formRow'>
                <DynamicSearch placeholder='Buscar productos por nombre...' setSearchState={setSearchState}/>
            </div>
            <Table>
                <HeaderTable
                    th={
                        <>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center' }}><label>Nombre</label></th>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center' }}><label>Precio</label></th>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center' }}><label>Cantidad</label></th>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center' }}></th>
                        </>
                    }
                />
                <BodyTable
                    tbody={props.productsQuantities?.map((productQuantity, i) => {
                        if((productQuantity.product.id_sector === parseInt(props.filter) || parseInt(props.filter) === 0) && (productQuantity.product.name.toUpperCase().includes(serchState.toUpperCase())) || serchState === ''){
                            return (
                                <tbody key={i}>
                                    <tr>
                                        <td style={{ textAlign: 'center', width: '58%'}}><label>{productQuantity.product.name}</label></td>
                                        <td style={{ textAlign: 'center', width: '15%'}}><label>{productQuantity.product.price}</label></td>
                                        <td style={{ textAlign: 'center', width: '15%'}}>
                                            <input id={`quantityInput${i}`} className="form-control" style={{textAlign: 'center'}} type='number' placeholder="0" maxLength="4" onChange={(e) => {validateQuantity(e,i)}} onKeyDown={(e) => {validateFloatNumbers(e)}} defaultValue={productQuantity.quantity===0?'':productQuantity.quantity}></input>
                                            <label><b id={`quantityValidation${i}`} style={{color:'gray'}}></b></label>
                                        </td>   
                                        <td style={{ textAlign: 'center', width: '12%'}}>
                                            <button type="button" className="btn btn-info btn-sm px-3" onClick={() => {onClick(productQuantity.product.id_product,i)}}><FontAwesomeIcon icon={faPlus} /></button>
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        }
                    })
                    }
                />
            </Table>
        </>
    );
}
const mapStateToProps = state => {
    return {
        productsQuantities: state.productsQuantitiesDelivery,
        details: state.detailsDelivery
    }
}

const mapDispatchToProps = {
    updateDeliveryProductQuantity
}

export default connect(mapStateToProps,mapDispatchToProps)(ListProducts);