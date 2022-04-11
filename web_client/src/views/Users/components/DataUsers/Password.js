import React, { useRef, useState } from 'react';
import BeShowed from '../../../../common/BeShowed';

const Password = (props) => {
    const pass = useRef(null);
    const divPasswordFormatValidation = useRef(null);
    const [isValidClass, setIsValidClass] = useState("form-control");
    let data = props.data;

    const stringContainsNumber = (_string) => /\d/.test(_string);

    const onChangePassword = () => {
        const password = pass.current.value.trim();
        const passwordWithNumber = stringContainsNumber(password);
        if (password.length >= 8 && passwordWithNumber) {
            if (data.editing) {
                setIsValidClass("form-control is-valid");
                data.password = password;
                props.loadData(data);
            }
            else {
                setIsValidClass("form-control is-valid");
                data.password = password;
                props.loadData(data);
                divPasswordFormatValidation.current.innerHTML = '';
            }
        }
        else {
            if (data.editing) {
                setIsValidClass("form-control");
                let data = props.data;
                data.password = password;
                props.loadData(data);
            }
            else {
                setIsValidClass("form-control");
                let data = props.data;
                data.password = null;
                props.loadData(data);
                divPasswordFormatValidation.current.innerHTML = 'Recuerde que la contraseña debe contener al menos 8 dígitos y un número...';
            }
        }
    }

    return (
        <>
            <BeShowed show={props.data.editing}>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="password" >Contraseña</label>
                    </div>
                    <div className="form-control-input">
                        <input className={isValidClass}
                            id="nickUser" type="text" ref={pass}
                            onChange={onChangePassword} />
                        <p style={{ color: '#383C77', fontSize: '19px' }}>La contraseña no es visible, solo puede cambiarla por otra de ser necesario...</p>
                    </div>
                </div>
            </BeShowed>
            <BeShowed show={!props.data.editing}>
                <div className="formRow">
                    <div className="form-control-label">
                        <label htmlFor="password" >Contraseña*</label>
                    </div>
                    <div className="form-control-input">
                        <input className={isValidClass}
                            id="nickUser" type="text" ref={pass}
                            onChange={onChangePassword} />
                        <div style={{ color: 'red', fontWeight: 'bold' }} ref={divPasswordFormatValidation} />
                    </div>
                </div>
            </BeShowed>
        </>
    );
}

export default Password;