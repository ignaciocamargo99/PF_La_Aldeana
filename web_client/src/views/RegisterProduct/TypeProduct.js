import useHTTPGet from '../../hooks/useHTTPGet';
import InputComboPlus from '../../common/InputComboPlus';
import ModalTypeProduct from './ModalTypeProduct';
import { useState, useRef, useEffect } from 'react';

const PORT = require('../../config');

const TypeProduct = (props) => {

    const typeProduct = useHTTPGet(PORT() + '/api/typeProduct');
    const [showModal, setShowModal] = useState(false);
    const [modal, setModal] = useState('');


    const refType = useRef({});

    useEffect(() =>{
        const data = props.data;
        const type = refType.current.value;

        if (type !== '') {
            data.type = type;
            console.log(data.type + '  ' + type)
            props.load(data);
        }
    }, [refType.current.value]);

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
            <InputComboPlus label='Tipo*' open={openModal} htmlForData="productType" ref={refType}
                        options={typeProduct?.map((element, i) => (<option key={i} value={element.id_product_type}> {element.name}</option>))}
                        optiondefault={<option disabled value="-1">Seleccione tipo de producto...</option>} />
            <ModalTypeProduct close={close} show={showModal && modal === 'Tipo*'} />
        </>
    );
}

export default TypeProduct;