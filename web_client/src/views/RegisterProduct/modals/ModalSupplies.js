import React, { useState } from 'react';
import { FormGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import modalStyles from '../../../assets/modalStyles';
import Buttons from '../../../common/Buttons';
import success from '../../../utils/SuccessMessages/successTypeProduct';
import GeneralDataSupply from './GeneralDataSupply';
import PriceSupply from './PriceSupply';
import StockSupply from './StockSupply';

export default function ModalSale(props) {

    const [data] = useState({});
    const [ready] = useState(false);

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
                            <GeneralDataSupply />
                            <PriceSupply />
                            <StockSupply />
                        </form>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Buttons label='Registrar' ready={ready} data={data} actionOK={register} actionCancel={props.close} />
                </ModalFooter>
            </Modal>
        </>
    )
}