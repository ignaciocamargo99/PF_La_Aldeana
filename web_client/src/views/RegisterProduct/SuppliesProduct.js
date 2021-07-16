import useHTTPGet from '../../hooks/useHTTPGet';
import InputComboPlus from '../../common/InputComboPlus';
import ModalSupplies from './ModalSupplies';
import { useState } from 'react';

const PORT = require('../../config');

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
            <InputComboPlus label='Insumos*' open={openModal} htmlfordata="productSupplies"
                        options={supplies?.map((element, i) => (<option key={i} value={element.id_supply}> {element.name}</option>))}
                        optiondefault={<option disabled value="-1">Seleccione insumos...</option>} />
            <ModalSupplies close={close} show={showModal && modal === 'Insumos*'} />
        </>
    );
}

export default SuppliesProduct;