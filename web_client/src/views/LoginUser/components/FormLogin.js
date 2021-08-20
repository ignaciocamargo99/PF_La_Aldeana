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
                <div className="formRow">
                    <div className="form-control-label">
                        <label><b>Usuario</b></label>
                    </div>
                    <div className="form-control-input">
                        <input type="text" className="form-control" id="nickUser" placeholder="Nombre de usuario" onChange={(e) => { props.updateNick(e.target.value) }}></input>

                        <BeShowed show={props.nick === ''}>
                            <span className="text-muted"><b>*Este es un campo obligatorio</b></span>
                        </BeShowed>

                    </div>
                </div>
                <div className="formRow">
                    <div className="form-control-label">
                        <label><b>Contraseña</b></label>
                        &nbsp;
                        {
                            passwordHidden ?
                                <FontAwesomeIcon className="see-pass-eye" icon={faEye} onClick={seePassEyeOnClick} /> :
                                <FontAwesomeIcon className="hide-pass-eye" onClick={hidePassEyeOnClick} icon={faEyeSlash} />
                        }
                    </div>
                    <div className="form-control-input">
                        <div>
                            <input ref={passwordInput} type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => { props.updatePassword(e.target.value) }}>
                            </input>

                        </div>

                        <BeShowed show={props.password === ''}>
                            <span className="text-muted"><b>*Este es un campo obligatorio</b></span>
                        </BeShowed>
                    </div>
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