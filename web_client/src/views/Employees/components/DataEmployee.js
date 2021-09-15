import React, { useRef, useState, useEffect } from "react";
import validateFloatNumbers from "../../../utils/validateFloatNumbers";

export default function RegisterEmployee(props) {
    const inputName = useRef(null);
    const inputLastName = useRef(null);
    const inputDni = useRef(null);
    const [name, setName] = useState("null");
    const [lastName, setLastName] = useState("null");
    const [dni, setDni] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");
    const [isValidClassLastName, setIsValidClassLastName] = useState("form-control");
    const [isValidClassDNI, setIsValidClassDNI] = useState("form-control");
    let data = props.data;

    const handleName = () => setName(inputName.current.value);
    const handleLastName = () => setLastName(inputLastName.current.value);
    const handleDni = () => setDni(inputDni.current.value);

    useEffect(() => {
        const dni = inputDni.current.value.trim();
        if (dni.length === 8) {
            setIsValidClassDNI("form-control is-valid");
            data.dni = dni;
            props.load(data);
        }
        else{
            setIsValidClassDNI("form-control");
            data.dni = dni;
            props.load(data);
        }
    }, [dni, props, data])

    useEffect(() => {
        const lastName = inputLastName.current.value.trim();
        if (lastName) {
            setIsValidClassLastName("form-control is-valid");
            data.lastName = lastName;
            props.load(data);
        }
        else{
            setIsValidClassLastName("form-control");
            data.lastName = lastName;
            props.load(data);
        }
    }, [lastName, props, data]);

    useEffect(() => {
        const name = inputName.current.value.trim();
        if (name) {
            setIsValidClass("form-control is-valid");
            data.nameEmployee = name;
            props.load(data);
        }
        else {
            setIsValidClass("form-control")
            data.nameEmployee = name;
            props.load(data);
        }
    }, [name, props, data]);

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