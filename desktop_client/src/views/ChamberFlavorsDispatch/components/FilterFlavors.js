
import React, { useEffect, useState, useRef } from 'react';
import BeShowed from '../../../common/BeShowed';
import Axios from 'axios';
import { connect } from 'react-redux';
import { updateFlavors, updateFiltersFlavors } from '../../../actions/ChamberFlavorsDispatchActions';
import DynamicSearch from '../../../common/DynamicSearch';
import toFilterFlavors from './toFilterFlavors';

const PORT = require('../../../config');

const ListFlavors = (props) => {
    const [familyFlavor, setFamilyFlavor] = useState();
    const [boolSearchNameFlavor, setBoolSearchNameFlavor] = useState();
    const [boolFamilyFlavor, setBoolFamilyFlavor] = useState();
    const [nameSearch, setNameSearch] = useState('');
    const [selectFamilyFlavor, setSelectFamilyFlavor] = useState();
    const inputSearchNameFlavor = useRef(null);
    const inputFamilyFlavor = useRef(null);

    useEffect(() => {
        Axios.get(`${PORT()}/api/familyFlavors`)
            .then(response => setFamilyFlavor(response.data))
            .catch(error => console.error(error))
    }, []);

    const handlerOnChangeSearchNameFlavor = () => {
        if (inputSearchNameFlavor.current.checked) {
            setBoolSearchNameFlavor(true);
            setBoolFamilyFlavor(false);
            // props.updateFlavors(props.allFlavorsDispatch);
        }
        else setBoolFamilyFlavor(false);
    };

    const handlerOnChangeFamilyFlavor = () => {
        if (inputFamilyFlavor.current.checked === true) {
            setBoolFamilyFlavor(true);
            setBoolSearchNameFlavor(false);
            // props.updateFlavors(props.allFlavorsDispatch);
        }
        else setBoolFamilyFlavor(false);
    };

    useEffect(() => {
        toFilterFlavors(nameSearch, props.flavorsDispatch, props.allFlavorsDispatch, props.updateFlavors);
    }, [nameSearch]);

    const onChangeFamilyProduct = (e) => setSelectFamilyFlavor(e.target.value);

    useEffect(() => {
        let filters = [selectFamilyFlavor];
        props.updateFiltersFlavors(filters)
    }, [selectFamilyFlavor])

    return (
        <>
            <h2>Helados</h2>
            <br />
            <h4>Filtrar por:</h4>
            <div className="form-radio-group formRow">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="radio_searchNameFlavor" ref={inputSearchNameFlavor} onChange={handlerOnChangeSearchNameFlavor} />
                    <label className="form-check-label" htmlFor="radio_searchNameFlavor">Nombre de sabor</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="radio_flavorFamily" ref={inputFamilyFlavor} onChange={handlerOnChangeFamilyFlavor} />
                    <label className="form-check-label" htmlFor="radio_flavorFamily">Familia de sabores</label>
                </div>
            </div>
            <BeShowed show={boolSearchNameFlavor}>
                <div className="formRow"><DynamicSearch placeholder="Nombre helado..." setSearchState={setNameSearch} /></div>
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
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        flavorsDispatchFilters: state.flavorsDispatchFilters,
        flavorsDispatch: state.flavorsDispatch,
        allFlavorsDispatch: state.allFlavorsDispatch,
        flavorsLisDownDispatch: state.flavorsLisDownDispatch,
    };
};

const mapDispatchToProps = {
    updateFiltersFlavors,
    updateFlavors
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFlavors);