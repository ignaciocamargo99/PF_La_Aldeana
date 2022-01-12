import React, { useEffect, useRef, useState } from "react";
import BeShowed from "../../../common/BeShowed";
import { getCharges } from "../../../helpers/getCharges";
import formattedDate from "../../../utils/formattedDate";
import ChargeCheckbox from "./ChargeCheckbox";

export default function ExtraDataEmployee(props) {
    const [date, setDate] = useState();
    const [allCharges, setAllCharges] = useState([]);
    const inputDate = useRef(null);
    const rb1 = useRef(null);
    const rb2 = useRef(null);
    const maxDate = formattedDate(new Date(), 3);
    const startDate = formattedDate(new Date());
    let data = props.data;

    useEffect(() => {
        if (!data.date) {
            data.date = inputDate.current.value;
            props.load(data);
        }
    }, [data, props]);

    useEffect(() => {
        if (props.data.employmentRelationshipId === 1) {
            rb1.current.checked = false;
            rb2.current.checked = true;
        } else if (props.data.employmentRelationshipId === 2) {
            rb1.current.checked = true;
            rb2.current.checked = false;
        } else {
            rb1.current.checked = false;
            rb2.current.checked = false;
        }
    })

    useEffect(() => {
        if (!inputDate.current.value && !props.data.editing) {
            inputDate.current.value = startDate;
            setDate(inputDate.current.value);
            data.date = inputDate.current.value;
            props.load(data);
        }
        else if (!inputDate.current.value && props.data.editing) {
            inputDate.current.value = props.data.date;
            setDate(inputDate.current.value);
        }
        else {
            data.date = inputDate.current.value;
            props.load(data);
        }
    }, [startDate, date, data]);

    const onChangeDate = () => {
        if (inputDate) setDate(inputDate.current.value);
    }

    const handlerOnChange = (e) => {
        if (e.target.value === "black") data.employmentRelationshipId = 2;
        else data.employmentRelationshipId = 1;
        props.data.editing = false;
        props.load(data);
    }

    useEffect(() => {
        getCharges().then((charges) => {
            setAllCharges(charges);
        })
    }, []);

    return (
        <>
            <h2>Datos laborales</h2>

            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="employeeCharge" >Cargos*</label>
                </div>
            </div>

            {!props.data.reading && allCharges.map((c) => {
                if (props.data.editing) {
                    return (
                        <ChargeCheckbox
                            key={c.id_charge}
                            chargeId={c.id_charge}
                            chargeName={c.name}
                            employeeData={data}
                            updateEmployeeData={props.load}
                        ></ChargeCheckbox>
                    )
                }
                else {
                    return (
                        <ChargeCheckbox
                            key={c.id_charge}
                            chargeId={c.id_charge}
                            chargeName={c.name}
                            employeeData={data}
                            updateEmployeeData={props.load}
                        ></ChargeCheckbox>
                    )
                }
            })}

            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="dateEmployee" >Fecha de ingreso*</label>
                </div>
                <div className="form-control-input">
                    <BeShowed show={props.data.reading}>
                        <input className="form-control" id="dateEmployee" readOnly type="date" ref={inputDate} defaultValue={props.data.date} />
                    </BeShowed>
                    <BeShowed show={!props.data.reading}>
                        <input className="form-control" id="dateEmployee" type="date" ref={inputDate} onChange={onChangeDate} min={"2001-01-01"} max={maxDate} defaultValue={props.data.date} />
                    </BeShowed>
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label>Relación laboral*</label>
                </div>
                <div className="d-flex form-radio-group">
                    <div className="form-check form-radio">
                        <BeShowed show={props.data.reading}>
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="black" value="black" ref={rb1} disabled></input>
                        </BeShowed>
                        <BeShowed show={!props.data.reading}>
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="black" value="black" ref={rb1} onChange={handlerOnChange}></input>
                        </BeShowed>
                        <label className="form-check-label" htmlFor="black"> Monotributista </label>
                    </div>

                    <div className="form-check">
                        {props.data.reading && (
                            <input
                                className="form-check-input"
                                disabled
                                id="white"
                                name="flexRadioDefault"
                                ref={rb2}
                                type="radio"
                                value="white"
                            >
                            </input>
                        )}
                        {!props.data.reading && (
                            <input
                                className="form-check-input"
                                id="white"
                                name="flexRadioDefault"
                                onChange={handlerOnChange}
                                ref={rb2}
                                type="radio"
                                value="white"
                            >
                            </input>
                        )}

                        <label className="form-check-label" htmlFor="white"> Relación de dependencia </label>
                    </div>
                </div>
            </div>
        </>
    );
}