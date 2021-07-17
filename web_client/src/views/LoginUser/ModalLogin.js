import React from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import { isCorrectFormat } from '../../common/functionsValidateUsers';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import FormLogin from './FormLogin';
import Buttons from '../../common/Buttons';
import Line from '../../common/Line';
import '../../assets/Forms.css';
import { updateNick, updatePassword , updateUser} from '../../actions/LoginActions';

const ModalLogin = (props) => {

    const init = () => {
        if(isCorrectFormat(props.nick) && isCorrectFormat(props.password)){
            Axios.get(`http://localhost:3001/api/user/filter/${props.nick}`)
            .then((response) => {
                if(response.data.length > 0){
                    props.updateUser(response.data[0])
                    props.close()
                }
                else{
                    alert('No se ha encontrado ningun usuario')
                }
            })
            .catch((error) => {
                alert('Error en el servidor')
            })
        }
        else{
            alert('Usuario o Password incorrectos')
        }
        
    }

    return(
        <>
            <Modal isOpen={props.show} className="modal-sale modal-lg" >
                <ModalHeader className="back-ligthblue">
                    <label className="font-weight-bold text-align-center"><b>Inicio de sesion</b></label>
                    <Line />
                </ModalHeader>
                <ModalBody className="back-ligthblue">
                    <FormGroup>
                        <FormLogin />
                    </FormGroup>
                </ModalBody>
                <ModalFooter className="back-ligthblue">
                    <Buttons label="Iniciar Sesion" ready={true} actionOK={init} actionCancel={props.close}/>
                </ModalFooter>
            </Modal>
        </>
    )
}


const mapStateToProps = state => {
    return { nick: state.nick,
            password: state.password        
    }
}

const mapDispatchToProps = {
    updatePassword,
    updateNick,
    updateUser
}

export default connect(mapStateToProps,mapDispatchToProps)(ModalLogin);