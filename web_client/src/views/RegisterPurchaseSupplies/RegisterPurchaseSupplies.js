import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updatePurchaseNumber, updatePurchaseDate, updatePurchaseSupplier, updatePurchaseTotal, updatePurchaseSupplies, resetPurchaseQuantity, resetPurchaseSubtotal, resetPurchasePrice } from '../../actions/PurchaseSuppliesActions';
import PurchaseNumber from './components/PurchaseNumber';
import PurchaseSupplier from './components/PurchaseSupplier';
import ListSupplies from './components/ListSupplies';
import Buttons from '../../common/Buttons';
import errorNameSupplier from '../../utils/ErrorMessages/errorNameSupplier';
import errorPricesQuantities from '../../utils/ErrorMessages/errorPricesQuantities';
import errorInputSupplies from '../../utils/ErrorMessages/errorInputSupplies';
import errorPurchaseSupplies from '../../utils/ErrorMessages/errorPurchaseSupplies';
import successPurchaseSupplies from '../../utils/SuccessMessages/successPurchaseSupplies';
import swal from 'sweetalert';
import axios from 'axios';

const PORT = require('../../config');

const RegisterPurchaseSupplies = (props) => {
    const [ready, setReady] = useState(false)
    const [details, setDetails] = useState([])

    const cancel = () => window.location.href = './purchaseSupplies'

    const resetStates = (message) => {
        successPurchaseSupplies(message)
        props.updatePurchaseSupplies([])
        props.resetPurchasePrice()
        props.resetPurchaseQuantity()
        props.resetPurchaseSubtotal()
        props.updatePurchaseNumber(props.purchaseNumber + 1)
        props.updatePurchaseDate(props.purchaseDate)
        props.updatePurchaseSupplier("")
        props.updatePurchaseTotal(0)
    }

    const validate = () => {
        if (props.purchaseSupplier === 'null' || props.purchaseSupplier === '' || props.purchaseSupplier === null) {
            errorNameSupplier()
        }
        else {
            props.purchaseSupplies.map((supply, i) => {
                if (props.purchaseSubtotal[i] <= 0) errorPricesQuantities()
            })

            if (props.purchaseSupplies.length === 0 || props.purchaseSupplies.length === null) errorInputSupplies()
            else {
                if (props.purchaseTotal <= 0) swal("Atención", "Todos los insumos deben tener precio y cantidad validos", "warning")
            }
        }
    }

    useEffect(() => {
        let isReady = true;
        if (props.purchaseSupplier == 'null' || props.purchaseSupplier === '' || props.purchaseSupplier === null) isReady = false
        else {
            let details = []
            if (props.purchaseSupplies.length === 0 || props.purchaseSupplies.length === null) isReady = false;
            else {
                props.purchaseSupplies.map((supply, i) => {
                    let detail = {
                        "purchase_number": props.purchaseNumber,
                        "id_supply": supply.id_supply,
                        "quantity": props.purchaseQuantity[i],
                        "subtotal": props.purchaseSubtotal[i],
                        "stock": supply.stock_lot ? true : false
                    }
                    if (detail.subtotal <= 0) isReady = false;
                    details.push(detail)
                    setDetails(details)
                })
            }
        };

        setReady(isReady)
    }, [props.purchaseNumber, props.purchaseDate, props.purchaseSupplier, props.purchaseTotal, props.purchaseSupplies, props.purchaseQuantity, props.purchaseSubtotal, props.purchasePrice])

    const registerPurchaseSupplies = () => {
        let purchase = {
            "date_purchase": props.purchaseDate,
            "supplier": props.purchaseSupplier,
            "total": props.purchaseTotal,
            "details": details
        }
        axios.post(PORT() + `/api/purchases`, purchase)
            .then((response) => {
                if (response.data.Ok) resetStates(response.data.Message);
                else errorPurchaseSupplies(response.data.Message)
            })
            .catch((err) => { console.log(err) })
    }

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Registrar compra de insumos"}</div>
            <div className="viewTitle">
                <h1>Registrar Compra de Insumos</h1>
            </div>
            <div className="viewBody">
                <PurchaseNumber />
                <PurchaseSupplier />
                <ListSupplies />
                <Buttons ready={ready} label={"Registrar"} actionCancel={cancel} actionOK={registerPurchaseSupplies} actionNotOK={validate} />
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPurchaseSupplies);
