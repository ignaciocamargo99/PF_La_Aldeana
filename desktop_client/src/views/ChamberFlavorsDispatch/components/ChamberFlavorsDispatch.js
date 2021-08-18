import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import '../styles/ChamberFlavorsDispatch.css';
import dateFormat from '../../../utils/DateFormat/dateFormat';
import { updateChamberFlavorsDate } from '../../../actions/ChamberFlavorsDispatchActions';
import ListFlavors from './ListFlavorsUp';
import FilterFlavors from './FilterFlavors';

const ChamberFlavorsDispatch = (props) => {

    const inputDate = useRef();

    useEffect(() => {
        let date = new Date()
        let dateString = dateFormat(date)
        inputDate.current.max = dateString
        props.updateChamberFlavorsDate(dateString)
    }, [true])

    const onChangeDate = () => {
        let date = new Date()
        let dateString = dateFormat(date)
        if (inputDate.current.value > dateString || inputDate.current.value < "2021-01-01") {
            props.updateChamberFlavorsDate(dateString)
            inputDate.current.value = dateString
        }
        else props.updateChamberFlavorsDate(inputDate.current.value)
    }

    return (
        <form>
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
                <ListFlavors />
            </div>
        </form>
    );
}

const mapStateToProps = (state) => {
    return {
        flavorsDispatchDate: state.flavorsDispatchDate
    }

}

const mapDispatchToProps = {
    updateChamberFlavorsDate
};

export default connect(mapStateToProps, mapDispatchToProps)(ChamberFlavorsDispatch);