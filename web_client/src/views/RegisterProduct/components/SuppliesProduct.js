import { useState } from 'react';
import useHTTPGet from '../../../hooks/useHTTPGet';
import ModalSupplies from '../ModalSupplies';
import '../styles/FormComboButton.css';

const PORT = require('../../../config');

const SuppliesProduct = (props) => {

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
                <div className="combo-input-container">
                    <div className="form-group-input-button">
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
                        <div className="form-add-btn">
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