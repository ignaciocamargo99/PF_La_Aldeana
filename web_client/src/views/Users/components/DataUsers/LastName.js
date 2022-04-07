import React, { useRef, useState } from 'react';
import BeShowed from '../../../../common/BeShowed';

const LastName = (props) => {
    const lastName = useRef(null);
    const [isValidClass, setIsValidClass] = useState("form-control");
    let data = props.data;

    const onChangeLastName = () => {
        const last_name = lastName.current.value.trim();
        if (last_name) {
            setIsValidClass("form-control is-valid");
            data.last_name = last_name;
            props.loadData(data);
        }
        else {
            setIsValidClass("form-control");
            let data = props.data;
            data.last_name = null;
            props.loadData(data);
        }
    }

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="lastName" >Apellido*</label>
            </div>
            <div className="form-control-input">
                <BeShowed show={!props.data.reading}>
                    <input className={isValidClass}
                        id="lastName" type="text" ref={lastName}
                        onChange={onChangeLastName} defaultValue={props.data.last_name} />
                </BeShowed>
                <BeShowed show={props.data.reading}>
                    <input className={isValidClass}
                        id="nickUser" type="text" ref={lastName}
                        defaultValue={props.data.last_name} readOnly />
                </BeShowed>
            </div>
        </div>
    );
}

export default LastName;