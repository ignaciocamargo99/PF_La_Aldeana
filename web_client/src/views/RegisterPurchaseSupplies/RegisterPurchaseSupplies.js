import React from 'react';
import { connect } from 'react-redux';
import { updatePurchaseNumber, updatePurchaseDate, updatePurchaseSupplier, updatePurchaseTotal, updatePurchaseSupplies, resetPurchaseQuantity, resetPurchaseSubtotal, resetPurchasePrice } from '../../actions/PurchaseSuppliesActions';
import PurchaseNumber from './components/PurchaseNumber';
import PurchaseSupplier from './components/PurchaseSupplier';
import ListSupplies from './components/ListSupplies';
import Buttons from '../../common/Buttons';
import errorNameSupplier from '../../utils/ErrorMessages/errorNameSupplier';
import errorPricesQuantities from '../../utils/ErrorMessages/errorPricesQuantities';
import errorInputSupplies from '../../utils/ErrorMessages/errorInputSupplies';
import successPurchaseSupplies from '../../utils/SuccessMessages/successPurchaseSupplies';
import axios from 'axios';

const PORT = require('../../config');

const RegisterPurchaseSupplies = (props) => {

    const cancel = () => {
        window.location.href = './index'
    }

    const registerPurchaseSupplies = () => {
        let send = true
        if(props.purchaseSupplier === null){
            errorNameSupplier()
            send = false
            return
        }
        let details = []
        props.purchaseSupplies.map((supply,i) => {
            if(props.purchaseQuantity[i] <= 0 || props.purchasePrice[i] <= 0){
                errorPricesQuantities()
                send = false
                return
            }
            let detail = {  "purchase_number":props.purchaseNumber, 
                            "id_supply": supply.id_supply, 
                            "quantity": props.purchaseQuantity[i],
                            "subtotal": props.purchaseSubtotal[i]}
            details.push(detail)
        })
        if(props.purchaseSupplies.length === 0){
            send = false
            errorInputSupplies()
            return
        }

        if(send){
            let purchase = {
                "date_purchase": props.purchaseDate,
                "supplier": props.purchaseSupplier,
                "total": props.purchaseTotal,
                "details": details}
            axios.post( PORT() + `/api/purchase/new`,purchase)
            .then(() => {
                props.updatePurchaseSupplies(null)
                props.resetPurchasePrice()
                props.resetPurchaseQuantity()
                props.resetPurchaseSubtotal()
                props.updatePurchaseNumber(props.purchaseNumber+1)
                props.updatePurchaseDate(props.purchaseDate)
                props.updatePurchaseSupplier("")
                props.updatePurchaseTotal(0)
                return successPurchaseSupplies()
            })
            .catch((err) => {console.log(err)})
        }           
    }

    return(
        <>
            <div className="viewTitle">
                <h1>Registrar Compra de Insumos</h1>
            </div>
            <div className="viewBody">
               <PurchaseNumber />
               <PurchaseSupplier />
               <ListSupplies />
               <Buttons ready={true} label={"Registrar compra"} actionCancel={cancel} actionOK={registerPurchaseSupplies}/>            
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        purchaseNumber: state.purchaseNumber,
        purchaseDate: state.purchaseDate,
        purchaseSupplier: state.purchaseSupplier,
        purchaseTotal: state.purchaseTotal,
        purchaseSupplies: state.purchaseSupplies,
        purchaseQuantity: state.purchaseQuantity,
        purchaseSubtotal: state.purchaseSubtotal,
        purchasePrice: state.purchasePrice
    }
}

const mapDispatchToProps = {
    updatePurchaseNumber,
    updatePurchaseDate,
    updatePurchaseSupplier,
    updatePurchaseTotal,
    updatePurchaseSupplies,
    resetPurchaseQuantity,
    resetPurchaseSubtotal,
    resetPurchasePrice
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterPurchaseSupplies);