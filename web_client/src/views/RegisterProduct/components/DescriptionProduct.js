import React, { useRef, useState, useEffect } from "react";
import BeShowed from "../../../common/BeShowed";
import validateDescription from "../../../utils/Validations/validateDescription";

const DescriptionProduct = (props) => {
    const inputDescription = useRef(null);

    const [errorMessage, setErrorMessage] = useState("");
    const [description, setDescription] = useState("null");
    const [prevDescription, setPrevDescription] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");

    const handleDescription = () => {
        setPrevDescription(description);
        setDescription(inputDescription.current.value);
    }

    useEffect(() => {
        setErrorMessage(validateDescription(inputDescription.current.value));
        if (inputDescription.current.value.length < 200) {
            if (inputDescription.current.value.length > 0) setIsValidClass("form-control is-valid");
            let data = props.data;
            data.description = inputDescription.current.value;
            props.load(data);
        } else if (prevDescription !== "null") {
            setIsValidClass("form-control is-invalid");
            let data = props.data;
            data.description = "error";
            props.load(data);
        }
    }, [description]);

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="productDescription">Descripción</label>
            </div>
            <div className="form-control-input">
                <textarea ref={inputDescription} className={isValidClass} id="productDescription" placeholder="Ingrese descripción del producto..." rows="3" onChange={handleDescription}></textarea>
                <BeShowed show={errorMessage !== "null" && prevDescription !== "null"}>
                    <div style={{ color: 'red' }}>{errorMessage}</div>
                </BeShowed>
            </div>
        </div>
    );
}

export default DescriptionProduct;