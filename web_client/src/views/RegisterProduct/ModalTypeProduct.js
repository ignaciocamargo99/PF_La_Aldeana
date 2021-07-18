import React from 'react';
import { useRef, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import Axios from 'axios';
import success from '../../utils/SuccessMessages/successTypeProduct';
import Buttons from '../../common/Buttons';
import modalStyles from '../../assets/modalStyles';

const PORT = require('../../config');

export default function ModalSale(props) {

    const [ready, setReady] = useState(false);
    const labelObligatoryField = useRef(null);
    const inputName = useRef(null);
    const inputDescription = useRef(null);

    const registerTypeProduct = () => {
        const name = inputName.current.value;
        const description = inputDescription.current.value;
        if (name === "") {
            labelObligatoryField.current.innerHTML = "Debe completar los campos obligatorios *";
            return
        }
        else setReady(true);
        Axios.post(PORT() + '/api/typeProduct/new', {
            name: name,
            description: description
        })
            .then(() => success())
            .catch(err => console.error(err))
        props.close();
    }

    const onChangeButton = () => {
        if (inputName.current.value !== "") {
            setReady(true);
            labelObligatoryField.current.innerHTML = "";
        }
        else setReady(false);
    }

    return (
        <>
            <Modal isOpen={props.show} style={modalStyles} className="modal-sale modal-lg">
                <ModalHeader>
                    <p className="font-weight-bold">Registrar tipo de producto</p>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <div id='General'>
                            <div className="row justify-content-start camp">
                                <label className='col-3'>Nombre*</label>
                                <input type='text' className='col-8' onChange={onChangeButton} ref={inputName} placeholder='Ingrese nombre del producto...'></input>
                            </div>

                            <div className="row justify-content-start camp">
                                <label className='col-3 lbTexttarea'>Descripción</label>
                                <textarea type='text' className='col-8' ref={inputDescription} placeholder='Ingrese descripción del producto...'></textarea>
                                <label style={{ color: 'red' }} ref={labelObligatoryField} />
                            </div>
                        </div>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Buttons label='Registrar' ready={ready} register={registerTypeProduct} close={props.close} />
                </ModalFooter>
            </Modal>
        </>
    )
}