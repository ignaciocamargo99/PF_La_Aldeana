import axios from 'axios';
import React, { useEffect , useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from '../../../common/Table/Table';
import HeaderTable from '../../../common/Table/HeaderTable';
import BodyTable from '../../../common/Table/BodyTable';
import UploadByName from '../../../common/UploadByName';
import errorSelectFlavor from '../../../utils/ErrorMessages/errorSelectFlavor';

const PORT = require('../../../config');

const ModalFlavorView = (props) => {

    const [allFlavors,setAllFlavors] = useState([]);
    const [flavors,setFlavors] = useState([]);
    const [selectedFalvors,setSelectedFlavors] = useState([]);
    const [lastI,setLastI] = useState(0);
    const [refresh,setRefresh] = useState(true);

    useEffect(() => {
        axios.get( PORT() + `/api/flavors`)
        .then((response) => {
            setFlavors(response.data)
            setAllFlavors(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])
    
    useEffect(()=> {
        if(props.flavorsToView.length > 0){
            let newFlavors = allFlavors.filter(flavor => flavor.id_flavor !== props.flavorsToView[0][0].id_flavor)
            for(let i = 1 ; i < props.flavorsToView[0].length ; i++){
                newFlavors = newFlavors.filter(flavor => flavor.id_flavor !== props.flavorsToView[0][i].id_flavor)
            }
            setFlavors(newFlavors)
            setSelectedFlavors(props.flavorsToView[0])
        }
    },[props.flavorsToView,])

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
        let flavorsToView = props.flavorsToView
        if(selectedFalvors > 0){
            flavorsToView[lastI] = selectedFalvors
        }
        let newFlavors = allFlavors.filter(flavor => flavor.id_flavor !== flavorsToView[i][0].id_flavor)
        for(let j = 1 ; j < flavorsToView[i].length ; j++){
            newFlavors = newFlavors.filter(flavor => flavor.id_flavor !== flavorsToView[i][j].id_flavor)
        }
        setSelectedFlavors(flavorsToView[i])
        setFlavors(newFlavors)
        setLastI(i)
    }
    
    const confirm = () => {
        props.setShowModalView(false)
    }

    const cancel = () => {
        setRefresh(!refresh)
        props.setShowModalView(false)
    }

    return(
        <>
            <Modal isOpen={props.show} className="modal-sale modal-lg" >
                <ModalHeader>
                    <label className="font-weight-bold text-align-center">Sabores seleccionados de {props.productName}</label>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <div className="row">
                            <UploadByName list={flavors} upload={uploadFlavor} itemName="Sabor" listName="flavorList" 
                                placeholder="Ingrese el nombre del sabor que busca..." maxLength="50"/>
                        </div>
                        <hr />
                        <div className="container">
                            {props.flavorsToView?.map((f,i) => {
                                return(
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="selectedFlavors" id={`rb${i+1}`} value={i} defaultChecked={i===0?true:false} onClick={() => {onClickRB(i)}}></input>
                                        <label className="form-check-label" for={`rb${i+1}`}>{i+1}</label>
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
                    <button className="btn btn-success" onClick={confirm} >Confirmar</button>
                    <button className="btn btn-danger" onClick={cancel} >Cancelar</button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default ModalFlavorView