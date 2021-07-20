import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { updateNick, updatePassword } from '../../actions/LoginActions';
import '../../assets/Buttons.css';
import BeShowed from '../../common/BeShowed';
import ModalLogin from './components/ModalLogin';
import './styles/LoginForm.css';

const Login = (props) => {

    const [printModal, setPrintModal] = useState(false);

    const changePrintModal = () => {
        setPrintModal(!printModal)
        props.updateNick('')
        props.updatePassword('')

    }

    useEffect(() => {
        //aqui va la consulta sobre la sessiones...
    })


    return (
        <div className="row justify-content-sm-center">
            <div className="row col-sm-6">
                <div className="row">
                    <img src={props.imageURL} alt=""></img>
                    <BeShowed show={props.user.nick_user === ''}>
                        <button className="btn-Access" onClick={changePrintModal}>Iniciar sesión</button>
                    </BeShowed>
                </div>
                <ModalLogin show={printModal} close={changePrintModal} />
            </div>
            <div className="row col-sm-8 offset-2">
                <BeShowed show={props.user.nick_user !== ''}>
                    <label><b className="color-blue title">{`Bienvenido/a, ${props.user.first_name} ${props.user.last_name}`}</b></label>
                </BeShowed>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        nick: state.nick,
        password: state.password,
        user: state.user
    }
}

const mapDispatchToProps = {
    updatePassword,
    updateNick
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);