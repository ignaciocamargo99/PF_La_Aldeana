import React from 'react';
import {connect} from 'react-redux';
import {updateNick, updatePassword} from '../../actions/LoginActions';
import BeShowed from '../../common/BeShowed';
import '../../assets/Forms.css';

const FormLogin = (props) => {

	return (
    	<>
			<form>
                <div className="form-group">
                    <label className ="col-sm-2 col-form-label"><b>Usuario</b></label>
                    <input type="text" className="col-sm-7 inputText" id="nickUser" placeholder="Nombre de usuario" onChange={(e) => {props.updateNick(e.target.value)}}></input>
                    <br></br>
                    <BeShowed show={props.nick===''}>
                        <span className="text-muted offset-sm-2"><b>*Este es un campo obligatorio</b></span>
                    </BeShowed>
                </div>
                <br></br>
                <div class="form-group">
                    <label className ="col-sm-2 col-form-label"><b>Contraseña</b></label>
                    <input type="password" className="col-sm-7 inputText" id="password" placeholder="Password" onChange={(e) => {props.updatePassword(e.target.value)}}></input>
                    <br></br>
                    <BeShowed show={ props.password===''}>
                        <span className="text-muted offset-sm-2"><b>*Este es un campo obligatorio</b></span>
                    </BeShowed>
                </div>
            </form>
    	</>
	);
}

const mapStateToProps = state => {
    return { nick: state.nick,
            password: state.password        
    }
}

const mapDispatchToProps = {
    updateNick,
    updatePassword
}

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);