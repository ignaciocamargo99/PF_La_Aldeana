import React, { useRef, useState, useEffect } from 'react';
import BeShowed from 'common/BeShowed';

const NickUser = (props) => {
    const nickUser = useRef(null);
    const [isValidClass, setIsValidClass] = useState("form-control");
    let data = props.data;

    useEffect(() => {
        if (data.nick_user) setIsValidClass("form-control is-valid");
    },[])

    const onChangeNickUser = () => {
        const nick_user = nickUser.current.value.trim();
        if (nick_user) {
            setIsValidClass("form-control is-valid");
            data.nick_user = nick_user;
            props.loadData(data);
        }
        else {
            setIsValidClass("form-control");
            let data = props.data;
            data.nick_user = null;
            props.loadData(data);
        }
    };

    return (
        <div className="formRow">
            <div className="form-control-label">
                <label htmlFor="nickUser" >Nombre de usuario*</label>
            </div>
            <div className="form-control-input">
                <BeShowed show={!props.data.reading}>
                    <input className={isValidClass}
                        id="nickUser" type="text" ref={nickUser}
                        onChange={onChangeNickUser} defaultValue={props.data.nick_user} autoFocus />
                </BeShowed>
                <BeShowed show={props.data.reading}>
                    <input className={isValidClass}
                        id="nickUser" type="text" ref={nickUser}
                        defaultValue={props.data.nick_user} readOnly />
                </BeShowed>
            </div>
        </div>
    );
}

export default NickUser;