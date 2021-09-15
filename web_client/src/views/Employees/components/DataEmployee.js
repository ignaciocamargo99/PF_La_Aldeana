import React, { useRef, useState, useEffect } from "react";
import validateFloatNumbers from "../../../utils/validateFloatNumbers";

export default function RegisterEmployee(props) {

    const inputName = useRef(null);
    const inputLastName = useRef(null);
    const inputDni = useRef(null);
    const [name, setName] = useState("null");
    const [lastName, setLastName] = useState("null");
    const [dni, setDni] = useState("null");
    const [prevName, setPrevName] = useState("null");
    const [prevLastName, setPrevLastName] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");
    const [isValidClassLastName, setIsValidClassLastName] = useState("form-control");
    const [isValidClassDNI, setIsValidClassDNI] = useState("form-control");

    const handleName = () => {
        setPrevName(name);
        setName(inputName.current.value);
    };

    const handleLastName = () => {
        setPrevLastName(lastName);
        setLastName(inputLastName.current.value);
    };

    const handleDni = () => {
        setDni(inputDni.current.value);
    }

    useEffect(() => {
        const name = inputName.current.value.trim();
        const lastName = inputLastName.current.value.trim();
        const dni = inputDni.current.value.trim();
        if (dni.length === 8) {
            setIsValidClassDNI("form-control is-valid");
            // let data = props.data;
            // data.name = name;
            // props.load(data);
        }
        else if (lastName) {
            setIsValidClassLastName("form-control is-valid");
        }
        else if (name) {
            setIsValidClass("form-control is-valid");
        }
        else {
            setIsValidClass("form-control")
            setIsValidClassLastName("form-control");
            setIsValidClassDNI("form-control");
            // let data = props.data;
            // data.name = name;
            // props.load(data);
        }
    }, [name || lastName || dni]);

    const validate = (e) => {
        if (e.target.value.length > 8) e.target.value = e.target.value.slice(0, 8);
    }

    return (
        <>
            <h2>Datos del empleado</h2>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="employeeName" >Nombre*</label>
                </div>
                <div className="form-control-input">
                    <input className={isValidClass} id="employeeName" autoFocus type="text" maxLength="80" ref={inputName} onChange={handleName} placeholder="Ingrese nombre..." />
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="lastName" >Apellido*</label>
                </div>
                <div className="form-control-input">
                    <input className={isValidClassLastName} id="lastName" type="text" maxLength="80" ref={inputLastName} onChange={handleLastName} placeholder="Ingrese apellido..." />
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="dniEmployee" >DNI*</label>
                </div>
                <div className="form-control-input">
                    <input className={isValidClassDNI} id="dniEmployee" type="number" ref={inputDni} onChange={handleDni} min="1" placeholder="Ingrese DNI..."
                        onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)} />
                </div>
            </div>
        </>
    );
}