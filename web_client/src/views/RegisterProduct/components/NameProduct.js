import React, { useEffect, useRef, useState } from "react";
import BeShowed from "../../../common/BeShowed";

const NameProduct = (props) => {
    const inputName = useRef(null);
    const [name, setName] = useState("null");
    const [prevName, setPrevName] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");

    const handleName = () => {
        setPrevName(name);
        setName(inputName.current.value);
    }

    useEffect(() => {
        if (inputName.current.value.length > 0 && inputName.current.value.length <= 80) {
            setIsValidClass("form-control is-valid");
            let data = props.data;
            data.name = inputName.current.value;
            props.load(data);
        }
        else {
            setIsValidClass("form-control")
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
                <input className={isValidClass} id="productName" type="text" maxLength="80" ref={inputName} placeholder="Ingrese nombre del producto..." onChange={handleName}
                    defaultValue={props.data.name} />
            </div>
        </div>
    );
}

export default NameProduct;