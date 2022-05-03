import React, { useRef, useState, useEffect } from "react";
import validateFloatNumbers from "../../../utils/validateFloatNumbers";

export default function DataEmployee(props) {

    const inputDni = useRef(null);
    const inputCuil = useRef(null);
    const inputLastName = useRef(props.data.last_name);
    const inputName = useRef(props.data.name);
    const inputAlias = useRef(null);
    const inputBirthday = useRef(null);
    const inputPhone = useRef(null);

    const [dni, setDni] = useState("null");
    const [cuil, setCuil] = useState("null");
    const [birthday, setBirthday] = useState("null");
    const [phone, setPhone] = useState("null");
    const [alias, setAlias] = useState(props.data.alias);
    const [isValidClass, setIsValidClass] = useState("form-control");
    const [isValidClassAlias, setIsValidClassAlias] = useState("form-control");
    const [isValidClassPhone, setIsValidClassPhone] = useState("form-control");
    const [isValidClassBirthday, setIsValidClassBirthday] = useState("form-control");
    const [isValidClassDNI, setIsValidClassDNI] = useState("form-control");
    const [isValidClassCuil, setIsValidClassCuil] = useState("form-control");
    const [isValidClassLastName, setIsValidClassLastName] = useState("form-control");
    const [lastName, setLastName] = useState(props.data.last_name);
    const [name, setName] = useState(props.data.name);

    let data = props.data;

    const handleName = () => setName(inputName.current.value.trim());
    const handleLastName = () => setLastName(inputLastName.current.value.trim());
    const handleDni = () => setDni(inputDni.current.value);
    const handleCuil = () => setCuil(inputCuil.current.value);
    const handleAlias = () => setAlias(inputAlias.current.value);
    const handleBirthday = () => setBirthday(inputBirthday.current.value);
    const handlePhone = () => setPhone(inputPhone.current.value);

    const validateCuilDNI = (dni, cuil) => {return cuil.slice(2,-1) === dni;}

    useEffect(() => {
        if (props.isReadingEmployeeData) return;

        const dni = inputDni.current.value.trim();
        const cuil = inputCuil.current.value.trim();
        if (dni.length === 8) {
            setIsValidClassDNI("form-control is-valid");
            setIsValidClassCuil("form-control");
            data.dni = +dni;
            data.cuil = null;
            if (cuil.length === 11 && validateCuilDNI(dni, cuil)){
                setIsValidClassCuil("form-control is-valid");
                data.cuil = +cuil;
            }
            props.load(data);
        }
        else {
            setIsValidClassDNI("form-control");
            data.dni = dni;
            props.load(data);
        }
    }, [dni, props, data, cuil])

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

        if (name) setIsValidClass("form-control is-valid");
        else setIsValidClass("form-control");

        props.data.name = name;
        props.load(data);
    }, [name]);

    useEffect(() => {
        if (props.isReadingEmployeeData) return;

        if (alias) setIsValidClassAlias("form-control is-valid");
        else setIsValidClassAlias("form-control");

        props.data.alias = alias;
        props.load(data);
    }, [alias]);

    useEffect(() => {
        if (props.isReadingEmployeeData) return;

        const phone = inputPhone.current.value.trim();

        if (phone.length === 10) {
            setIsValidClassPhone("form-control is-valid");
            data.phone = +phone;
            props.load(data);
        }
        else {
            setIsValidClassPhone("form-control");
            props.data.phone = phone;
            props.load(data);
        }
    }, [phone]);

    const validate = (e) => {
        if (e.target.value.length > 8) e.target.value = e.target.value.slice(0, 8);
    }
    const validateCuil = (e) => {
        if (e.target.value.length > 11) e.target.value = e.target.value.slice(0, 11);
    }
    const validatePhone = (e) => {
        if (e.target.value.length > 10) e.target.value = e.target.value.slice(0, 10);
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
                        disabled={props.isReadingEmployeeData}
                        ref={inputName}
                        type="text"
                    />
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="aliasEmployee" >Alias</label>
                </div>
                <div className="form-control-input">
                    <input
                        autoFocus={!props.isReadingEmployeeData}
                        className={isValidClassAlias}
                        defaultValue={props.data.alias}
                        id="aliasEmployee"
                        maxLength="80"
                        onChange={handleAlias}
                        placeholder="Ingrese alias..."
                        disabled={props.isReadingEmployeeData}
                        ref={inputAlias}
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
                        disabled={props.isReadingEmployeeData}
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
                        disabled={props.isReadingEmployeeData || props.isEditingEmployeeData}
                        ref={inputDni}
                        type="number"
                    />
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="cuilEmployee" >CUIL/CUIT*</label>
                </div>
                <div className="form-control-input">
                    <input
                        className={isValidClassCuil}
                        defaultValue={props.data.cuil}
                        id="cuilEmployee"
                        min="1"
                        onChange={handleCuil}
                        onInput={(e) => validateCuil(e)}
                        onKeyDown={(e) => validateFloatNumbers(e)}
                        placeholder="Ingrese CUIL/CUIT..."
                        disabled={props.isReadingEmployeeData || props.isEditingEmployeeData}
                        ref={inputCuil}
                        type="number"
                    />
                </div>
            </div><div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="phoneEmployee" >Teléfono*</label>
                </div>
                <div className="form-control-input">
                    <input
                        className={isValidClassPhone}
                        defaultValue={props.data.phone}
                        id="phoneEmployee"
                        min="1"
                        onChange={handlePhone}
                        onInput={(e) => validatePhone(e)}
                        onKeyDown={(e) => validateFloatNumbers(e)}
                        placeholder="Ingrese número de teléfono..."
                        disabled={props.isReadingEmployeeData || props.isEditingEmployeeData}
                        ref={inputPhone}
                        type="number"
                    />
                </div>
            </div>
        </>
    );
}