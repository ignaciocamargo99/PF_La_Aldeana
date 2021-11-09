import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const NewScheduleModal = ({ showModal, setShowModal, setDaysNewSchedule, setShowNewSchedule }) => {

    const [days,setDays] = useState(7)

    const confirmGenerateSchedule = () => {
        setDaysNewSchedule(days);
        setShowModal(false);
        setShowNewSchedule(true);
    }

    return (
        <div>
            <Modal isOpen={showModal} className="modal-sale modal-md" >
                <ModalHeader>
                    <label><b>Generar grilla de horarios</b></label>
                </ModalHeader>
                <ModalBody>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={7} onClick={(e) => {setDays(e.target.value)}} defaultChecked></input>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Próximos 7 días
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={10} onClick={(e) => {setDays(e.target.value)}}></input>
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Próximos 10 días
                        </label>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className='sendOk' onClick={confirmGenerateSchedule}>Aceptar</button>
                    <button className='cancel' onClick={() => setShowModal(false)}>Cancelar</button>
                </ModalFooter>
            </Modal>
        </div>
    )
};

export default NewScheduleModal;
