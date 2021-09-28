import React, { useRef, useEffect, useState } from "react";
import formattedDate from "../../../utils/formattedDate";
import Axios from 'axios';
import getNameCharge from "../../Employees/components/EditEmployee/getNameCharge";
import BeShowed from "../../../common/BeShowed";

const PORT = require('../../../config');

export default function ExtraDataAdvances(props) {
    const maxDate = formattedDate(new Date(), 3);
    const startDate = formattedDate(new Date());
    const inputDate = useRef(null);
    const [charge, setCharge] = useState();
    const [date, setDate] = useState();
    const [selectValue, setSelectValue] = useState("-1");
    const rb1 = useRef(null);
    const rb2 = useRef(null);
    let data = props.data;

    const handleCharge = (e) => setSelectValue(e.target.value);

    useEffect(() => {
        if (selectValue > 0) {
            data.id_charge = selectValue;
            props.load(data);
        }
        if (!data.date) {
            data.date = inputDate.current.value;
            props.load(data);
        }
    }, [selectValue, data, props]);

    useEffect(() => {
        if (props.data.employmentRelationship === 1) {
            rb1.current.checked = false;
            rb2.current.checked = true;
        } else if (props.data.employmentRelationship === 2) {
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
        Axios.get(`${PORT()}/api/charges`)
            .then((response) => setCharge(response.data))
            .catch((error) => console.log(error));
    }, [startDate, date, data]);

    const onChangeDate = () => {
        if (inputDate) setDate(inputDate.current.value);
    }

    const handlerOnChange = (e) => {
        if (e.target.value === "black") data.employmentRelationship = 2;
        else data.employmentRelationship = 1;
        props.data.editing = false;
        props.load(data);
    }

    return (
        <>
            <h2>Datos laborales</h2>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="employeeCharge" >Cargo*</label>
                </div>
                <div className="form-control-input">
                    <BeShowed show={props.data.reading}>
                        <select className="form-control" id="employeeCharge" value={selectValue} readOnly>
                            <option disabled value="-1">{getNameCharge(charge, props.data.charge)}</option>
                        </select>
                    </BeShowed>
                    <BeShowed show={!props.data.reading}>
                        <select className="form-control" id="employeeCharge" value={selectValue} onChange={handleCharge}>
                            <BeShowed show={props.data.id_charge && props.data.editing }>
                                <option disabled value="-1">{getNameCharge(charge, props.data.id_charge)}</option>
                            </BeShowed>
                            <BeShowed show={!props.data.id_charge || !props.data.editing}>
                                <option disabled value="-1">Seleccione cargo del empleado...</option>
                            </BeShowed>
                            {charge?.map((element, i) => {
                                return (<option key={i} value={element.id_charge}>{element.name}</option>)
                            })}
                        </select>
                    </BeShowed>
                </div>
            </div>
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
                        <label className="form-check-label" htmlFor="black"> Sin recibo de sueldo </label>
                    </div>
                    <div className="form-check">
                        <BeShowed show={props.data.reading}>
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="white" value="white" ref={rb2} disabled></input>
                        </BeShowed>
                        <BeShowed show={!props.data.reading}>
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="white" value="white" ref={rb2} onChange={handlerOnChange}></input>
                        </BeShowed>
                        <label className="form-check-label" htmlFor="white">Con recibo de sueldo </label>
                    </div>
                </div>
            </div>
        </>
    );
}