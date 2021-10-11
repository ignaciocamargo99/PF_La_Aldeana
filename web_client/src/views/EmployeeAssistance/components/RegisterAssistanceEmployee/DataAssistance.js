import React, { useRef, useState, useEffect } from "react";
import BeShowed from "../../../../common/BeShowed";
import validateFloatNumbers from "../../../../utils/validateFloatNumbers";

export default function DataAssistance(props) {
    const [isValidClassDNI, setIsValidClassDNI] = useState("form-control");
    const [dni, setDni] = useState("null");
    const [dateEntry, setDateEntry] = useState("null");
    const [dateEgress, setDateEgress] = useState("null");
    const inputDni = useRef(null);
    const inputDateEntry = useRef(null);
    const inputDateEgress = useRef(null);
    let data = props.data;

    const handleDni = () => setDni(inputDni.current.value);
    const handleDateEntry = () => {
        setDateEntry(inputDateEntry.current.value);
        data.date_entry = inputDateEntry.current.value;
        props.load(data);
    }
    const handleDateEgress = () => {
        setDateEgress(inputDateEgress.current.value);
        data.date_egress = inputDateEgress.current.value;
        props.load(data);
    }

    useEffect(() => {
        const dni = inputDni.current.value.trim();
        if (dni.length === 8) {
            setIsValidClassDNI("form-control is-valid");
            data.employee = dni;
            props.load(data);
        }
        else {
            setIsValidClassDNI("form-control");
            data.employee = dni;
            props.load(data);
        }
    }, [dni])

    const validate = (e) => {
        if (e.target.value.length > 8) e.target.value = e.target.value.slice(0, 8);
    }
    


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
                    <input className={isValidClassDNI} id="dniEmployee" type="number" ref={inputDni} onChange={handleDni} min="1" placeholder="Ingrese DNI..." onKeyDown={(e) => validateFloatNumbers(e)} onInput={(e) => validate(e)} />

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
                    <input className="form-control" id="dateEmployee" type="time" ref={inputDateEntry} onChange={handleDateEntry} />
                    {/* </BeShowed> */}
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="dateEmployee" >Hora de egreso</label>
                </div>
                <div className="form-control-input">
                    {/* <BeShowed show={props.data.reading}>
                        <input className="form-control" id="dateEmployee" readOnly type="date"  />
                    </BeShowed> */}
                    {/* <BeShowed show={!props.data.reading}> */}
                    <input className="form-control" id="dateEmployee" type="time" ref={inputDateEgress} onChange={handleDateEgress} />
                    {/* </BeShowed> */}
                </div>
            </div>
        </>
    );
}