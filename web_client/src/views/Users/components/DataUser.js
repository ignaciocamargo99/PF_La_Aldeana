import React, { useRef, useState } from 'react';
import BeShowed from '../../../common/BeShowed';

const DataUser = (props) => {
    const nickUser = useRef(null);
    const firstName = useRef(null);
    const lastName = useRef(null);
    const password = useRef(null);
    const [isValidClass, setIsValidClass] = useState("form-control");

    const onChangeNickUser = () => {
        if (nickUser) {
            // props.updateDate(inputDate.current.value);
            setIsValidClass("form-control is-valid");
        }
    }

    return (
        <>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="nickUser" >Nombre de usuario*</label>
                </div>
                <div className="form-control-input">
                    <BeShowed show={!props.data.reading}>
                    <input className={isValidClass}
                        id="nickUser" type="text" ref={nickUser}
                        onChange={onChangeNickUser} defaultValue={props.data.nick_user} />
                    </BeShowed>
                    <BeShowed show={props.data.reading}>
                    <input className={isValidClass}
                        id="nickUser" type="text" ref={nickUser}
                        defaultValue={props.data.nick_user} readOnly />
                </BeShowed>
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="firstName" >Nombre*</label>
                </div>
                <div className="form-control-input">
                    <BeShowed show={!props.data.reading}>
                        <input className={isValidClass}
                            id="firstName" type="text" ref={firstName}
                            onChange={onChangeNickUser} defaultValue={props.data.first_name} />
                    </BeShowed>
                    <BeShowed show={props.data.reading}>
                        <input className={isValidClass}
                            id="firstName" type="text" ref={firstName}
                            defaultValue={props.data.first_name} readOnly />
                    </BeShowed>
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="lastName" >Apellido*</label>
                </div>
                <div className="form-control-input">
                    <BeShowed show={!props.data.reading}>
                    <input className={isValidClass}
                        id="nickUser" type="text" ref={lastName}
                        onChange={onChangeNickUser} defaultValue={props.data.last_name} />
                    </BeShowed>
                    <BeShowed show={props.data.reading}>
                    <input className={isValidClass}
                        id="nickUser" type="text" ref={lastName}
                        defaultValue={props.data.last_name} readOnly />
                </BeShowed>
                </div>
            </div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="nickUser" >Contraseña*</label>
                </div>
                <div className="form-control-input">
                    <BeShowed show={!props.data.reading}>
                    <input className={isValidClass}
                        id="nickUser" type="text" ref={password}
                        onChange={onChangeNickUser} defaultValue={props.data.password} />
                    </BeShowed>
                    <BeShowed show={props.data.reading}>
                    <input className={isValidClass}
                        id="nickUser" type="text" ref={password}
                        defaultValue={props.data.password} readOnly />
                </BeShowed>
                </div>
            </div>
        </>



    );
}

export default DataUser;
