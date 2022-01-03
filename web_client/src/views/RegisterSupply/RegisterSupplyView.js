import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
    updateNameSupply, updateDescriptionSupply, updateSinglePrice, updateMultiplePrice, updateTypeSupply, updateLotSupply, updateUnitPerLotSupply, updateUnitSupply,
    isDeliverySupply, isFranchiseSupply
} from '../../actions/SupplyActions';
import NameSupply from './components/NameSupply';
import DescriptionSupply from './components/DescriptionSupply';
import SinglePrice from './components/SinglePrice';
import MultiplePrice from './components/MultiplePrice';
import Stock from './components/Stock';
import TypeSupply from './components/TypeSupply';
import Buttons from '../../common/Buttons';
import validateSupplyRegister from '../../utils/Validations/validateSupplyRegister';
import success from '../../utils/SuccessMessages/successTypeProduct';
import displayError from '../../utils/ErrorMessages/errorMessage';
import Axios from 'axios';
import BeShowed from '../../common/BeShowed';
import checkData from './checkData';

const PORT = require('../../config');

const RegisterPurchaseSupplies = (props) => {

    const cancel = () => {
        resetStates();
        window.location.href = './supplies'
    }

    const resetStates = (message) => {
        //successPurchaseSupplies(message)
        props.updateNameSupply(null)
        props.updateDescriptionSupply(null)
        props.updateSinglePrice(0)
        props.updateMultiplePrice(0)
        props.updateTypeSupply(-1)
        props.updateLotSupply(0)
        props.updateUnitPerLotSupply(0)
        props.updateUnitSupply(0)
    }

    const [data, setData] = useState({
        name: 'null', description: 'null', id_supply_type: -1, price_wholesale: 0,
        price_retail: 0, stock_lot: 0, stock_unit: 0, unit_x_lot: 0, franchiseSupply: false, deliverySupply: false
    });
    const [ready, setReady] = useState(false);

    useEffect(() => {

        let aux = {
            name: props.nameSupply,
            description: props.descriptionSupply,
            id_supply_type: props.typeSupply,
            price_wholesale: props.multiplePrice,
            price_retail: props.singlePrice,
            stock_lot: props.lotSupply,
            stock_unit: props.unitSupply,
            unit_x_lot: props.unitPerLotSupply,
            franchiseSupply: props.franchiseSupply,
            deliverySupply: props.deliverySupply
        }

        setData(aux);

        setReady(checkData(aux));

    }, [props.franchiseSupply, props.deliverySupply, props.nameSupply, props.descriptionSupply, props.typeSupply, props.multiplePrice, props.singlePrice, props.lotSupply, props.unitSupply, props.unitPerLotSupply])

    const registerPurchaseSupplies = () => {
        let aux = {
            name: data.name,
            description: data.description === 'null' ? null : data.description,
            id_supply_type: data.id_supply_type,
            price_wholesale: data.price_wholesale <= 0 ? null : data.price_wholesale,
            price_retail: data.price_retail <= 0 ? null : data.price_retail,
            stock_lot: data.id_supply_type !== 2 ? null : data.stock_lot,
            stock_unit: data.id_supply_type === 3 ? null : data.stock_unit,
            unit_x_lot: data.id_supply_type !== 2 ? null : data.unit_x_lot
        }

        Axios.post(PORT() + '/api/supplies', aux)
            .then(({ data }) => {
                if (data.Ok) {
                    resetStates('Registro completado');
                    success();
                }
                else {
                    displayError('Ha ocurrido un error al registrar un insumo.');
                }
            })
            .catch(() => displayError('Ha ocurrido un error en el servidor.', 'Error'));
    }


    const inputIsDeliverySupply = useRef(null);
    const inputIsFranchiseSupply = useRef(null);

    const handlerOnChange = (e) => {
        if (e.target.value === "isDeliverySupply") props.isDeliverySupply(!props.deliverySupply);
        if (e.target.value === "isFranchiseSupply") props.isFranchiseSupply(!props.franchiseSupply);
    }

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Registrar insumo"}</div>
            <div className="viewTitle">
                <h1>Registrar Insumo</h1>
            </div>
            <div className="viewBody">
                <NameSupply />
                <DescriptionSupply />
                <div className="price-form-body ">
                    <div className="price-title">
                        <label >Precio</label>
                    </div>
                    <div className="price-container">
                        <div className="form-check form-check-inline col-sm-3" style={{ alignSelf: 'center' }}>
                            <input className="form-check-input" type="checkbox" id="isDeliverySupply" value="isDeliverySupply" ref={inputIsDeliverySupply} onChange={(e) => handlerOnChange(e)} />
                            <label className="price-type-label price-label" htmlFor="isDeliverySupply">Se envía por delivery?</label>
                        </div>
                        <BeShowed show={props.deliverySupply}>
                            <SinglePrice />
                        </BeShowed>

                    </div>
                    <div className="price-container">
                        <div className="form-check form-check-inline col-sm-3" style={{ alignSelf: 'center' }}>
                            <input className="form-check-input" type="checkbox" id="isFranchiseSupply" value="isFranchiseSupply" ref={inputIsFranchiseSupply} onChange={(e) => handlerOnChange(e)} />
                            <label className="price-type-label price-label" htmlFor="isFranchiseSupply">Se envía a franquicias?</label>
                        </div>
                        <BeShowed show={props.franchiseSupply}>
                            <MultiplePrice />
                        </BeShowed>
                    </div>
                </div>
                <div className="price-title">
                    <label >Stock*</label>
                </div>
                <TypeSupply />
                <BeShowed show={props.typeSupply < 3 && props.typeSupply > 0}>
                    <Stock />
                </BeShowed>
                <Buttons ready={ready} label={"Registrar"} actionCancel={cancel} actionOK={registerPurchaseSupplies} actionNotOK={validateSupplyRegister} data={data} />
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        nameSupply: state.nameSupply,
        descriptionSupply: state.descriptionSupply,
        singlePrice: state.singlePrice,
        multiplePrice: state.multiplePrice,
        typeSupply: state.typeSupply,
        lotSupply: state.lotSupply,
        unitPerLotSupply: state.unitPerLotSupply,
        unitSupply: state.unitSupply,
        deliverySupply: state.deliverySupply,
        franchiseSupply: state.franchiseSupply
    }
}

const mapDispatchToProps = {
    updateNameSupply,
    updateDescriptionSupply,
    updateSinglePrice,
    updateMultiplePrice,
    updateTypeSupply,
    updateLotSupply,
    updateUnitPerLotSupply,
    updateUnitSupply,
    isDeliverySupply,
    isFranchiseSupply
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPurchaseSupplies);