import React, {useEffect, useRef, useState} from 'react';
import validateSupplier from '../../../utils/Validations/validateSupplier';
import { updatePurchaseSupplier } from '../../../actions/PurchaseSuppliesActions';
import BeShowed from '../../../common/BeShowed';
import { connect } from 'react-redux';

const PurchaseSupplier = (props) => {

    const inputSupplier = useRef(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [prevSupplier, setPrevSupplier] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");

    const handleSupplier = () => {
        setPrevSupplier(props.purchaseSupplier);
        props.updatePurchaseSupplier(inputSupplier.current.value);
    }

    useEffect(() => {
        setErrorMessage(validateSupplier(inputSupplier.current.value));
        props.updatePurchaseSupplier("null");
        if (inputSupplier.current.value.trim().length > 0 && inputSupplier.current.value.length <= 100) {
            setIsValidClass("form-control is-valid");
            props.updatePurchaseSupplier(inputSupplier.current.value)
        } else if (prevSupplier !== "null") {
            setIsValidClass("form-control is-invalid");
        }
    }, [props.purchaseSupplier]);

    return(
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="purchaseSupplier" >Proveedor*</label>
            </div>
            <div className="form-control-input-mw-50">
                <input className={isValidClass} id="purchaseSupplier" type="text" ref={inputSupplier} disabled={props.idPurchase}
                placeholder="Ingrese el proveedor" maxLength="100" onChange={handleSupplier} 
                defaultValue={props.purchase.supplier?props.purchase.supplier:null}>
                </input>
                <BeShowed show={errorMessage !== "null" && prevSupplier !== "null"}>
                    <div><b style={{ color: 'red' }}>{errorMessage}</b></div>
                </BeShowed>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        purchaseSupplier: state.purchaseSupplier
    }
}

const mapDispatchToProps = {
    updatePurchaseSupplier
}


export default connect(mapStateToProps, mapDispatchToProps)(PurchaseSupplier);