import { connect } from "react-redux";
import { updatePurchaseQuantity } from '../../../actions/PurchaseSuppliesActions';
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from '../../../common/Table/Table';
import BodyTable from '../../../common/Table/BodyTable';
import HeaderTable from '../../../common/Table/HeaderTable';
import React, { useState } from "react";


const PurchaseTable  = (props) => {


    const changeQuantity = (quantity,i) => {
        props.updatePurchaseQuantity(quantity,i)
    }

    return (
        <>
            <Table>
                <HeaderTable
                    th={
                        <>
                            <th scope="col"  style={{ textAlign: 'center' }}>Nombre</th>
                            <th scope="col"  style={{ textAlign: 'center', width: '50px' }}>Precio</th>
                            <th scope="col"  style={{ textAlign: 'center', width: '50px' }}>Cantidad</th>
                            <th scope="col"  style={{ textAlign: 'center', width: '50px' }}>Subtotal</th>
                            <th scope="col"  style={{ textAlign: 'center', width: '100px' }}>Eliminar</th>
                        </>
                    }
                />
                <BodyTable
                    tbody={props.purchaseSupplies?.map((element, i) => {
                        return (
                            <tbody key={i}>
                                <tr>
                                    <td style={{ textAlign: 'center' }}>{element.name}</td>
                                    <td style={{ textAlign: 'center', width: '50px' }}>
                                        <input id="priceInput" type="number" min="0" defaultValue="0" ></input>
                                    </td>
                                    <td style={{ textAlign: 'center', width: '50px' }}>
                                        <input id="quantityInput" type="number" min="0" defaultValue="0" onChange={(e) => {changeQuantity(e.target.value,i)}}></input>
                                    </td>
                                    <td style={{ textAlign: 'center', width: '50px' }}>{``}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button id='downloadSupplyButton' type="button" className="btn btn-danger btn-sm px-3" onClick={() => {props.download(element.id_supply,i)}}><FontAwesomeIcon icon={faMinus} /></button>
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
        purchaseQuantity: state.purchaseQuantity
    }
}

const mapDispatchToProps = {
    updatePurchaseQuantity
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseTable);