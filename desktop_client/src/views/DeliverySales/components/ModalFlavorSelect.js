import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from '../../../common/Table/Table';
import HeaderTable from '../../../common/Table/HeaderTable';
import BodyTable from '../../../common/Table/BodyTable';
import errorSelectFlavor from '../../../utils/ErrorMessages/errorSelectFlavor';
import UploadByName from '../../../common/UploadByName';
import errorConfirmFlavors from '../../../utils/ErrorMessages/errorConfirmFlavors';

const PORT = require('../../../config');

const ModalFlavorSelect = (props) => {
    
    const [allFlavors,setAllFlavors] = useState([])
    const [flavors,setFlavors] = useState([]);
    const [selectedFalvors,setSelectedFlavors] = useState([]);
    const [lastI,setLastI] = useState(0);

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

    const uploadFlavor = (id) => {
        if(id < 0){
            errorSelectFlavor('Se debe seleccionar un sabor')
        }
        else if(selectedFalvors.length >= 4){
            errorSelectFlavor('El máximo de sabores a elegir son cuatro')
        }
        else{
            let flavorToAdd = flavors.find(flavor => flavor.id_flavor == id)
            let newFlavors = flavors.filter(flavor => flavor.id_flavor != id)
            let newSelectedFlavors = selectedFalvors
            newSelectedFlavors.push(flavorToAdd)
            setFlavors(newFlavors)
            setSelectedFlavors(newSelectedFlavors)
        }
    }

    const downloadFlavor = (id) => {
        let flavorToQuit = selectedFalvors.find(flavor => flavor.id_flavor == id)
        let newSelectedFlavors = selectedFalvors.filter(flavor => flavor.id_flavor != id)
        let newFlavors = flavors
        newFlavors.push(flavorToQuit)
        setFlavors(newFlavors)
        setSelectedFlavors(newSelectedFlavors)
    }

    const onClickRB = (i) => {
        let arrayFlavorsSelected = props.arrayFlavors[props.arrayFlavors.length-1]
        if(selectedFalvors.length > 0){
            arrayFlavorsSelected[lastI] = selectedFalvors
        }
        if(arrayFlavorsSelected[i][0] !== undefined){
            let newSelectedFlavors = arrayFlavorsSelected[i]
            let newFlavors
            newFlavors = allFlavors.filter( flavor => flavor.id_flavor !== newSelectedFlavors[0].id_flavor)
            for(let i = 1 ; i < newSelectedFlavors.length ; i++){
                newFlavors = newFlavors.filter( flavor => flavor.id_flavor !== newSelectedFlavors[i].id_flavor)
            }
            setSelectedFlavors(newSelectedFlavors)
            setFlavors(newFlavors)
        }
        else{
            setSelectedFlavors([])
            setFlavors(allFlavors)
        }
        setLastI(i)
    }

    const cancel = () => {
        let newArrayFlavors = props.arrayFlavors.slice(0,props.arrayFlavors.length-1)
        props.setArrayFlavors(newArrayFlavors)
        props.setShowModal(false)
    }

    const confirm = () => {
        let arrayFlavorsSelected = props.arrayFlavors[props.arrayFlavors.length-1]
        if(selectedFalvors.length > 0){
            arrayFlavorsSelected[lastI] = selectedFalvors
        }
        let finish = true
        arrayFlavorsSelected.map((flavorsSelected) => {
            if(typeof(flavorsSelected) !== 'object'){
                finish = false
            }
        })
        if(finish){
            props.finishUpload(props.objectToAdd.productToAdd,props.objectToAdd.inputQuantity,props.objectToAdd.id)
            setSelectedFlavors([])
            setFlavors(allFlavors)
            setLastI(0)
            props.setShowModal(false)
        }
        else{
            errorConfirmFlavors()
        }
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
                            {props.arrayFlavors[props.arrayFlavors.length-1]?.map((f,i) => {
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
                                        <th scope="col" className="bg-info" style={{ textAlign: 'center' }}>#</th>
                                        <th scope="col" className="bg-info" style={{ textAlign: 'center' }}>Nombre</th>
                                        <th scope="col" className="bg-info" style={{ textAlign: 'center' }}></th>
                                    </>
                                    }/>
                                <BodyTable tbody={
                                    selectedFalvors?.map((flavor,i) => {
                                        return(
                                            <tbody key={i}>
                                                <tr>
                                                    <td style={{ textAlign: 'center', width: '15%'}}>{flavor.id_flavor}</td>
                                                    <td style={{ textAlign: 'center', width: '70%'}}>{flavor.name}</td>
                                                    <td style={{ textAlign: 'center', width: '15%'}}>
                                                        <button type="button" className="btn btn-danger" onClick={() => {downloadFlavor(flavor.id_flavor)}}><FontAwesomeIcon icon={faMinus} /></button>
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
                    <button className="btn btn-success" onClick={confirm}>Confirmar</button>
                    <button className="btn btn-danger" onClick={cancel}>Cancelar</button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ModalFlavorSelect