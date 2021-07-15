import React from 'react';
import { useRef, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import Axios from 'axios';
import Combo from '../../common/Combo';
import success from '../../utils/success';
import InputImage from '../../common/InputImage';
import Line from '../../common/Line';
import Buttons from '../../common/Buttons';
import BeShowed from '../../common/BeShowed';

export default function ModalSale(props) {

    const [data, setData] = useState({});
    const [ready, setReady] = useState(false);

    const modalStyles = {
        position: "absolute",
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '200em',
    }

    const typesSupplies = [1,2,3];

    const register = () => {
        success();
        props.close();
    }

    return (
        <>
            <Modal isOpen={props.show} style={modalStyles} className="modal-sale modal-lg">
                <ModalHeader>
                    <h2 className="font-weight-bold">Registrar Insumo</h2>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <form className='formBody needs-validation'>
                            <h2 className="font-weight-bold">Nuevo Insumo</h2>
                            <Line/>
                            <br/>
                            <div id='General'>
                                <div className="row justify-content-start camp">
                                    <label className='col-3'>Nombre*</label>
                                    <input type='text' className='inputText col-8' placeholder='Ingrese nombre del producto...'></input>
                                </div>
                                
                                <div className="row justify-content-start camp">
                                    <label className='col-3 lbTexttarea'>Descripción</label>
                                    <textarea type='text' className='col-8' placeholder='Ingrese descripción del producto...'></textarea>
                                </div>
                            </div>
                            <div id='Precio'>
                                <h5>Precio</h5>
                                <Line/>
                                <br/>
                                <div className="row justify-content-start camp">
                                    <label className='col-md-2'>Minorista*</label>
                                    <input type='number' className='inputText col-md-3'></input>
                                    <label className='col-md-2'>Mayorista*</label>
                                    <input type='number' className='inputText col-md-3'></input>
                                </div>
                            </div>
                            <br/>
                            <Line/>
                            <br/>
                            <div id='extra'>

                                <div className='camp'>
                                    <Combo descriptioncombo={'Tipo*'}
                                    defaultValue='-1' optiondefault={<option disabled value="-1">Seleccione tipo de insumo...</option>}
                                    options={typesSupplies}></Combo>
                                </div>

                                <div className="row justify-content-start camp">
                                    <InputImage label='Imagen'/>
                                </div>

                                <div className="row justify-content-start camp">
                                    <label className='col-md-5'>Stock lotes*</label>
                                    <input type='number' className='inputText col-md-6'></input>
                                </div>

                                <div className="row justify-content-start camp">
                                    <label className='col-md-5'>Cant. unidades por lote*</label>
                                    <input type='number' className='inputText col-md-6'></input>
                                </div>

                                <div className="row justify-content-start camp">
                                    <label className='col-md-5'>Stock unidades*</label>
                                    <input type='number' className='inputText col-md-6'></input>
                                </div>
                            </div>
                        </form>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Buttons label='Registrar' ready={ready} data={data} register={register} close={props.close}/>
                </ModalFooter>
            </Modal>
        </>
    )
}