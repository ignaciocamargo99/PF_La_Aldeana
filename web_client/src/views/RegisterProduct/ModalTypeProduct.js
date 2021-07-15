import React from 'react';
import { useRef, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import Axios from 'axios';
import success from '../../utils/success';
import Buttons from '../../common/Buttons';

export default function ModalSale(props) {

    const [data, setData] = useState({});
    const [ready, setReady] = useState(false);

    const modalStyles = {
        background: '#A5DEF9',
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
                    <p className="font-weight-bold">Registrar Tipo de Producto</p>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <div id='General'>
                            <div className="row justify-content-start camp">
                                <label className='col-3'>Nombre*</label>
                                <input type='text' className='col-8' placeholder='Ingrese nombre del producto...'></input>
                            </div>
                            
                            <div className="row justify-content-start camp">
                                <label className='col-3 lbTexttarea'>Descripción</label>
                                <textarea type='text' className='col-8' placeholder='Ingrese descripción del producto...'></textarea>
                            </div>
                        </div>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Buttons label='Registrar' ready={ready} data={data} register={register} close={props.close}/>
                </ModalFooter>
            </Modal>
        </>
    )
}