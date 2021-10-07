import React, { useRef, useState, useEffect } from "react";
import BeShowed from "../../../../common/BeShowed";
import validateFloatNumbers from "../../../../utils/validateFloatNumbers";

export default function DataAssistance(props) {
    // const inputName = useRef(null);
    // const inputLastName = useRef(null);
    // const inputDni = useRef(null);
    // const [name, setName] = useState("null");
    // const [lastName, setLastName] = useState("null");
    // const [dni, setDni] = useState("null");
    // const [isValidClass, setIsValidClass] = useState("form-control");
    // const [isValidClassLastName, setIsValidClassLastName] = useState("form-control");
    // const [isValidClassDNI, setIsValidClassDNI] = useState("form-control");
    // let data = props.data;

    // const handleName = () => setName(inputName.current.value);
    // const handleLastName = () => setLastName(inputLastName.current.value);
    // const handleDni = () => setDni(inputDni.current.value);

    // useEffect(() => {
    //     const dni = inputDni.current.value.trim();
    //     if (dni.length === 8) {
    //         setIsValidClassDNI("form-control is-valid");
    //         data.dni = dni;
    //         props.load(data);
    //     }
    //     else {
    //         setIsValidClassDNI("form-control");
    //         data.dni = dni;
    //         props.load(data);
    //     }
    // }, [dni, props, data])

    // useEffect(() => {
    //     const lastName = inputLastName.current.value.trim();
    //     if (lastName) {
    //         setIsValidClassLastName("form-control is-valid");
    //         data.lastName = lastName;
    //         props.load(data);
    //     }
    //     else {
    //         setIsValidClassLastName("form-control");
    //         data.lastName = lastName;
    //         props.load(data);
    //     }
    // }, [lastName, props, data]);

    // useEffect(() => {
    //     const name = inputName.current.value.trim();
    //     if (name) {
    //         setIsValidClass("form-control is-valid");
    //         data.nameEmployee = name;
    //         props.load(data);
    //     }
    //     else {
    //         setIsValidClass("form-control")
    //         data.nameEmployee = name;
    //         props.load(data);
    //     }
    // }, [name, props, data]);

    // const validate = (e) => {
    //     if (e.target.value.length > 8) e.target.value = e.target.value.slice(0, 8);
    // }

    return (
        <>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="employeeName" >DNI empleado*</label>
                </div>
                <div className="form-control-input">
                    {/* <BeShowed show={props.data.reading}>
                        <input className={isValidClass} id="employeeName" readOnly type="text" maxLength="80" ref={inputName} defaultValue={props.data.name} />
                    </BeShowed> */}
                    {/* <BeShowed show={!props.data.reading}> */}
                        <input className="form-control" id="employeeName" autoFocus type="number" min="1" placeholder="Número de DNI..." />
                    {/* </BeShowed> */}
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="dateEmployee" >Hora de ingreso*</label>
                </div>
                <div className="form-control-input">
                    {/* <BeShowed show={props.data.reading}>
                        <input className="form-control" id="dateEmployee" readOnly type="date"  />
                    </BeShowed> */}
                    {/* <BeShowed show={!props.data.reading}> */}
                    <input className="form-control" id="dateEmployee" type="time" />
                    {/* </BeShowed> */}
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="dateEmployee" >Hora de egreso*</label>
                </div>
                <div className="form-control-input">
                    {/* <BeShowed show={props.data.reading}>
                        <input className="form-control" id="dateEmployee" readOnly type="date"  />
                    </BeShowed> */}
                    {/* <BeShowed show={!props.data.reading}> */}
                    <input className="form-control" id="dateEmployee" type="time" />
                    {/* </BeShowed> */}
                </div>
            </div>
        </>
    );
}