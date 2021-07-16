import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateNick, updatePassword } from '../../actions/LoginActions';
import '../../assets/Buttons.css';
import ModalLogin from './ModalLogin';

const Login = (props) => {

    const [printModal,setPrintModal] = useState(false);

    const changePrintModal = () => {
        setPrintModal(!printModal)
        props.updateNick('')
        props.updatePassword('')

    }

    return(<div className="row justify-content-sm-center col-md-6 offset-sm-3">
            <div className="row">
                <img src={props.imageURL} alt=""></img>
                <button className="btn-Access" onClick={changePrintModal}>Iniciar Sesion</button>
            </div>
            <ModalLogin show={printModal} close={changePrintModal}/>
        </div>)
}

const mapStateToProps = state => {
    return { nick: state.nick,
            password: state.password        
    }
}

const mapDispatchToProps = {
    updatePassword,
    updateNick
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);