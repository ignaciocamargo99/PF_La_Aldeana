import { useEffect, useRef } from "react";

export default function RadioButton(props) {

  const rb = useRef()

  useEffect(() => {
    if (props.checked) {
      rb.current.checked = true;
    }
    else {
      rb.current.checked = false;
    }
  }, [props.checked])


  return (
    <div className="form-check disabled">
      <label className="form-check-label">
        <input type="radio" id={props.id} className="form-check-input" name={props.name} value={props.value} onChange={(e) => { props.handlerOnChange(e) }} ref={rb} />
        {props.descriptionRadio}
      </label>
    </div>
  );
}
