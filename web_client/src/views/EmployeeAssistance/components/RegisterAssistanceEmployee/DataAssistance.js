import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import BeShowed from "../../../../common/BeShowed";
import formattedDate from "../../../../utils/formattedDate";

const PORT = require("../../../../config");

export default function DataAssistance(props) {
  const inputDateEntry = useRef(null);
  const divTimeEntryValidation = useRef(null);
  const divTimeEgressValidation = useRef(null);
  const inputDateEgress = useRef(null);
  const inputTimeEntry = useRef(null);
  const inputTimeEgress = useRef(null);
  const [selectValue, setSelectValue] = useState("-1");
  const [dateEntry, setDateEntry] = useState(null);
  const [maxDateEgress, setMaxDateEgress] = useState(null);
  const [minDateEgress, setMinDateEgress] = useState(null);
  const [maxTimeEgress, setMaxTimeEgress] = useState(null);
  const [minTimeEgress, setMinTimeEgress] = useState(null);
  const [minTimeEntry, setMinTimeEntry] = useState(null);
  const [maxTimeEntry, setMaxTimeEntry] = useState(null);
  const [employees, setEmployees] = useState([]);
  let data = props.data;

  useEffect(() => {
    Axios.get(`${PORT()}/api/employees/v2/date_entry/${dateEntry}`).then((response) =>setEmployees(response.data));
  }, [dateEntry]);

  const handleEmployee = (e) => setSelectValue(e.target.value);

  const handleTimeEntry = () => {
    if (
      inputDateEntry.current.value &&
      (inputTimeEntry.current.value < "07:00" ||
        inputTimeEntry.current.value > "23:59")
    ) {
      divTimeEntryValidation.current.innerHTML =
        "El ingreso puede ser registrado de 7 A.M. a 23:59 P.M. dentro del mismo día";
      data.validationEntry = true;
      props.load(data);
    } else {
      divTimeEntryValidation.current.innerHTML = "";
      data.date_entry = inputTimeEntry.current.value;
      data.validationEntry = false;
      props.load(data);
    }
  };

  const handleTimeEgress = () => {
    if (
      inputDateEgress.current.value &&
      inputDateEntry.current.value !== inputDateEgress.current.value
    ) {
      if (inputTimeEgress.current.value > "04:00") {
        divTimeEgressValidation.current.innerHTML =
          "La hora de egreso debe encontrarse entre las 00 A.M. y 4 A.M.";
        data.validationEgress = true;
        props.load(data);
      } else {
        divTimeEgressValidation.current.innerHTML = "";
        data.date_egress = inputTimeEgress.current.value;
        data.validationEgress = false;
        props.load(data);
      }
    } else if (
      inputDateEgress.current.value &&
      inputDateEntry.current.value === inputDateEgress.current.value
    ) {
      divTimeEgressValidation.current.innerHTML = "";
      data.date_egress = inputTimeEgress.current.value;
      data.validationEgress = false;
      props.load(data);
    }
  };

  const handleDateEntry = (e) => {
    setDateEntry(e.target.value);
    inputDateEntry.current.value = e.target.value;
    inputDateEgress.current.value = "";
    inputTimeEgress.current.value = "";
    data.inputDateEntry = inputDateEntry.current.value;
    data.inputDateEgress = inputDateEgress.current.value;
    data.date_egress = inputTimeEgress.current.value;
    props.load(data);
  };

  const handleDateEgress = () => {
    inputTimeEgress.current.value = "";
    if (inputDateEntry.current.value < inputDateEgress.current.value) {
      setMaxTimeEgress("04:00");
      setMinTimeEgress("00:00");
    } else {
      setMaxTimeEgress("23:59");
      setMinTimeEgress("07:00");
    }
    setMinTimeEntry("07:00");
    setMaxTimeEntry("23:59");
    data.inputDateEgress = inputDateEgress.current.value;
    data.date_egress = inputTimeEgress.current.value;
    if (inputDateEgress.current.value === "") data.date_egress = null;
    props.load(data);
  };

  useEffect(() => {
    if (!props.data.reading) {
      let employee = null;
      if (selectValue) employee = selectValue;
      data.employee = employee;
      props.load(data);
    }
  }, [selectValue, data]);

  useEffect(() => {
    let inputDateEntryConverted = Date.parse(inputDateEntry.current.value);
    let maxDateEgressCondition = formattedDate(
      new Date(inputDateEntryConverted),
      0,
      2
    );
    setMaxDateEgress(maxDateEgressCondition);
    setMinDateEgress(inputDateEntry.current.value);
  }, [dateEntry]);

  return (
    <>
      <div className="formRow">
        <div className="form-control-label">
          <label htmlFor="employeeCharge">Empleado*</label>
        </div>
        <div className="form-control-input">
          <BeShowed show={props.data.reading || props.data.editing}>
            <select
              className="form-control"
              id="employeeCharge"
              value={selectValue}
              readOnly
            >
              <option disabled value="-1">
                {data.name + " " + data.last_name}
              </option>
            </select>
          </BeShowed>
          <BeShowed show={!props.data.reading && !props.data.editing}>
            <select
              className="form-control"
              id="employeeCharge"
              value={selectValue}
              onChange={handleEmployee}
            >
              <option disabled value="-1">
                Seleccione un empleado
              </option>
              {employees?.map((element, i) => {
                return (
                  <option key={i} value={element.dni}>
                    {element.name} {element.last_name}
                  </option>
                );
              })}
            </select>
          </BeShowed>
        </div>
      </div>
      <div className="formRow">
        <div className="form-control-label">
          <label htmlFor="dateEmployee">Fecha de ingreso*</label>
        </div>
        <div className="form-control-input">
          <BeShowed show={props.data.reading}>
            <input
              className="form-control"
              id="dateEmployee"
              type="date"
              readOnly
              ref={inputDateEntry}
              defaultValue={props.data.inputDateEntry}
              onChange={handleDateEntry}
            />
          </BeShowed>
          <BeShowed show={!props.data.reading}>
            <input
              className="form-control"
              id="dateEmployee"
              type="date"
              ref={inputDateEntry}
              onChange={handleDateEntry}
              defaultValue={props.data.inputDateEntry}
            />
          </BeShowed>
        </div>
      </div>
      <div className="formRow">
        <div className="form-control-label">
          <label htmlFor="dateEmployee">Hora de ingreso*</label>
        </div>
        <div className="form-control-input">
          <BeShowed show={props.data.reading}>
            <input
              className="form-control"
              id="dateEmployee"
              readOnly
              type="time"
              ref={inputTimeEntry}
              defaultValue={props.data.date_entry}
              onChange={handleTimeEntry}
            />
          </BeShowed>
          <BeShowed show={!props.data.reading}>
            <input
              className="form-control"
              id="dateEmployee"
              type="time"
              ref={inputTimeEntry}
              onChange={handleTimeEntry}
              defaultValue={props.data.date_entry}
              min={minTimeEntry}
              max={maxTimeEntry}
            />
            <div
              style={{ color: "red", fontFamily: "Abel", fontWeight: "bold" }}
              ref={divTimeEntryValidation}
            />
          </BeShowed>
        </div>
      </div>
      <div className="formRow">
        <div className="form-control-label">
          <label htmlFor="dateEmployee">Fecha de egreso</label>
        </div>
        <div className="form-control-input">
          <BeShowed show={props.data.reading}>
            <input
              className="form-control"
              id="dateEmployee"
              type="date"
              readOnly
              ref={inputDateEgress}
              max={maxDateEgress}
              min={minDateEgress}
              onChange={handleDateEgress}
              defaultValue={props.data.inputDateEgress}
            />
          </BeShowed>
          <BeShowed show={!props.data.reading}>
            <input
              className="form-control"
              id="dateEmployee"
              type="date"
              ref={inputDateEgress}
              max={maxDateEgress}
              min={minDateEgress}
              onChange={handleDateEgress}
              defaultValue={props.data.inputDateEgress}
            />
          </BeShowed>
        </div>
      </div>
      <div className="formRow">
        <div className="form-control-label">
          <label htmlFor="dateEmployee">Hora de egreso</label>
        </div>
        <div className="form-control-input">
          <BeShowed show={props.data.reading}>
            <input
              className="form-control"
              id="dateEmployee"
              readOnly
              type="time"
              ref={inputTimeEgress}
              defaultValue={
                props.data.date_egress ? props.data.date_egress : "null"
              }
              onChange={handleTimeEgress}
            />
          </BeShowed>
          <BeShowed show={!props.data.reading}>
            <input
              className="form-control"
              id="dateEmployee"
              type="time"
              ref={inputTimeEgress}
              onChange={handleTimeEgress}
              defaultValue={
                props.data.date_egress ? props.data.date_egress : "null"
              }
              min={minTimeEgress}
              max={maxTimeEgress}
            />
            <div
              style={{ color: "red", fontFamily: "Abel", fontWeight: "bold" }}
              ref={divTimeEgressValidation}
            />
          </BeShowed>
        </div>
      </div>
    <label style={{color:'#F68634', fontWeight: 'bold' }}>Tenga en cuenta que solo puede registrar la asistencia de empleados cuya fecha de admisión a la empresa es menor a la fecha de ingreso seleccionada</label>
    </>
  );
}
