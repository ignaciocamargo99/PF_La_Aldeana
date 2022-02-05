import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const NewScheduleModal = ({ showModal, setShowModal }) => {
    return (
        <div>
            <Modal isOpen={showModal} className="modal-sale modal-md" >
                <ModalHeader>
                    <label><b>Generar grilla de horarios</b></label>
                </ModalHeader>
                <ModalBody>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"></input>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Próximos 7 días
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"></input>
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Próximos 10 días
                        </label>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className='sendOk'>Aceptar</button>
                    <button className='cancel' onClick={() => setShowModal(false)}>Cancelar</button>
                </ModalFooter>
            </Modal>
        </div>
    )
};

export default NewScheduleModal;
