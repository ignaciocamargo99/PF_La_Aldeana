import React, {useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { updateNameSupply, updateDescriptionSupply, updateSinglePrice, updateMultiplePrice, updateTypeSupply, updateLotSupply, updateUnitPerLotSupply, updateUnitSupply } from '../../actions/SupplyActions';
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

    const [data, setData] = useState({name: 'null', description: 'null', id_supply_type: -1, price_wholesale: 0,
        price_retail: 0, stock_lot: 0, stock_unit: 0, unit_x_lot: 0});
    const [ready, setReady] = useState(false);

    useEffect(()=>{
        
        setData({
            name: props.nameSupply,
            description: props.descriptionSupply,
            id_supply_type: props.typeSupply,
            price_wholesale: props.multiplePrice,
            price_retail: props.singlePrice,
            stock_lot: props.lotSupply,
            stock_unit: props.unitSupply,
            unit_x_lot: props.unitPerLotSupply
        });

        if (props.nameSupply !== '' && props.nameSupply !== 'null' && props.typeSupply >= 0 && props.multiplePrice > 0 &&
        props.singlePrice > 0 && props.lotSupply > 0 && props.unitSupply > 0 && props.unitPerLotSupply > 0) {
            setReady(true);
        } else {
            setReady(false);
        }
    }, [props.nameSupply, props.descriptionSupply, props.typeSupply, props.multiplePrice, props.singlePrice, props.lotSupply, props.unitSupply, props.unitPerLotSupply])
    const registerPurchaseSupplies = () => {
        
        Axios.post(PORT() + '/api/supply/new', data)
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

    return(
        <>
            <div className="viewTitle">
                <h1>Registrar Insumos</h1>
            </div>
            <div className="viewBody">
                <NameSupply />
                <DescriptionSupply />
                <div className="price-form-body ">
                    <div className="price-title">
                        <label >Precio*</label>
                    </div>
                    <div className="price-container">
                        <SinglePrice />
                        <MultiplePrice />
                    </div>
                </div>
                <TypeSupply />
                <Stock />
                <Buttons ready={ready} label={"Registrar"} actionCancel={cancel} actionOK={registerPurchaseSupplies} actionNotOK={validateSupplyRegister} data={data}/>            
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
        unitSupply: state.unitSupply
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
    updateUnitSupply
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterPurchaseSupplies);