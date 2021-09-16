import Table from '../../../common/Table/Table';
import HeaderTable from '../../../common/Table/HeaderTable';
import BodyTable from '../../../common/Table/BodyTable';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux';
import validateFloatNumbers from '../../../utils/Validations/validateFloatNumbers';
import { updateDeliveryProductQuantity } from '../../../actions/DeliverySalesActions';
import DynamicSearch from '../../../common/DynamicSearch';
import { useEffect, useState } from 'react';
import BeShowed from '../../../common/BeShowed';

const ListProducts = (props) => {

    const [searchState,setSearchState] = useState('');
    const [noProduct,setNoProduct] = useState(false);

    const validateQuantity = (e,i) => {
        let quantity = parseInt(e.target.value)
        let productQuantityNew = {'product': props.productsQuantities[i].product,'quantity': quantity}
        props.updateDeliveryProductQuantity(productQuantityNew,i)
    }

    const onClick = (id,i) => {
        props.onClick(id,i)
        document.getElementById(`quantityInput${i}`).value = ''
    }

    useEffect(() => {
        let aux = 0
        props.productsQuantities?.map((productQuantity, i) => {
            if((productQuantity.product.id_sector === parseInt(props.filter) || parseInt(props.filter) === 0) && (productQuantity.product.name.toUpperCase().includes(searchState.toUpperCase()))){
                aux += 1
            }
        })
        if(aux === 0){
            setNoProduct(true)
        }
        else{
            setNoProduct(false)
        }
    },[searchState,props.filter])

    return (
        <>
            <div className='formRow'>
                <DynamicSearch placeholder='Buscar productos por nombre...' setSearchState={setSearchState}/>
            </div>
            <BeShowed show={!noProduct}>
                <Table style={{display: 'block', height: '350px',overflow: 'auto'}}>
                    <HeaderTable
                        th={<>
                                <th scope="col" className="bg-info" style={{ textAlign: 'center' }}><label>Nombre</label></th>
                                <th scope="col" className="bg-info" style={{ textAlign: 'center' }}><label>Precio</label></th>
                                <th scope="col" className="bg-info" style={{ textAlign: 'center' }}><label>Cantidad</label></th>
                                <th scope="col" className="bg-info" style={{ textAlign: 'center' }}></th>
                            </>
                        }
                    />
                    <BodyTable
                        tbody={
                            props.productsQuantities?.map((productQuantity, i) => {
                            if((productQuantity.product.id_sector === parseInt(props.filter) || parseInt(props.filter) === 0) && (productQuantity.product.name.toUpperCase().includes(searchState.toUpperCase()))){
                                if(props.productsNotStock.includes(productQuantity.product.id_product)){
                                    return(<tbody key={i}>
                                        <tr>
                                            <td style={{ textAlign: 'center', width: '58%', backgroundColor: '#9E9F9F'}}><strike>{productQuantity.product.name}</strike></td>
                                            <td style={{ textAlign: 'center', width: '15%', backgroundColor: '#9E9F9F'}}><strike>{productQuantity.product.price}</strike></td>
                                            <td style={{ textAlign: 'center', width: '15%', backgroundColor: '#9E9F9F'}}>
                                                <input id={`quantityInput${i}`} className="form-control" style={{textAlign: 'center'}} type='number' placeholder="0" disabled={true}></input>
                                            </td>
                                            <td style={{ textAlign: 'center', width: '12%', backgroundColor: '#9E9F9F'}}>
                                                <button type="button" className="btn btn-info btn-sm px-3" disabled={true}><FontAwesomeIcon icon={faPlus} /></button>
                                            </td>
                                        </tr>
                                    </tbody>)
                                }else{
                                    return (
                                        <tbody key={i}>
                                            <tr>
                                                <td style={{ textAlign: 'center', width: '58%'}}><label>{productQuantity.product.name}</label></td>
                                                <td style={{ textAlign: 'center', width: '15%'}}><label>{productQuantity.product.price}</label></td>
                                                <td style={{ textAlign: 'center', width: '15%'}}>
                                                    <input id={`quantityInput${i}`} className="form-control" style={{textAlign: 'center'}} type='number' placeholder="0" min={0} maxLength="4" onChange={(e) => {validateQuantity(e,i)}} onKeyDown={(e) => {validateFloatNumbers(e)}} defaultValue={productQuantity.quantity===0?'':productQuantity.quantity}></input>
                                                </td>   
                                                <td style={{ textAlign: 'center', width: '12%'}}>
                                                    <button type="button" className="btn btn-info btn-sm px-3" onClick={() => {onClick(productQuantity.product.id_product,i)}}><FontAwesomeIcon icon={faPlus} /></button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                }
                            }
                        })
                        }
                    />
                </Table>
            </BeShowed>
            <BeShowed show={noProduct}>
                <div className={"col-md-6 offset-md-3"}>
                    <label><b style={{color:'orange'}}>No hay productos con ese nombre</b></label>
                </div>
            </BeShowed>
        </>
    );
}
const mapStateToProps = state => {
    return {
        productsQuantities: state.productsQuantitiesDelivery,
        details: state.detailsDelivery,
        productsNotStock: state.productsNotStockDelivery
    }
}

const mapDispatchToProps = {
    updateDeliveryProductQuantity
}

export default connect(mapStateToProps,mapDispatchToProps)(ListProducts);