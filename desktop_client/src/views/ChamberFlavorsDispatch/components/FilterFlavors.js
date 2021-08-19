
import React, { useEffect, useState, useRef } from 'react';
import BeShowed from '../../../common/BeShowed';
import Axios from 'axios';
import { connect } from 'react-redux';
import {updateFiltersFlavors} from '../../../actions/ChamberFlavorsDispatchActions';


const PORT = require('../../../config');

const ListFlavors = (props) => {
    const [typeFlavor, setTypeFlavor] = useState();
    const [familyFlavor, setFamilyFlavor] = useState();
    const [boolTypeFlavor, setBoolTypeFlavor] = useState();
    const [boolFamilyFlavor, setBoolFamilyFlavor] = useState();
    const [selectTypeFlavor, setSelectTypeFlavor] = useState();
    const [selectFamilyFlavor, setSelectFamilyFlavor] = useState();
    const inputTypeFlavor = useRef(null);
    const inputFamilyFlavor = useRef(null);

    useEffect(() => {
        Axios.get(`${PORT()}/api/typeFlavors`)
            .then(response => setTypeFlavor(response.data))
            .catch(error => console.error(error))
        Axios.get(`${PORT()}/api/familyFlavors`)
            .then(response => setFamilyFlavor(response.data))
            .catch(error => console.error(error))
    }, [])

    const handlerOnChangeTypeFlavor = () => {
        if (inputTypeFlavor.current.checked === true) setBoolTypeFlavor(true)
        else setBoolTypeFlavor(false);
    };

    const handlerOnChangeFamilyFlavor = () => {
        if (inputFamilyFlavor.current.checked === true) setBoolFamilyFlavor(true)
        else setBoolFamilyFlavor(false);
    };

    const onChangeTypeProduct = (e) => setSelectTypeFlavor(e.target.value);

    const onChangeFamilyProduct = (e) => setSelectFamilyFlavor(e.target.value);

    useEffect(() => {
        let filters = [selectTypeFlavor, selectFamilyFlavor];
        props.updateFiltersFlavors(filters)
    }, [selectTypeFlavor, selectFamilyFlavor])


    return (
        <>
            <h2>Helados</h2>
            <br />
            <h4>Filtrar por:</h4>
            <div className="form-radio-group formRow">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="typeFlavor" id="check_flavorType" ref={inputTypeFlavor} onChange={(e) => handlerOnChangeTypeFlavor(e)} />
                    <label className="form-check-label" htmlFor="check_flavorType">
                        Tipos de sabor
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="familyFlavor" id="check_flavorFamily" ref={inputFamilyFlavor} onChange={(e) => handlerOnChangeFamilyFlavor(e)} />
                    <label className="form-check-label" htmlFor="check_flavorFamily">
                        Familia de sabores
                    </label>
                </div>
            </div>
            <div className="formRow">
                <BeShowed show={boolTypeFlavor}>
                    <select className="form-combo-btn" id="selectTypeProduct" defaultValue='-1' onChange={e => onChangeTypeProduct(e)}>
                        <option disabled value="-1">Seleccione tipo de sabor</option>
                        {
                            typeFlavor?.map((element, i) => (
                                <option key={i} value={element.id_type_flavor}>{element.name}</option>
                            ))
                        }
                    </select>
                </BeShowed>
                <BeShowed show={boolFamilyFlavor}>
                    <select className="form-combo-btn" id="selectTypeProduct" defaultValue='-1' onChange={e => onChangeFamilyProduct(e)}>
                        <option disabled value="-1">Seleccione familia</option>
                        {
                            familyFlavor?.map((element, i) => (
                                <option key={i} value={element.id_family_flavor}>{element.name}</option>
                            ))
                        }
                    </select>
                </BeShowed>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        flavorsDispatchFilters: state.flavorsDispatchFilters
    };
};

const mapDispatchToProps = {
    updateFiltersFlavors
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFlavors);