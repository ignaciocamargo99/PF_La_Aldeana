import { useRef, useState } from 'react';
import Buttons from '../../common/Buttons';
import Form from '../../common/Form';
import InputComboPlus from '../../common/InputComboPlus';
import InputImage from '../../common/InputImage';
import Line from '../../common/Line';
import RadioButton from '../../common/RadioButton';
import BeShowed from '../../common/BeShowed';
import ModalSupplies from './ModalSupplies';
import ModalTypeProduct from './ModalTypeProduct';
import useHTTPGet from '../../hooks/useHTTPGet';

const PORT = require('../../config');

const FormRegisterProduct = (props) => {

    const [data, setData] = useState({});
    const [ready, setReady] = useState(false);
    const [checkedI, setCheckedI] = useState(false);
    const [heading, setHeading] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modal, setModal] = useState('');
    const typeProduct = useHTTPGet(PORT() + '/api/typeProduct')
    const supplies = useHTTPGet(PORT() + '/api/supplies')


    const handlerHeading = (e) => {
        if (e.target.value === "iceCream") {
            setCheckedI(true)
            setHeading(e.target.value);
        }
        else {
            setCheckedI(false)
            setHeading(e.target.value);
        }
    }

    const openModal = (mod) => {
        console.log(showModal);
        setModal(mod);
        setShowModal(true);
    }

    const close = () => {
        console.log(showModal);
        setShowModal(false);
    }

    return (

        <Form>
            <form className='formBody needs-validation'>
                <h2>Registrar Producto</h2>
                <Line />
                <br />
                <div id='General'>
                    <div className="row justify-content-start camp">
                        <label className='col-3'>Nombre*</label>
                        <input type='text' className='inputText col-8' placeholder='Ingrese nombre del producto...'></input>
                    </div>

                    <div className="row justify-content-start camp">
                        <label className='col-3 lbTexttarea'>Descripción</label>
                        <textarea type='text' className='col-8' placeholder='Ingrese descripción del producto...'></textarea>
                    </div>

                    <div className="row justify-content-start camp">
                        <label className='col-3'>Precio*</label>
                        <input type='number' className='inputText col-8'></input>
                    </div>

                    <div className="row justify-content-start camp">
                        <label className='col-md-3 lbRadio'>Rubro*</label>
                        <div className="col-md-3">
                            <RadioButton handlerOnChange={handlerHeading} descriptionRadio="Heladería" id="iceCream" value="iceCream" name="isIceCream" checked={checkedI} />
                        </div>
                        <div className="col-md-2">
                            <RadioButton handlerOnChange={handlerHeading} descriptionRadio="Cafetería" id="coffee" value="coffee" name="isCoffee" checked={!checkedI} />
                        </div>
                    </div>
                </div>
                <br />
                <Line />
                <br />
                <div id='extra'>

                    <div className="row justify-content-start camp">
                        <InputComboPlus label='Tipo*' open={openModal}
                            options={typeProduct?.map((element, i) => (<option key={i} value={element.id_product_type}> {element.name}</option>))}
                            optiondefault={<option disabled value="-1">Seleccione tipo de producto...</option>} />
                        <ModalTypeProduct close={close} show={showModal && modal === 'Tipo*'} />
                    </div>

                    <div className="row justify-content-start camp">
                        <InputComboPlus label='Insumos*' open={openModal}
                        options={supplies?.map((element, i) => (<option key={i} value={element.id_supply}> {element.name}</option>))}
                        optiondefault={<option disabled value="-1">Seleccione insumos...</option>} />
                        <ModalSupplies close={close} show={showModal && modal === 'Insumos*'} />
                    </div>

                    <div className="row justify-content-start camp">
                        <InputImage label='Imagen' />
                    </div>
                </div>
                <br />
                <Buttons label='Registrar' ready={ready} data={data} />
            </form>
        </Form>

    );
}

export default FormRegisterProduct;