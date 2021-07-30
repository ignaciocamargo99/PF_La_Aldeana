import axios from 'axios';
import { connect } from 'react-redux';
import { updatePurchaseSupplies , addPurchaseQuantity , removePurchaseQuantity, addPurchasePrice , removePurchasePrice, addPurchaseSubtotal, removePurchaseSubtotal} from '../../../actions/PurchaseSuppliesActions';
import React, { useEffect, useState } from 'react';
import BeShowed from '../../../common/BeShowed';
import UploadByName from '../../../common/UploadByName';
import SuppliesTable from './SuppliesTable';
import PurchaseTable from './PurchaseTable';

const PORT = require('../../../config');

const ListSupplies = (props) => {
    
    const [supplies,setSupplies] = useState([])
    const [searchByName,setSearchByName] = useState(true)

    useEffect(()=>{
        axios.get( PORT() + `/api/supplies`)
        .then((response) => {
            setSupplies(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    },[true === false])

    const upload = (id) => {
        let supplyAdd = supplies.find(supply => supply.id_supply == id)
        let aux = supplies.filter(supply => supply.id_supply!=id)
        setSupplies(aux)
        let auxDestiny = props.purchaseSupplies
        auxDestiny = [...auxDestiny,supplyAdd]
        props.updatePurchaseSupplies(auxDestiny)
        props.addPurchaseQuantity(0)
        props.addPurchasePrice(0)
        props.addPurchaseSubtotal(0)
    }

    const download = (id,i) => {
        let supplyRemove = props.purchaseSupplies.find(supply => supply.id_supply == id)
        let auxDestiny = props.purchaseSupplies.filter(supply => supply.id_supply!=id)
        props.updatePurchaseSupplies(auxDestiny)
        let aux = supplies
        aux = [...supplies,supplyRemove]
        setSupplies(aux)
        props.removePurchaseQuantity(i)
        props.removePurchasePrice(i)
        props.removePurchaseSubtotal(i)
    }


    
    return(
        <div>
            <div className="formRow">
                <div className="form-control-label">
                    <label htmlFor="purchaseSupplies" >Insumos:</label>
                </div>
            </div>
            <div className="formRow offset-sm-2 col-sm-8">
                <div className="form-control-label">
                    <button type="button" style={{backgroundColor: '#A5DEF9', borderColor: '#A5DEF9'}} onClick={() => {setSearchByName(true)}}><label style={{color: '#383C77'}}><b>Buscar insumo por nombre</b></label></button>
                </div>
                <div className="form-control-label">
                    <button type="button" style={{backgroundColor: '#A5DEF9', borderColor: '#A5DEF9'}} onClick={() => {setSearchByName(false)}}><label style={{color: '#383C77'}}><b>Listar todos los insumos</b></label></button>
                </div>
            </div>
            <BeShowed show={searchByName}>
                <UploadByName list={supplies} upload={upload} itemName="Insumo" listName="suppliesList" 
                                placeholder="Ingrese el nombre del insumo que busca..." maxLength="50" />
            </BeShowed>
            <BeShowed show={!searchByName}>
                <div className="viewBody">
                    <SuppliesTable supplies={supplies} upload={upload}/>
                </div>
            </BeShowed>
            <div className="offset-sm-4">
                <h3 style={{marginTop: "5%"}} ><b>Detalle de compra</b></h3>
            </div>
            <div className="viewBody">
                <PurchaseTable purchaseSupplies={props.purchaseSupplies} download={download}/>
            </div>
            <div className="offset-sm-9 col-sm-3">
                <label>Total: ${props.purchaseTotal}</label>
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        purchaseSupplies: state.purchaseSupplies,
        purchaseQuantity: state.purchaseQuantity,
        purchasePrice: state.purchasePrice,
        purchaseSubtotal: state.purchaseSubtotal,
        purchaseTotal: state.purchaseTotal
    }
}

const mapDispatchToProps = {
    updatePurchaseSupplies,
    addPurchaseQuantity,
    removePurchaseQuantity,
    addPurchasePrice,
    removePurchasePrice,
    addPurchaseSubtotal,
    removePurchaseSubtotal
}

export default connect(mapStateToProps, mapDispatchToProps)(ListSupplies);