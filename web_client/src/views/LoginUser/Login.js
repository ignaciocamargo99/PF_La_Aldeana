import React, { useState } from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { updateNick, updatePassword } from '../../actions/LoginActions';
import '../../assets/Buttons.css';
import BeShowed from '../../common/BeShowed';
import logo_expandido from '../../images/logo_expandido.png';
import ModalLogin from './components/ModalLogin';
import './styles/LoginForm.css';

const cookies = new Cookies();

const Login = (props) => {

    const [printModal, setPrintModal] = useState(false);

    const changePrintModal = () => {
        setPrintModal(!printModal)
        props.updateNick('')
        props.updatePassword('')

    }

    return (
        <div className="row justify-content-sm-center">
            <div className="row col-sm-6">
                <div className="row">
                    <img src={logo_expandido} alt=""></img>
                    <BeShowed show={cookies.get('nick_user') === undefined}>
                        <button className="btn-Access" onClick={changePrintModal}>Iniciar sesión</button>
                    </BeShowed>
                </div>
                <ModalLogin show={printModal} close={changePrintModal} />
            </div>
            <div className="row col-sm-8 offset-2">
                <BeShowed show={cookies.get('nick_user') !== undefined}>
                    <label><b className="color-blue title">{`Bienvenido/a, ${cookies.get('first_name')} ${cookies.get('last_name')}`}</b></label>
                </BeShowed>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        nick: state.nick,
        password: state.password,
    }
}

const mapDispatchToProps = {
    updatePassword,
    updateNick
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);