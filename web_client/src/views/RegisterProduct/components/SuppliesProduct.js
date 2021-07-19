import { useState } from 'react';
import useHTTPGet from '../../../hooks/useHTTPGet';
import ModalSupplies from './modals/ModalSupplies';
import '../styles/Form.css';

const PORT = require('../../../config');

const SuppliesProduct = () => {

    const supplies = useHTTPGet(PORT() + '/api/supplies');
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
                    <label htmlFor="productSupplies">Insumos*</label>
                </div>
                <div className="form-combo-btn">
                    <div className="d-flex">
                        <div className="form-combo">
                            <input className="form-control " list="suppliesDatalist" id="productSupplies" placeholder="Seleccione insumos...">
                            </input>
                            <datalist id="suppliesDatalist">
                                {supplies?.map((s) => {
                                    return (
                                        <option key={s.id_supply} value={s.name}>
                                        </option>
                                    )
                                })}
                            </datalist>
                        </div>
                        <div className="d-flex-col form-add-btn">
                            <button type="button" className="btn btn-primary" onClick={openModal}>+</button>
                        </div>
                    </div>
                </div>
            </div>
            <ModalSupplies close={close} show={showModal} />
        </>
    );
}

export default SuppliesProduct;