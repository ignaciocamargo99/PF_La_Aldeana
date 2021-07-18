import { useState } from 'react';
import useHTTPGet from '../../../hooks/useHTTPGet';
import ModalTypeProduct from '../ModalTypeProduct';
import '../styles/FormComboButton.css';


const PORT = require('../../../config');

const TypeProduct = () => {

    const typeProduct = useHTTPGet(PORT() + '/api/typeProduct');
    const [showModal, setShowModal] = useState(false);
    const [modal, setModal] = useState('');

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
        <>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="productType">Tipo*</label>
                </div>
                <div className="combo-input-container">
                    <div className="form-group-input-button">
                        <div className="form-combo">
                            <input className="form-control " list="productTypesdatalist" id="productType" placeholder="Seleccione tipo de producto...">
                            </input>
                            <datalist id="productTypesdatalist">
                                {typeProduct?.map((tp) => {
                                    return (
                                        <option key={tp.id_product_type} value={tp.name}>
                                        </option>
                                    )
                                })}
                            </datalist>
                        </div>
                        <div className="form-add-btn">
                            <button type="button" className="btn btn-primary" onClick={openModal}>+</button>
                        </div>
                    </div>
                </div>
            </div>

            <ModalTypeProduct close={close} show={showModal} />
        </>
    );
}

export default TypeProduct;