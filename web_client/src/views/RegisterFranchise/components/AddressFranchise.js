import React, { useEffect, useRef, useState } from "react";

export default function AddressFranchise (props) {
    const inputAddress = useRef(null);
    const [address, setAddress] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");

    const handleAddress = () => {
        setAddress(inputAddress.current.value);
    }

    useEffect(() => {

        let val = inputAddress.current.value;
        
        if (val.trim().length > 0 && inputAddress.current.value.length <= 80) {
            setIsValidClass("form-control is-valid");
            let data = props.data;
            data.address = val.trim();
            props.load(data);
        }
        else {
            setIsValidClass("form-control")
            let data = props.data;
            data.address = "";
            props.load(data);
        }
    }, [address, props]);

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="address" >Dirección*</label>
            </div>
            <div className="form-control-input">
                <input className={isValidClass} id="address" type="text" maxLength="80" ref={inputAddress} placeholder="Ingrese dirección de la franquicia..."
                onChange={handleAddress}/>
            </div>
        </div>
    );
}