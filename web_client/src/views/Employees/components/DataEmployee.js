import React, { useRef, useState, useEffect } from "react";
import validateFloatNumbers from "../../../utils/validateFloatNumbers";

export default function DataEmployee(props) {

    const inputDni = useRef(null);
    const inputLastName = useRef(props.data.last_name);
    const inputName = useRef(props.data.name);

    const [dni, setDni] = useState("null");
    const [isValidClass, setIsValidClass] = useState("form-control");
    const [isValidClassDNI, setIsValidClassDNI] = useState("form-control");
    const [isValidClassLastName, setIsValidClassLastName] = useState("form-control");
    const [lastName, setLastName] = useState(props.data.last_name);
    const [name, setName] = useState(props.data.name);

    let data = props.data;

    const handleName = () => setName(inputName.current.value.trim());
    const handleLastName = () => setLastName(inputLastName.current.value.trim());
    const handleDni = () => setDni(inputDni.current.value);

    useEffect(() => {
        if (props.isReadingEmployeeData) return;

        const dni = inputDni.current.value.trim();
        if (dni.length === 8) {
            setIsValidClassDNI("form-control is-valid");
            data.dni = +dni;
            props.load(data);
        }
        else {
            setIsValidClassDNI("form-control");
            data.dni = dni;
            props.load(data);
        }
    }, [dni, props, data])

    useEffect(() => {
        if (props.isReadingEmployeeData) return;

        if (lastName) {
            setIsValidClassLastName("form-control is-valid");
        }
        else {
            setIsValidClassLastName("form-control");
        }

        data.last_name = lastName;
        props.load(data);
    }, [lastName]);

    useEffect(() => {
        if (props.isReadingEmployeeData) return;

        if (name) {
            setIsValidClass("form-control is-valid");
        }
        else {
            setIsValidClass("form-control")
        }

        props.data.name = name;
        props.load(data);
    }, [name]);

    const validate = (e) => {
        if (e.target.value.length > 8) e.target.value = e.target.value.slice(0, 8);
    }

    return (
        <>
            <h2>Datos del empleado/a</h2>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="nameEmployee" >Nombre*</label>
                </div>
                <div className="form-control-input">
                    <input
                        autoFocus={!props.isReadingEmployeeData}
                        className={isValidClass}
                        defaultValue={props.data.name}
                        id="nameEmployee"
                        maxLength="80"
                        onChange={handleName}
                        placeholder="Ingrese nombre..."
                        readOnly={props.isReadingEmployeeData}
                        ref={inputName}
                        type="text"
                    />
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="lastNameEmployee" >Apellido*</label>
                </div>
                <div className="form-control-input">
                    <input
                        className={isValidClassLastName}
                        defaultValue={props.data.last_name}
                        id="lastNameEmployee"
                        maxLength="80"
                        onChange={handleLastName}
                        placeholder="Ingrese apellido..."
                        readOnly={props.isReadingEmployeeData}
                        ref={inputLastName}
                        type="text"
                    />
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="dniEmployee" >DNI*</label>
                </div>
                <div className="form-control-input">
                    <input
                        className={isValidClassDNI}
                        defaultValue={props.data.dni}
                        id="dniEmployee"
                        min="1"
                        onChange={handleDni}
                        onInput={(e) => validate(e)}
                        onKeyDown={(e) => validateFloatNumbers(e)}
                        placeholder="Ingrese DNI..."
                        readOnly={props.isReadingEmployeeData || props.isEditingEmployeeData}
                        ref={inputDni}
                        type="number"
                    />
                </div>
            </div>
        </>
    );
}