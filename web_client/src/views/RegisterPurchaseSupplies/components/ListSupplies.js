import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addPurchasePrice, addPurchaseQuantity, addPurchaseSubtotal, removePurchasePrice, removePurchaseQuantity, removePurchaseSubtotal, updatePurchaseSupplies } from '../../../actions/PurchaseSuppliesActions';
import BeShowed from '../../../common/BeShowed';
import UploadByName from '../../../common/UploadByName';
import PurchaseTable from './PurchaseTable';
import TablePagination from './TablePagination';
import TabOption from './TabOption';

const PORT = require('../../../config');

const ListSupplies = (props) => {

    const [supplies, setSupplies] = useState([])
    const [typeOfUpload, setTypeOfUpload] = useState('text')

    useEffect(() => {
        axios.get(PORT() + `/api/supplies-with-stock`)
            .then((response) => {
                setSupplies(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [true])

    const upload = (id) => {
        let supplyAdd = supplies.find(supply => supply.id_supply == id)
        let aux = supplies.filter(supply => supply.id_supply != id)
        setSupplies(aux)
        let auxDestiny = props.purchaseSupplies
        auxDestiny = [...auxDestiny, supplyAdd]
        props.updatePurchaseSupplies(auxDestiny)
        props.addPurchaseQuantity(0)
        props.addPurchasePrice(0)
        props.addPurchaseSubtotal(0)
    }

    const download = (id, i) => {
        let supplyRemove = props.purchaseSupplies.find(supply => supply.id_supply == id)
        let auxDestiny = props.purchaseSupplies.filter(supply => supply.id_supply != id)
        props.updatePurchaseSupplies(auxDestiny)
        let aux = supplies
        aux = [...supplies, supplyRemove]
        setSupplies(aux)
        props.removePurchaseQuantity(i)
        props.removePurchasePrice(i)
        props.removePurchaseSubtotal(i)
    }

    const handlerTabSelection = (value) => setTypeOfUpload(value);

    const columnsHeaders = [
        {
            name: 'Nombre',
            width: '60%'
        },
        {
            name: 'Agregar',
            width: '40%'
        }
    ];

    return (
        <div>
            <div className="formRow">
                <div className="form-control-label">
                    <h3>Insumos</h3>
                </div>
            </div>
            <div className="formRow">
                <TabOption handler={handlerTabSelection} select={typeOfUpload}></TabOption>
            </div>
            <BeShowed show={typeOfUpload === "text"}>
                <UploadByName list={supplies} upload={upload} itemName="Insumo" listName="suppliesList"
                    placeholder="Ingrese el nombre del insumo que busca..." maxLength="50" id='id_supply' />
            </BeShowed>
            <BeShowed show={typeOfUpload === "list"}>
                <div className="viewBody">
                    <TablePagination columnsHeaders={columnsHeaders} currentElements={supplies} addBtnClicked={upload}></TablePagination>
                </div>
            </BeShowed>
            <hr></hr>
            <div className="form-control-label">
                <h3 style={{ marginTop: '5%' }}>Detalle</h3>
            </div>
            <div className="viewBody">
                <PurchaseTable purchaseSupplies={props.purchaseSupplies} download={download} />
            </div>
            <div className="offset-sm-9 col-sm-3">
                <label><b>Total: ${props.purchaseTotal}</b></label>
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