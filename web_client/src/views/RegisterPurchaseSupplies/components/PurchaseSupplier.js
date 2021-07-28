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
        if (inputSupplier.current.value.length > 0 && inputSupplier.current.value.length < 100) {
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
            <div className="form-control-input">
                <input className={isValidClass} id="purchaseSupplier" type="text" ref={inputSupplier} placeholder="Ingrese el proveedor" onChange={handleSupplier}>
                </input>
                <BeShowed show={errorMessage !== "null" && prevSupplier !== "null"}>
                    <div style={{ color: 'red' }}>{errorMessage}</div>
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