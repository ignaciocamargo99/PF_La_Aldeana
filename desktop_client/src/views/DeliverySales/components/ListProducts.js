import Table from '../../../common/Table/Table';
import HeaderTable from '../../../common/Table/HeaderTable';
import BodyTable from '../../../common/Table/BodyTable';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from 'react-redux';
import { useEffect } from 'react';

const ListProducts = (props) => {

    useEffect(() => {
        let x = document.getElementsByClassName('form-control')
        for(let i = 0; i< x.length ; i++){
            x[i].value = ''
        }
    },[props.details.length])

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
                            <th scope="col" className="bg-info" style={{ textAlign: 'center' }}><label>Nombre</label></th>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center' }}><label>Precio</label></th>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center' }}><label>Cantidad</label></th>
                            <th scope="col" className="bg-info" style={{ textAlign: 'center' }}></th>
                        </>
                    }
                />
                <BodyTable
                    tbody={props.products?.map((product, i) => {
                        if(product.id_sector == props.filter || props.filter == 0){
                            return (
                                <tbody key={i}>
                                    <tr>
                                        <td style={{ textAlign: 'center', width: '58%'}}><label>{product.name}</label></td>
                                        <td style={{ textAlign: 'center', width: '15%'}}><label>{product.price}</label></td>
                                        <td style={{ textAlign: 'center', width: '15%'}}>
                                            <input id={`quantityInput${i}`} className="form-control" style={{textAlign: 'center'}} type='number' placeholder="0" maxLength="4" onChange={(e) => {validateQuantity(e,i)}}></input>
                                            <b id={`quantityValidation${i}`} style={{color:'gray'}}></b>
                                        </td>   
                                        <td style={{ textAlign: 'center', width: '12%'}}>
                                            <button type="button" className="btn btn-info btn-sm px-3" onClick={() => {props.onClick(product.id_product,i)}}><FontAwesomeIcon icon={faPlus} /></button>
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
        products: state.productsDelivery,
        details: state.detailsDelivery
    }
}

export default connect(mapStateToProps)(ListProducts);