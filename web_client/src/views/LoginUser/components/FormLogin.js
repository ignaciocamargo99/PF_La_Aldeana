import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { updateNick, updatePassword } from '../../../actions/LoginActions';
import BeShowed from '../../../common/BeShowed';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const FormLogin = (props) => {
    const passwordInput = useRef(null);

    const [passwordHidden, setPasswordHidden] = useState(true);

    const seePassEyeOnClick = () => {
        passwordInput.current.type = 'text';
        setPasswordHidden(false);
    };

    const hidePassEyeOnClick = () => {
        passwordInput.current.type = 'password';
        setPasswordHidden(true);
    };

    return (
        <>
            <form>
                <div className="form-group">
                    <label className="col-sm-2 col-form-label"><b>Usuario</b></label>
                    <input type="text" className="col-sm-7 inputText" id="nickUser" placeholder="Nombre de usuario" onChange={(e) => { props.updateNick(e.target.value) }}></input>
                    <br></br>
                    <BeShowed show={props.nick === ''}>
                        <span className="text-muted offset-sm-2"><b>*Este es un campo obligatorio</b></span>
                    </BeShowed>
                </div>
                <br></br>
                <div className="form-group">
                    <label className="col-sm-2 col-form-label"><b>Contraseña</b></label>
                    <input ref={passwordInput} type="password" className="col-sm-7 inputText" id="password" placeholder="Password" onChange={(e) => { props.updatePassword(e.target.value) }}>
                    </input>
                    {
                        passwordHidden ?
                            <FontAwesomeIcon className="see-pass-eye" icon={faEye} onClick={seePassEyeOnClick} /> :
                            <FontAwesomeIcon className="hide-pass-eye" onClick={hidePassEyeOnClick} icon={faEyeSlash} />
                    }
                    <br></br>
                    <BeShowed show={props.password === ''}>
                        <span className="text-muted offset-sm-2"><b>*Este es un campo obligatorio</b></span>
                    </BeShowed>
                </div>
            </form>
        </>
    );
}

const mapStateToProps = state => {
    return {
        nick: state.nick,
        password: state.password
    }
}

const mapDispatchToProps = {
    updateNick,
    updatePassword
}

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);