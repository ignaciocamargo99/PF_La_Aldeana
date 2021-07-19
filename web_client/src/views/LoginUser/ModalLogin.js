import React from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import { isCorrectFormat } from '../../common/functionsValidateUsers';
import errrorLogin from '../../utils/errorLogin';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import FormLogin from './FormLogin';
import Buttons from '../../common/Buttons';
import Line from '../../common/Line';
import '../../assets/Forms.css';
import { updateNick, updatePassword , updateUser, updatePermissions} from '../../actions/LoginActions';

const PORT = require('../../config');

const ModalLogin = (props) => {

    const init = () => {
        if(isCorrectFormat(props.nick) && isCorrectFormat(props.password)){
            Axios.get(PORT() + `/api/user/filter/${props.nick}`)
            .then((response) => {
                if(response.data.length > 0 && response.data[0].password === props.password){
                    props.updateUser(response.data[0])
                    Axios.get(PORT() + `/api/permission/filter/1`)
                    .then((response) => {
                        for(let i = 0; i< response.data.length; i++){
                            props.updatePermissions(response.data[i].name)
                        }
                        props.close()
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                }
                else{
                    errrorLogin('Atención','Usuario o Password incorrectos')
                }
            })
            .catch((error) => {
                errrorLogin('Oops...','Error en el servidor')
            })
        }
        else{
            errrorLogin('Atención','Usuario o Password incorrectos')
        }
        
    }

    return(
        <>
            <Modal isOpen={props.show} className="modal-sale modal-lg" >
                <ModalHeader className="back-ligthblue">
                    <label className="font-weight-bold text-align-center"><b>Inicio de sesión</b></label>
                    <Line />
                </ModalHeader>
                <ModalBody className="back-ligthblue">
                    <FormGroup>
                        <FormLogin />
                    </FormGroup>
                </ModalBody>
                <ModalFooter className="back-ligthblue">
                    <Buttons label="Iniciar sesión" ready={true} actionOK={init} actionCancel={props.close}/>
                </ModalFooter>
            </Modal>
        </>
    )
}


const mapStateToProps = state => {
    return { nick: state.nick,
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

export default connect(mapStateToProps,mapDispatchToProps)(ModalLogin);