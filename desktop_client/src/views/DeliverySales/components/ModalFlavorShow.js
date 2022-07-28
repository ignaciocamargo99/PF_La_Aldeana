import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import Table from '../../../common/Table/Table';
import HeaderTable from '../../../common/Table/HeaderTable';
import BodyTable from '../../../common/Table/BodyTable';
import '../../../assets/Buttons.css'


const ModalFlavorShow = (props) => {

    const [selectedFalvors, setSelectedFlavors] = useState([]);

    useEffect(() => {
        setSelectedFlavors(props.flavorsToView[0]);
    }, [props.show]);

    const onClickRB = (i) => {
        setSelectedFlavors(props.flavorsToView[i]);
    }

    const cancel = () => {
        props.setShowModalShow(false);
    }

    return (
        <>
            <Modal isOpen={props.show} className="modal-sale modal-lg" >
                <ModalHeader>
                    <label className="font-weight-bold text-align-center">Sabores seleccionados de <b>{props.productName}</b></label>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <div className="container">
                            {props.flavorsToView?.map((f, i) => {
                                return (
                                    <div className="form-check form-check-inline" key={i}>
                                        <input className="form-check-input" type="radio" name="selectedFlavors" id={`rb${i + 1}`} value={i} defaultChecked={i === 0 ? true : false} onClick={() => { onClickRB(i) }}></input>
                                        <label className="form-check-label" htmlFor={`rb${i + 1}`}>{i + 1} Recipiente</label>
                                    </div>
                                )
                            })}
                        </div>
                        <hr />
                        <div className="row">
                            <Table>
                                <HeaderTable th={
                                    <>
                                        <th scope="col" className="bg-info" style={{ textAlign: 'center' }}><label>#</label></th>
                                        <th scope="col" className="bg-info" style={{ textAlign: 'center' }}><label>Nombre</label></th>
                                    </>
                                } />
                                <BodyTable tbody={
                                    selectedFalvors?.map((flavor, i) => {
                                        return (
                                            <tbody key={i}>
                                                <tr>
                                                    <td style={{ textAlign: 'center', width: '15%' }}><label>{flavor.id_flavor}</label></td>
                                                    <td style={{ textAlign: 'center', width: '85%' }}><label>{flavor.name}</label></td>
                                                </tr>
                                            </tbody>
                                        )
                                    })
                                } />
                            </Table>
                        </div>
                    </FormGroup>
                </ModalBody>
                <ModalFooter className="back-ligthblue">
                    <div className='buttons'>
                        <button className="btn btn-light cancel" onClick={cancel} >Volver</button>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ModalFlavorShow;