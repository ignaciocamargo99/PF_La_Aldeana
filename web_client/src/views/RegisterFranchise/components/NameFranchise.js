import React, { useEffect, useRef, useState } from "react";

export default function NameFranchise (props) {
    const inputName = useRef(null);
    const [name, setName] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");

    const handleName = () => {
        setName(inputName.current.value);
    }

    useEffect(() => {

        let val = inputName.current.value;
        
        if (val.trim().length > 0 && inputName.current.value.length <= 80) {
            setIsValidClass("form-control is-valid");
            let data = props.data;
            data.name = val.trim();
            props.load(data);
        }
        else {
            setIsValidClass("form-control")
            let data = props.data;
            data.name = "";
            props.load(data);
        }
    }, [name]);

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="name" >Nombre*</label>
            </div>
            <div className="form-control-input">
                <input className={isValidClass} id="name" type="text" maxLength="80" ref={inputName} placeholder="Ingrese nombre de la franquicia..."
                onChange={handleName}/>
            </div>
        </div>
    );
}