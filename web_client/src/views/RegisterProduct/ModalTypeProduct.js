import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import Axios from 'axios';
import success from '../../utils/success';

export default function ModalSale(props) {

    const modalStyles = {
        position: "fixed",
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '200em',
    }

    const register = () => {
        success();
        props.close();
    }

    return (
        <>
            <Modal isOpen={props.show} style={modalStyles} className="modal-sale modal-lg">
                <ModalHeader>
                    <p className="font-weight-bold">Ticket de venta</p>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>body</label>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button color="success" onClick={register}>Confirmar venta</Button>
                    <Button color="danger" onClick={props.close}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}