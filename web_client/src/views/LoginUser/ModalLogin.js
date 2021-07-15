import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import FormLogin from './FormLogin';
import Buttons from '../../common/Buttons';
import Line from '../../common/Line';
import '../../assets/Forms.css';

export default function ModalLogin(props) {

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
                    <Buttons label="Iniciar Sesion" ready={true} actionOK={props.init} actionCancel={props.close}/>
                </ModalFooter>
            </Modal>
        </>
    )
}