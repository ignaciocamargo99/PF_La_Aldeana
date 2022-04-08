import React, { useRef, useState } from 'react';
import BeShowed from '../../../../common/BeShowed';

const Password = (props) => {
    const pass = useRef(null);
    const [isValidClass, setIsValidClass] = useState("form-control");
    let data = props.data;

    const onChangePassword = () => {
        const password = pass.current.value.trim();
        if (password) {
            setIsValidClass("form-control is-valid");
            data.password = password;
            props.loadData(data);
        }
        else {
            setIsValidClass("form-control");
            let data = props.data;
            data.password = null;
            props.loadData(data);
        }
    }

    return (
        <>
            <div className="formRow">
                <BeShowed show={props.data.editing}>
                    <div className="form-control-label">
                        <label htmlFor="password" >Contraseña</label>
                    </div>
                    <div className="form-control-input">
                        <input className={isValidClass}
                            id="nickUser" type="text" ref={pass}
                            onChange={onChangePassword} />
                        <p style={{ color: '#383C77', fontSize: '19px' }}>La contraseña no es visible, solo puede cambiarla por otra de ser necesario...</p>
                    </div>
                </BeShowed>
                <BeShowed show={!props.data.editing}>
                    <div className="form-control-label">
                        <label htmlFor="password" >Contraseña*</label>
                    </div>
                    <div className="form-control-input">
                        <input className={isValidClass}
                            id="nickUser" type="text" ref={pass}
                            onChange={onChangePassword} />
                    </div>
                </BeShowed>
            </div>
        </>
    );
}

export default Password;