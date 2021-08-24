import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { updateChamberFlavorsDate } from '../../../actions/ChamberFlavorsDispatchActions';
import Buttons from '../../../common/Buttons';
import dateFormat from '../../../utils/DateFormat/dateFormat';
import '../styles/ChamberFlavorsDispatch.css';
import FilterFlavors from './FilterFlavors';
import PairListFlavors from './PairListFlavors';
import warningMessage from '../../../utils/WarningMessages/warningMessage';
import validateWarning from '../../../utils/WarningMessages/validateWarning';

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
        console.log(flavors)
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


    const cancelTypeProduct = () => window.location.replace('/app/flavorsChamber');

    return (
        <>
            <div className="viewContent">
                <h1 className="display-5">Registrar salida de productos de cámara</h1>
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
                <Buttons label='Registrar' ready={ready}
                    // actionOK={registerProduct}
                    // actionNotOK={validateWarning(ready ,'Atención', 'Cargue uno o más sabores a la lista')}
                    // data={ready}
                    actionCancel={cancelTypeProduct}
                />
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        flavorsDispatchDate: state.flavorsDispatchDate,
        elementsTableDown: state.elementsTableDown,
        elementsTableUp: state.elementsTableUp,
    }
}

const mapDispatchToProps = {
    updateChamberFlavorsDate
};

export default connect(mapStateToProps, mapDispatchToProps)(ChamberFlavorsDispatch);