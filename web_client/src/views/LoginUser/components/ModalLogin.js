import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { isCorrectFormat } from '../../../utils/Validations/validateUsers';
import errrorLogin from '../../../utils/ErrorMessages/errorLogin';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import FormLogin from '../components/FormLogin';
import { updateNick, updatePassword, updateUser, updatePermissions } from '../../../actions/LoginActions';
import bcryptjs from 'bcryptjs';
import { encrypt } from '../../../utils/EncryptDecryptCookies/EncryptDecrypt';
import Cookies from 'universal-cookie';
import './ModalLogin.css';

const PORT = require('../../../config');
const cookies = new Cookies();

const ModalLogin = (props) => {

    const init = () => {
        if (isCorrectFormat(props.nick) && isCorrectFormat(props.password)) {
            Axios.get(PORT() + `/api/users/filter/${props.nick}`)
                .then((response) => {
                    let compare = bcryptjs.compareSync(props.password, response.data.token)
                    if (compare) {
                        Axios.get(PORT() + `/api/users/search/${props.nick}`)
                            .then((res) => {
                                cookies.set('nick_user', res.data.nick_user, { path: '/' })
                                cookies.set('first_name', res.data.first_name, { path: '/' })
                                cookies.set('last_name', res.data.last_name, { path: '/' })
                                Axios.get(PORT() + `/api/permissions/filter/${res.data.rol_ID}`)
                                    .then((response) => {
                                        let permissions = [encrypt('Inicio')]
                                        for (let i = 0; i < response.data.length; i++) {
                                            permissions.push(encrypt(response.data[i].name))
                                        }
                                        cookies.set('permissions', permissions, { path: '/' })
                                        window.location.href = './app/index'
                                    })
                            })
                    }
                    else {
                        errrorLogin('Atención', 'Usuario o Password incorrectos')
                    }
                })
                .catch((error) => {
                    errrorLogin('Oops...', 'Error en el servidor')
                })
        }
        else {
            errrorLogin('Atención', 'Usuario o Password incorrectos')
        }

    }

    return (
        <>
            <Modal isOpen={props.show} className="modal-sale modal-lg" >
                <ModalHeader className="back-ligthblue">
                    <label className="font-weight-bold text-align-center"><b>Inicio de sesión</b></label>
                </ModalHeader>
                <ModalBody className="back-ligthblue">
                    <FormGroup>
                        <FormLogin />
                    </FormGroup>
                </ModalBody>
                <ModalFooter className="back-ligthblue">
                    <button className='sendOk' onClick={init}>Iniciar sesión</button>
                    <button className='cancel' onClick={props.close}>Cancelar</button>
                </ModalFooter>
            </Modal>
        </>
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
    updateNick,
    updateUser,
    updatePermissions
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalLogin);