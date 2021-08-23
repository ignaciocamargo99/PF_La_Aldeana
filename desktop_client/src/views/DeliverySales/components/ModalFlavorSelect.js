import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';

const ModalFlavorSelect = (props) => {
    
    return(
        <>
            <Modal isOpen={props.show} className="modal-sale modal-lg" >
                <ModalHeader>
                    <label className="font-weight-bold text-align-center">Seleccion de sabores de helados</label>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    </FormGroup>
                </ModalBody>
                <ModalFooter className="back-ligthblue">
                    <button className="btn btn-success">Confirmar</button>
                    <button className="btn btn-danger">Cancelar</button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ModalFlavorSelect