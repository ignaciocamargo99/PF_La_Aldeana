import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import swal from 'sweetalert';
import { updatePurchasePrice, updatePurchaseQuantity, updatePurchaseSubtotal, updatePurchaseTotal } from '../../../actions/PurchaseSuppliesActions';
import BodyTable from 'common/Table/BodyTable';
import HeaderTable from 'common/Table/HeaderTable';
import Table from 'common/Table/Table';
import validateFloatNumbers from "utils/Validations/validateFloatNumbers";
import BeShowed from "common/BeShowed";

const PurchaseTable = (props) => {

    const [refreshTotal, setRefreshTotal] = useState(true)

    const changeQuantity = (quantity, i) => {
        if (quantity < 0 || quantity == "" || quantity > 999) {
            document.getElementById(`quantityInput${i}`).value = ""
            quantity = 0
            swal("Atención", "Ingrese valores entre 1 y 999", "warning")
        }

        props.updatePurchaseQuantity(quantity, i)
        let subtotal = props.purchaseQuantity[i] * props.purchasePrice[i]
        props.updatePurchaseSubtotal(subtotal, i)
        document.getElementById(`lblSubtotal${i}`).innerText = `$${subtotal}`
        setRefreshTotal(!refreshTotal)
    }

    const changePrice = (price, i) => {
        if (price < 0 || price == "" || price > 99999) {
            document.getElementById(`priceInput${i}`).value = "";
            price = 0;
            swal("Atención", "Ingrese valores entre 1 y 99999", "warning")
        }

        props.updatePurchasePrice(price, i)
        let subtotal = props.purchaseQuantity[i] * props.purchasePrice[i]
        props.updatePurchaseSubtotal(subtotal, i)
        document.getElementById(`lblSubtotal${i}`).innerText = `$${subtotal}`
        setRefreshTotal(!refreshTotal)
    }

    useEffect(() => {
        if(!props.idPurchase){
            let total = 0;
            props.purchaseSupplies?.map((supply, i) => {
                total += props.purchaseSubtotal[i]
                document.getElementById(`quantityInput${i}`).value = props.purchaseQuantity[i] == 0 ? "" : props.purchaseQuantity[i]
                document.getElementById(`priceInput${i}`).value = props.purchasePrice[i] == 0 ? "" : props.purchasePrice[i]
                document.getElementById(`lblSubtotal${i}`).innerText = `$${props.purchaseSubtotal[i]}`
            });
            props.updatePurchaseTotal(total)
        }
    }, [props.purchaseSupplies?.length, refreshTotal])

    return (
        <>
            {(props.purchaseSupplies && props.purchaseSupplies.length > 0)
                ?
                <>
                    <Table>
                        <HeaderTable
                            th={
                                <>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center' }}><label><b>Nombre</b></label></th>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '7em' }}><label><b>Precio</b></label></th>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '7em' }}><label><b>Cantidad</b></label></th>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '7em' }}><label><b>Subtotal</b></label></th>
                                    <th scope="col" style={{ backgroundColor: '#A5DEF9', textAlign: 'center', width: '10em' }}><label><b>Eliminar</b></label></th>
                                </>
                            }
                        />
                        <BodyTable
                            tbody={props.purchaseSupplies?.map((element, i) => {
                                return (
                                    <tbody key={i}>
                                        <tr>
                                            <td style={{ textAlign: 'center' }}><label>{element.name}</label></td>
                                            <BeShowed show={props.idPurchase}>
                                                <td style={{ textAlign: 'center', width: '7em' }}><label>{element.subtotal/element.quantity}</label></td>
                                                <td style={{ textAlign: 'center', width: '7em' }}><label>{element.quantity}</label></td>
                                                <td style={{ textAlign: 'center', width: '7em' }}><label>{element.subtotal}</label></td>
                                            </BeShowed>
                                            <BeShowed show={!props.idPurchase}>
                                                <td style={{ textAlign: 'center', width: '7em' }}>
                                                    <input disabled={props.idPurchase} id={`priceInput${i}`} type="number" min="0" max="99999" onChange={(e) => { changePrice(e.target.value, i) }} onKeyDown={(e) => validateFloatNumbers(e)} ></input>
                                                </td>
                                                <td style={{ textAlign: 'center', width: '7em' }}>
                                                    <input disabled={props.idPurchase} id={`quantityInput${i}`} type="number" min="0" max="999" onChange={(e) => { changeQuantity(e.target.value, i) }} onKeyDown={(e) => validateFloatNumbers(e)} ></input>
                                                </td>
                                                <td style={{ textAlign: 'center', width: '7em' }}>
                                                    <label id={`lblSubtotal${i}`}></label>
                                                </td>
                                            </BeShowed>
                                            <td style={{ textAlign: 'center' }}>
                                                <button disabled={props.idPurchase} id={`downloadSupplyButton${i}`} type="button" className="btn btn-danger btnDelete" onClick={() => { props.download(element.id_supply, i) }}><FontAwesomeIcon icon={faMinus} /></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                )
                            })
                            }
                        />
                    </Table>
                </>
                :
                <h4 className="row justify-content-center" style={{ color: '#C16100' }}>No hay insumos cargados en el detalle aún...</h4>
            }
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