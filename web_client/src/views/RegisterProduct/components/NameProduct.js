import React, { useRef, useState, useEffect } from "react";
import BeShowed from "../../../common/BeShowed";
import validateName from '../../../utils/Validations/validateName';

const NameProduct = (props) => {
    const inputName = useRef(null);

    const [errorMessage, setErrorMessage] = useState("");
    const [name, setName] = useState("null");
    const [prevName, setPrevName] = useState("null");

    const handleName = () => {
        setPrevName(name);
        setName(inputName.current.value);
    }

    useEffect(() => {
        setErrorMessage(validateName(inputName.current.value));
        if (inputName.current.value.length > 0 && inputName.current.value.length <= 80) {

            let data = props.data;
            
            data.name = inputName.current.value;

            props.load(data);
        }
    }, [name]);

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="productName" >Nombre*</label>
            </div>
            <div className="form-control-input">
                <input className="form-control" id="productName" type="text" ref={inputName} placeholder="Ingrese nombre del producto..." onChange={handleName}>
                </input>
                <BeShowed show={errorMessage !== "null" && prevName !== "null"}>
                    <div style={{ color: 'red' }}>{errorMessage}</div>
                </BeShowed>
            </div>
        </div>
    );
}

export default NameProduct;