import React, { useRef, useState } from 'react';
import BeShowed from '../../../../common/BeShowed';

const FirstName = (props) => {
    const firstName = useRef(null);
    const [isValidClass, setIsValidClass] = useState("form-control");
    let data = props.data;

    const onChangeFirstName = () => {
        const first_name = firstName.current.value.trim();
        if (first_name) {
            setIsValidClass("form-control is-valid");
            data.first_name = first_name;
            props.loadData(data);
        }
        else {
            setIsValidClass("form-control");
            let data = props.data;
            data.first_name = null;
            props.loadData(data);
        }
    }

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="firstName" >Nombre*</label>
            </div>
            <div className="form-control-input">
                <BeShowed show={!props.data.reading}>
                    <input className={isValidClass}
                        id="firstName" type="text" ref={firstName}
                        onChange={onChangeFirstName} defaultValue={props.data.first_name} />
                </BeShowed>
                <BeShowed show={props.data.reading}>
                    <input className={isValidClass}
                        id="firstName" type="text" ref={firstName}
                        defaultValue={props.data.first_name} readOnly />
                </BeShowed>
            </div>
        </div>
    );
}

export default FirstName;