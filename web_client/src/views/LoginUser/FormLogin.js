import React, { useState } from 'react';
import BeShowed from '../../common/BeShowed';
import '../../assets/Forms.css';

export default function FormLogin(props) {

    const [nickUser,setNickUser]  = useState('');
    const [password,setPassword] = useState('');

	return (
    	<>
			<form>
                <div className="form-group">
                    <label className ="col-sm-2 col-form-label"><b>Usuario</b></label>
                    <input type="text" className="col-sm-7 inputText" id="nickUser" placeholder="Nombre de usuario" onChange={(e) => {setNickUser(e.target.value)}}></input>
                    <br></br>
                    <BeShowed show={nickUser==='' || nickUser.length <= 7}>
                        <span className="text-muted color-red offset-sm-2">*Usuario no valido</span>
                    </BeShowed>
                </div>
                <br></br>
                <div class="form-group">
                    <label className ="col-sm-2 col-form-label"><b>Contraseña</b></label>
                    <input type="password" className="col-sm-7 inputText" id="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}></input>
                    <br></br>
                    <BeShowed show={password==='' || password.length <= 7}>
                        <span className="text-muted color-red offset-sm-2">*Este es un campo obligatorio</span>
                    </BeShowed>
                </div>
            </form>
    	</>
	);
}
