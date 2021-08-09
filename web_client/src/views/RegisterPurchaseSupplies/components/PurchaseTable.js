import { connect } from "react-redux";
import { updatePurchaseQuantity , updatePurchasePrice , updatePurchaseSubtotal, updatePurchaseTotal } from '../../../actions/PurchaseSuppliesActions';
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from '../../../common/Table/Table';
import BodyTable from '../../../common/Table/BodyTable';
import HeaderTable from '../../../common/Table/HeaderTable';
import React, { useEffect, useState } from "react";


const PurchaseTable  = (props) => {

    const [refreshTotal,setRefreshTotal] = useState(true)

    const changeQuantity = (quantity,i) => {
        if(quantity < 0 || quantity == ""){
            document.getElementById(`quantityInput${i}`).value = 0
            quantity = 0
        }
        props.updatePurchaseQuantity(quantity,i)
        let subtotal = props.purchaseQuantity[i]*props.purchasePrice[i]
        props.updatePurchaseSubtotal(subtotal,i)
        document.getElementById(`lblSubtotal${i}`).innerText = `$${subtotal}`
        setRefreshTotal(!refreshTotal)
    }

    const changePrice = (price,i) => {
        if(price < 0 || price == ""){
            document.getElementById(`priceInput${i}`).value = 0
            price = 0
        }    
        props.updatePurchasePrice(price,i)
        let subtotal = props.purchaseQuantity[i]*props.purchasePrice[i]
        props.updatePurchaseSubtotal(subtotal,i)
        document.getElementById(`lblSubtotal${i}`).innerText = `$${subtotal}`
        setRefreshTotal(!refreshTotal)        
    }
    
    useEffect(() => {
        let total = 0
        props.purchaseSupplies?.map((supply,i) => {
            total += props.purchaseSubtotal[i]
            document.getElementById(`quantityInput${i}`).value = props.purchaseQuantity[i] == 0?"":props.purchaseQuantity[i]
            document.getElementById(`priceInput${i}`).value = props.purchasePrice[i] == 0?"":props.purchasePrice[i]
            document.getElementById(`lblSubtotal${i}`).innerText = `$${props.purchaseSubtotal[i]}`  
        })
        props.updatePurchaseTotal(total)
    },[props.purchaseSupplies?.length, refreshTotal])

    return (
        <>
            <Table>
                <HeaderTable
                    th={
                        <>
                            <th scope="col"  style={{ textAlign: 'center' }}><label><b>Nombre</b></label></th>
                            <th scope="col"  style={{ textAlign: 'center', width: '50px' }}><label><b>Precio</b></label></th>
                            <th scope="col"  style={{ textAlign: 'center', width: '50px' }}><label><b>Cantidad</b></label></th>
                            <th scope="col"  style={{ textAlign: 'center', width: '50px' }}><label><b>Subtotal</b></label></th>
                            <th scope="col"  style={{ textAlign: 'center', width: '100px' }}><label><b>Eliminar</b></label></th>
                        </>
                    }
                />
                <BodyTable
                    tbody={props.purchaseSupplies?.map((element, i) => {
                        return (
                            <tbody key={i}>
                                <tr>
                                    <td style={{ textAlign: 'center' }}><label>{element.name}</label></td>
                                    <td style={{ textAlign: 'center', width: '50px' }}>
                                        <input id={`priceInput${i}`} type="number" min="0" onBlur={(e) => {changePrice(e.target.value,i)}}></input>
                                    </td>
                                    <td style={{ textAlign: 'center', width: '50px' }}>
                                        <input id={`quantityInput${i}`} type="number" min="0" onBlur={(e) => {changeQuantity(e.target.value,i)}}></input>
                                    </td>
                                    <td style={{ textAlign: 'center', width: '50px' }}>
                                        <label id={`lblSubtotal${i}`}></label>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button id={`downloadSupplyButton${i}`} type="button" className="btn-sm px-3" style={{backgroundColor: '#F68634', borderColor: '#F68634'}} onClick={() => {props.download(element.id_supply,i)}}><FontAwesomeIcon style={{color: 'white'}}icon={faMinus} /></button>
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
        purchaseQuantity: state.purchaseQuantity,
        purchasePrice: state.purchasePrice,
        purchaseSubtotal: state.purchaseSubtotal,
        purchaseTotal: state.purchaseTotal
    }
}

const mapDispatchToProps = {
    updatePurchaseQuantity,
    updatePurchasePrice,
    updatePurchaseSubtotal,
    updatePurchaseTotal
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseTable);