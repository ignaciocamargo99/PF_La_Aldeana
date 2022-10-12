import React, { useEffect, useState, useRef } from 'react';
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
import Breadcrumb from '../../common/Breadcrumb';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { defaultQuestionSweetAlert2 } from 'utils/questionMessages/sweetAlert2Questions';
import loadingMessage from '../../utils/LoadingMessages/loadingMessage';
import { useParams } from 'react-router-dom';
import { useGetPurchaseByID } from "./customHooks/useGetPurchaseByID";
import BeShowed from 'common/BeShowed';
import validateFloatNumbers from "utils/validateFloatNumbers";
import Axios from 'axios';

const PORT = require('../../config');

const RegisterPurchaseSupplies = (props) => {
    const [ready, setReady] = useState(false)
    const [details, setDetails] = useState([])
    const { idPurchase } = useParams();
    const [purchases, setPurchases] = useState([]);
    const { loadingPurchase, purchase } = useGetPurchaseByID(idPurchase?idPurchase:-1);
    const [isValidClassNumber, setIsValidClassNumber] = useState("form-control");
    const inputNumber = useRef(null);
    const [number, setNumber] = useState("null");

    useEffect(() => {
        Axios.get(`${PORT()}/api/purchases`)
            .then(response => {
                setPurchases(response.data)
            })
            .catch((error) => console.log(error));
    }, [true]);

    const cancel = () => window.location.href = '/app/purchaseSupplies'

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
                if (props.purchaseTotal <= 0) swal("Atención", "Todos los insumos deben tener precio y cantidad válidos", "warning")
            }
        }
    }

    const handleNumber = () => setNumber(inputNumber.current.value);
    
    useEffect(() => {
        if (idPurchase) return;

        const number = inputNumber.current.value.trim();
        if (number.length > 0 && number.length <= 15 && (!purchases.some(purchase => purchase.number == number))) {
            setIsValidClassNumber("form-control is-valid");
            purchase.number = +number;
        }
        else {
            setIsValidClassNumber("form-control");
            purchase.number = number;
        }
    }, [number, purchase, idPurchase])

    const validateNumber = (e) => {
        if (e.target.value.length > 15) e.target.value = e.target.value.slice(0, 15);
    }

    useEffect(() => {
        let isReady = true;
        if (props.purchaseSupplier == 'null' || props.purchaseSupplier === '' || props.purchaseSupplier === null || isValidClassNumber === 'form-control') isReady = false
        else {
            let details = []
            if (props.purchaseSupplies.length === 0 || props.purchaseSupplies.length === null) isReady = false;
            else {
                // eslint-disable-next-line array-callback-return
                props.purchaseSupplies.map((supply, i) => {
                    let detail = {
                        "purchase_number": props.purchaseNumber,
                        "number": props.number,
                        "id_supply": supply.id_supply,
                        "quantity": props.purchaseQuantity[i],
                        "subtotal": props.purchaseSubtotal[i],
                        "stock": supply.stock_lot ? true : false
                    }
                    if (detail.subtotal <= 0) isReady = false;
                    details.push(detail)
                })
                setDetails(details)
            }
        };

        setReady(isReady)
    }, [isValidClassNumber, props.purchaseNumber, props.purchaseDate, props.purchaseSupplier, props.purchaseTotal, props.purchaseSupplies, props.purchaseQuantity, props.purchaseSubtotal, props.purchasePrice])

    const registerPurchaseSupplies = async () => {
        const registrationConfirmed = (await defaultQuestionSweetAlert2(`¿Registrar nuevo ingreso de insumos?`)).isConfirmed;
        if (registrationConfirmed) {
            let purchase = {
                "date_purchase": props.purchaseDate,
                "supplier": props.purchaseSupplier,
                "total": props.purchaseTotal,
                "number": number,
                "details": details
            }
            loadingMessage('Registrando nueva compra...');
            axios.post(PORT() + `/api/purchases`, purchase)
                .then((response) => {
                    if (response.data.Ok) resetStates('Ingreso de insumos registrado exitosamente');
                    else errorPurchaseSupplies(response.data.Message)
                })
                .catch((err) => { console.log(err) })
        }
    }

    return (
        <>
            <BeShowed show={idPurchase > 0}>
                <div style={{ display: 'none' }}>{document.title = "Consultar ingreso de insumos"}</div>
                <Breadcrumb
                    icon={faShoppingCart}
                    currentName='Consultar ingreso de insumos'
                    parentLink={'/app/purchaseSupplies'}
                    parentName='Ingresos de insumos'
                />
                <div className="viewTitle">
                    <h1>Resumen ingreso N° {idPurchase}</h1>
                </div>
            </BeShowed>
            <BeShowed show={!idPurchase}>
                <div style={{ display: 'none' }}>{document.title = "Registrar ingreso de insumos"}</div>
                <Breadcrumb
                    icon={faShoppingCart}
                    currentName='Registrar ingreso de insumos'
                    parentLink={'purchaseSupplies'}
                    parentName='Ingresos de insumos'
                />
                <div className="viewTitle">
                    <h1>Registrar Ingreso de Insumos</h1>
                </div>
            </BeShowed>
            <div className="viewBody">
                <PurchaseNumber idPurchase={idPurchase} purchase={purchase}/>
                <PurchaseSupplier idPurchase={idPurchase} purchase={purchase}/>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="numberEmployee" >N°*<small class="text-muted">(no se aceptan duplicados)</small></label>
                    </div>
                    <div className="form-control-input-mw-50">
                        <input
                            className={isValidClassNumber}
                            defaultValue={purchase.number?purchase.number:null}
                            id="numberEmployee"
                            min="1"
                            onChange={handleNumber}
                            onInput={(e) => validateNumber(e)}
                            onKeyDown={(e) => validateFloatNumbers(e)}
                            placeholder="Ingrese number..."
                            disabled={idPurchase}
                            ref={inputNumber}
                            type="number"
                        />
                    </div>
                </div>
                <ListSupplies idPurchase={idPurchase} purchase={purchase}/>
                <BeShowed show={!idPurchase}>
                    <Buttons ready={ready} label={"Registrar"} actionCancel={cancel} actionOK={registerPurchaseSupplies} actionNotOK={validate} />
                </BeShowed>
                <BeShowed show={idPurchase}>
                    <div className='buttons'>
                        <button className='btn btn-light sendOk' onClick={cancel}>Volver</button>
                    </div>
                </BeShowed>
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
