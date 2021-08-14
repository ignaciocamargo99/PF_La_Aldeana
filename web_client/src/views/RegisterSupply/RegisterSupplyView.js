import React from 'react';
import { connect } from 'react-redux';
import { updateNameSupply, updateDescriptionSupply, updateSinglePrice, updateMultiplePrice, updateTypeSupply, updateLotSupply, updateUnitPerLotSupply, updateUnitSupply } from '../../actions/SupplyActions';
import NameSupply from './components/NameSupply';
import DescriptionSupply from './components/DescriptionSupply';
import SinglePrice from './components/SinglePrice';
import MultiplePrice from './components/MultiplePrice';
import Stock from './components/Stock';
import TypeSupply from './components/TypeSupply';

import Buttons from '../../common/Buttons';
/*import errorNameSupplier from '../../utils/ErrorMessages/errorNameSupplier';
import errorPricesQuantities from '../../utils/ErrorMessages/errorPricesQuantities';
import errorInputSupplies from '../../utils/ErrorMessages/errorInputSupplies';
import errorPurchaseSupplies from '../../utils/ErrorMessages/errorPurchaseSupplies';
import successPurchaseSupplies from '../../utils/SuccessMessages/successPurchaseSupplies';
*/import axios from 'axios';

const PORT = require('../../config');

const RegisterPurchaseSupplies = (props) => {

    const cancel = () => {
        window.location.href = './index'
    }

    const resetStates = (message) => {
        //successPurchaseSupplies(message)
        props.updateNameSupply(null)
        props.updateDescriptionSupply(null)
        props.updateSinglePrice(0)
        props.updateMultiplePrice(0)
        props.updateTypeSupply(-1)
        props.updateLotSupply(0)
        props.updateUnitPerLotSupply(0)
        props.updateUnitSupply(0)
    }


    const registerPurchaseSupplies = () => {
        let send = true
        /*if(props.purchaseSupplier === null){
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
                            "subtotal": props.purchaseSubtotal[i],
                            "stock": supply.stock_lot?true:false}
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
            .then((response) => {
                if(response.data.Ok){
                    resetStates(response.data.Message)
                }
                else{
                    errorPurchaseSupplies(response.data.Message)
                }
            })
            .catch((err) => {console.log(err)})
        }           */
    }

    return(
        <>
            <div className="viewTitle">
                <h1>Registrar Insumos</h1>
            </div>
            <div className="viewBody">
                <NameSupply />
                <DescriptionSupply />
                <div className="price-form-body ">
                    <div className="price-title">
                        <label >Precio*</label>
                    </div>
                    <div className="price-container">
                        <SinglePrice />
                        <MultiplePrice />
                    </div>
                </div>
                <TypeSupply />
                <Stock />
                <Buttons ready={true} label={"Registrar Insumo"} actionCancel={cancel} actionOK={registerPurchaseSupplies}/>            
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        nameSupply: state.nameSupply,
        descriptionSupply: state.descriptionSupply,
        singlePrice: state.singlePrice,
        multiplePrice: state.multiplePrice,
        typeSupply: state.typeSupply,
        lotSupply: state.lotSupply,
        unitPerLotSupply: state.unitPerLotSupply,
        unitSupply: state.unitSupply
    }
}

const mapDispatchToProps = {
    updateNameSupply,
    updateDescriptionSupply,
    updateSinglePrice,
    updateMultiplePrice,
    updateTypeSupply,
    updateLotSupply,
    updateUnitPerLotSupply,
    updateUnitSupply
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterPurchaseSupplies);