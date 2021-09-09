import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import Buttons from '../../../common/Buttons';
import dateFormat from '../../../utils/DateFormat/dateFormat';
import errorMessage from '../../../utils/ErrorMessages/errorMessage';
import successMessage from '../../../utils/SuccessMessages/successMessage';
import validateWarning from '../../../utils/WarningMessages/validateWarning';
import '../styles/ChamberFlavorsDispatch.css';
import FilterFlavors from './FilterFlavors';
import PairListFlavors from './PairListFlavors';
import { updateChamberFlavorsDate, updateFiltersFlavors} from '../../../actions/ChamberFlavorsDispatchActions';
import { updateTableUp, updateAllElements, updateTableDown } from '../../../actions/TableUpDownActions';
import { toChamberFlavorsDispatch, lockMenu, unlockMenu } from '../../../actions/MenuActions';

const PORT = require('../../../config');

const ChamberFlavorsDispatch = (props) => {
    const inputDate = useRef();
    const [ready, setReady] = useState();

    useEffect(() => {
        let date = new Date()
        let dateString = dateFormat(date)
        inputDate.current.max = dateString
        props.updateChamberFlavorsDate(dateString)
    }, [true]);

    useEffect(() => {
        const flavors = props.elementsTableDown.filter((flavor) => true && flavor.amount > 0);
        if (flavors.length > 0) setReady(true);
        else setReady(false);
    }, [props.elementsTableDown, props.elementsTableUp])

    const onChangeDate = () => {
        let date = new Date();
        let dateString = dateFormat(date);
        if (inputDate.current.value > dateString || inputDate.current.value < "2021-01-01") {
            props.updateChamberFlavorsDate(dateString);
            inputDate.current.value = dateString;
        }
        else props.updateChamberFlavorsDate(inputDate.current.value);
    };

    const resetStates = () => {
        // props.updateChamberFlavorsDate()
        // props.updateAllElements([]);
        props.updateTableUp(props.allElements);
        props.updateTableDown([]);
        window.scrollTo(0, 0);
    }

    const registerProduct = () => {
        if (ready) {
            let flavorsToDispatch = [];
            props.elementsTableDown.forEach((flavor) => flavor.date_dispatch = props.flavorsDispatchDate);
            flavorsToDispatch = props.elementsTableDown;
            console.log(flavorsToDispatch)
            Axios.post(`${PORT()}/api/chamberFlavorsDispatch/new`, flavorsToDispatch)
                .then((flavorsToDispatch) => {
                    if (flavorsToDispatch.data.Ok) {
                        resetStates();
                        successMessage('Atención', 'Salida de helados de cámara regitrado exitosamente.');
                    }
                    else errorMessage('Error', 'Ha ocurrido un problema al registrar la salida de helados')
                })
                .catch((error) => console.log(error));
        }
    }

    return (
        <>
            <div className="viewContent">
                <h1 className="display-5">Registrar salida de helados de cámara</h1>
                <hr />
                <div className="formRowDate">
                    <div className="form-control-label-date">
                        <label>Fecha</label>
                    </div>
                    <div className="form-control-input">
                        <input id="input_date" type='date' className='form-control' defaultValue={props.flavorsDispatchDate} ref={inputDate} onChange={onChangeDate} min='2021-01-01' ></input>
                    </div>
                </div>
                <FilterFlavors />
                <PairListFlavors />
                <Buttons label='Registrar' ready={ready} actionOK={registerProduct} actionNotOK={validateWarning} data={ready} actionCancel={resetStates} />
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        flavorsDispatchDate: state.flavorsDispatchDate,
        elementsTableDown: state.elementsTableDown,
        elementsTableUp: state.elementsTableUp,
        allElements: state.allElements
    }
}

const mapDispatchToProps = {
    updateChamberFlavorsDate,
    updateFiltersFlavors,
    updateTableUp,
    updateAllElements,
    updateTableDown,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChamberFlavorsDispatch);