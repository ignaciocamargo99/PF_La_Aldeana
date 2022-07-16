import { faIceCream } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { defaultQuestionSweetAlert2 } from 'utils/questionMessages/sweetAlert2Questions';
import {
    isFranchiseSupply, updateDescriptionSupply, updateLotSupply, updateMultiplePrice, updateNameSupply, updateSinglePrice, updateTypeSupply, updateUnitPerLotSupply, updateUnitSupply
} from '../../actions/SupplyActions';
import BeShowed from '../../common/BeShowed';
import Breadcrumb from '../../common/Breadcrumb';
import Buttons from '../../common/Buttons';
import displayError from '../../utils/ErrorMessages/errorMessage';
import loadingMessage from '../../utils/LoadingMessages/loadingMessage';
import successMessage from '../../utils/SuccessMessages/successMessage';
import validateSupplyRegister from '../../utils/Validations/validateSupplyRegister';
import checkData from './checkData';
import DescriptionSupply from './components/DescriptionSupply';
import MultiplePrice from './components/MultiplePrice';
import NameSupply from './components/NameSupply';
import Stock from './components/Stock';
import TypeSupply from './components/TypeSupply';

const PORT = require('../../config');

const RegisterPurchaseSupplies = (props) => {

    const cancel = () => {
        resetStates();
        window.location.href = '/app/supplies'
    }

    const resetStates = () => {
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
        stock_unit: 0, franchiseSupply: false,
        reading: false
    });
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let aux = {
            name: props.nameSupply,
            description: props.descriptionSupply,
            id_supply_type: props.typeSupply,
            price_wholesale: props.multiplePrice,
            stock_unit: props.unitSupply,
            franchiseSupply: props.franchiseSupply
        }
        setData(aux);
        setReady(checkData(aux));
    }, [props.franchiseSupply, props.nameSupply, props.descriptionSupply, props.typeSupply, props.multiplePrice, props.unitSupply])

    const registerPurchaseSupplies = async () => {
        const registrationConfirmed = (await defaultQuestionSweetAlert2(`¿Registrar "${props.nameSupply}"?`)).isConfirmed;
        if (registrationConfirmed) {
            let aux = {
                name: data.name,
                description: data.description === 'null' ? null : data.description,
                id_supply_type: data.id_supply_type,
                price_wholesale: data.price_wholesale <= 0 ? null : data.price_wholesale,
                stock_unit: data.id_supply_type === 3 ? null : data.stock_unit,
            }
            console.log(aux)
            loadingMessage('Registrando nuevo insumo...');
            Axios.post(PORT() + '/api/supplies', aux)
                .then(({ data }) => {
                    if (data.Ok) {
                        resetStates('El insumo se registro correctamente');
                        successMessage(`Atención`, 'Insumo registrado exitosamente', 'success');
                    }
                    else {
                        displayError('Ha ocurrido un error al registrar un insumo.');
                    }
                })
                .catch(() => displayError('Ha ocurrido un error en el servidor.'));
        }

    }

    const inputIsFranchiseSupply = useRef(null);

    const handlerOnChange = (e) => {
        if (e.target.value === "isFranchiseSupply") props.isFranchiseSupply(!props.franchiseSupply);
    }

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Registrar insumo"}</div>
            <Breadcrumb parentName="Insumos" icon={faIceCream} parentLink="/app/supplies" currentName="Registrar insumo" />
            <div className="viewTitle">
                <h1>Registrar Insumo</h1>
            </div>
            <div className="viewBody">
                <NameSupply data={data} />
                <DescriptionSupply data={data} />
                <div className="price-form-body ">
                    <div className="price-title">
                        <label >Precio</label>
                    </div>
                    <div className="price-container">
                        <div className="form-check form-check-inline col-sm-3" style={{ alignSelf: 'center' }}>
                            <input className="form-check-input" type="checkbox" id="isFranchiseSupply" value="isFranchiseSupply" ref={inputIsFranchiseSupply} onChange={(e) => handlerOnChange(e)} />
                            <label className="price-type-label price-label" htmlFor="isFranchiseSupply">¿Se envía a franquicias?</label>
                        </div>
                        <BeShowed show={props.franchiseSupply}>
                            <MultiplePrice data={data} />
                        </BeShowed>
                    </div>
                </div>
                <div className="price-title">
                    <label >Stock*</label>
                </div>
                <TypeSupply data={data} />
                <BeShowed show={props.typeSupply < 3 && props.typeSupply > 0}>
                    <Stock data={data} />
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
    isFranchiseSupply
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPurchaseSupplies);