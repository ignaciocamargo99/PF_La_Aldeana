import React, { useState, useRef } from "react";
import { useEffect } from "react";
import BeShowed from "../../../common/BeShowed";

const UploadByName = (props) => {
  const input = useRef(null);
  const [showOptions, setShowOptions] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [listEmployees, setListEmployees] = useState(props.list);

  useEffect(() => {setListEmployees(props.list)}, [props.list]);

  const upload = () => {
    let x = -1;
    listEmployees.forEach((item) => {
      if (item.name.toUpperCase() === input.current.value.toUpperCase()) {
        x = item.dni;
      }
    });
    if (x !== -1) {
      props.upload(x);
    } else {
      setErrorMessage(`El ${props.itemName} no se encuentra disponible`);
    }
  };

  const updateShowOptions = () => {
    setErrorMessage(null);
    setShowOptions(true);
    upload();
  };

  useEffect(() => {
    const lastEmployee = listEmployees.filter(
      (item) => item.name === input.current.value
    );
    const firstEmployee = listEmployees[0];
    if (lastEmployee.length > 0) {
      input.current.value = lastEmployee[0].name;
      input.current.innerHTML = lastEmployee[0].name;
      props.upload(lastEmployee[0].dni);
    } else if (firstEmployee && lastEmployee.length === 0) {
      input.current.value = firstEmployee.name;
      input.current.innerHTML = firstEmployee.name;
      props.upload(firstEmployee.dni);
    } else {
      input.current.value = "";
      input.current.innerHTML = "";
    }
  }, [props.date.current && props.date.current.value && listEmployees]);

  return (
    <>
      <BeShowed show={showOptions}>
        <datalist id={listEmployees}>
          {listEmployees.map((item, i) => {
            return <option value={item.name} key={i}></option>;
          })}
        </datalist>
      </BeShowed>
      <div className="form-control-input">
        <input
          className={errorMessage ? "form-control is-invalid" : props.className}
          style={{ maxWidth: "100em", marginLeft: "auto" }}
          type="search"
          list={listEmployees}
          placeholder={props.placeholder}
          maxLength={props.maxLength}
          ref={input}
          onChange={updateShowOptions}
          defaultValue={props.default}
        />
        <BeShowed show={errorMessage !== "null"}>
          <div>
            <b style={{ color: "red" }}>{errorMessage}</b>
          </div>
        </BeShowed>
      </div>
    </>
  );
};

export default UploadByName;
