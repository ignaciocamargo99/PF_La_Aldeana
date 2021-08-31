import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Buttons from '../../../common/Buttons';
import Table from '../../../common/Table/Table';
import HeaderTable from '../../../common/Table/HeaderTable';
import BodyTable from '../../../common/Table/BodyTable';
import errorSelectFlavor from '../../../utils/ErrorMessages/errorSelectFlavor';
import UploadByName from '../../../common/UploadByName';
import errorConfirmFlavors from '../../../utils/ErrorMessages/errorConfirmFlavors';
import { insertDeliveryProducts, addFlavorsProduct, deleteFlavorsProduct, subtractTotalDelivery,deleteDetailDelivery,updateFlavorsProduct, updateDetailDelivery } from '../../../actions/DeliverySalesActions';

const PORT = require('../../../config');

const ModalFlavorSelect = (props) => {
    
    const [ready,setReady] = useState(false);
    const [refresh,setRefresh] = useState(0);
    const [allFlavors,setAllFlavors] = useState([]);
    const [flavors,setFlavors] = useState([]);
    const [I,setI] = useState(0);

    useEffect(()=> {
        axios.get( PORT() + `/api/flavors`)
        .then((response) => {
            setAllFlavors(response.data)
            setFlavors(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    useEffect(() => {
        if(refresh > 0){
            let aux = true
            props.flavorsProduct.map((flavorsSelected) => {
                if(flavorsSelected.length === 0){
                    aux = false
                }
            })
            setReady(aux)
        }
    },[refresh])

    const uploadFlavor = (id) => {
        setRefresh(refresh+1)
        if(id < 0){
            errorSelectFlavor('Se debe seleccionar un sabor')
        }
        else if(props.flavorsProduct[I].length >= 4){
            errorSelectFlavor('El máximo de sabores a elegir son cuatro')
        }
        else{
            let flavorToAdd = flavors.find(flavor => flavor.id_flavor == id)
            let newFlavors = flavors.filter(flavor => flavor.id_flavor != id)
            setFlavors(newFlavors)
            props.addFlavorsProduct(flavorToAdd,I)
        }
    }

    const downloadFlavor = (id,i) => {
        setRefresh(refresh+1)
        let flavorToQuit = props.flavorsProduct[I].find(flavor => flavor.id_flavor == id)
        let newFlavors = flavors
        newFlavors.push(flavorToQuit)
        setFlavors(newFlavors)
        props.deleteFlavorsProduct(I,i)
    }

    const onClickRB = (i) => {
        let newFlavors
        if(props.flavorsProduct[i].length === 0){
            newFlavors = allFlavors
        }else{
            newFlavors = allFlavors.filter( flavor => flavor.id_flavor !== props.flavorsProduct[i][0].id_flavor)
            for(let j = 1 ; j < props.flavorsProduct[i].length ; j++){
                newFlavors = newFlavors.filter( flavor => flavor.id_flavor !== props.flavorsProduct[i][j].id_flavor)
            }
        }
        setFlavors(newFlavors)
        setI(i)
    }

    const cancel = () => {
        let productToQuit = props.detailsDelivery[props.detailsDelivery.length-1].product
        props.insertDeliveryProducts(productToQuit)
        props.subtractTotalDelivery(props.detailsDelivery[props.detailsDelivery.length-1].subtotal)
        props.deleteDetailDelivery(props.detailsDelivery.length-1)
        props.updateFlavorsProduct([])
        props.setShowModal(false)
        setRefresh(0)
    }

    const confirm = () => {
        let i = props.detailsDelivery.length-1
        let detail = props.detailsDelivery[i]
        detail.flavors = props.flavorsProduct
        props.updateDetailDelivery(detail,i)
        setFlavors(allFlavors)
        setI(0)
        props.setShowModal(false)
        setReady(false)
        setRefresh(0)
    }

    return(
        <>
            <Modal isOpen={props.show} className="modal-sale modal-lg" >
                <ModalHeader>
                    <label className="font-weight-bold text-align-center">Seleccion de sabores de helados</label>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <div className="row">
                            <UploadByName list={flavors} upload={uploadFlavor} itemName="Sabor" listName="flavorList" 
                                placeholder="Ingrese el nombre del sabor que busca..." maxLength="50"/>
                        </div>
                        <hr />
                        <div className="container">
                            {props.flavorsProduct.map((f,i) => {
                                return(
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="selectedFlavors" id={`rb${i+1}`} value={i} defaultChecked={i===0?true:false} onClick={(e) => {onClickRB(e.target.value)}}></input>
                                        <label className="form-check-label" for={`rb${i+1}`}>{i+1} Recipiente</label>
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
                                        <th scope="col" className="bg-info" style={{ textAlign: 'center' }}></th>
                                    </>
                                    }/>
                                <BodyTable tbody={
                                    props.flavorsProduct[I]?.map((flavor,i) => {
                                        return(
                                            <tbody key={i}>
                                                <tr>
                                                    <td style={{ textAlign: 'center', width: '10%'}}><label>{flavor.id_flavor}</label></td>
                                                    <td style={{ textAlign: 'center', width: '70%'}}><label>{flavor.name}</label></td>
                                                    <td style={{ textAlign: 'center', width: '20%'}}>
                                                        <button type="button" className="btn btn-danger" onClick={() => {downloadFlavor(flavor.id_flavor,i)}}><FontAwesomeIcon icon={faMinus} /></button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                    })
                                    }/>
                            </Table>
                        </div>
                    </FormGroup>
                </ModalBody>
                <ModalFooter className="back-ligthblue">
                    <Buttons label='Confirmar' ready={ready} actionOK={confirm} actionNotOK={() => {errorConfirmFlavors()}} actionCancel={cancel}/>
                </ModalFooter>
            </Modal>
        </>
    )
}
const mapStateToProps = state => {
    return {
        flavorsProduct: state.flavorsProductDelivery,
        detailsDelivery: state.detailsDelivery,
        products: state.productsDelivery
    }
}

const mapDispatchToProps = {
    updateFlavorsProduct,
    updateDetailDelivery,
    deleteDetailDelivery,
    subtractTotalDelivery,
    addFlavorsProduct,
    deleteFlavorsProduct,
    insertDeliveryProducts
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalFlavorSelect);