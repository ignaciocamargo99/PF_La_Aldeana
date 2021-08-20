
import React, { useEffect, useState, useRef } from 'react';
import BeShowed from '../../../common/BeShowed';
import Axios from 'axios';
import { connect } from 'react-redux';
import { updateFlavors, updateFiltersFlavors } from '../../../actions/ChamberFlavorsDispatchActions';
import DynamicSearch from '../../../common/DynamicSearch';

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
        }
        else setBoolFamilyFlavor(false);
    };

    const handlerOnChangeFamilyFlavor = () => {
        if (inputFamilyFlavor.current.checked === true) {
            setBoolFamilyFlavor(true);
            setBoolSearchNameFlavor(false);
        }
        else setBoolFamilyFlavor(false);
    };

    useEffect(() => {
        const aux = [props.flavorsDispatch];
        if (nameSearch.trim()) {
            let x = []
            x.length = props.flavorsDispatch.length;
            props.flavorsDispatch.map((flavor, i) => {
                if (flavor.name.toUpperCase().includes(nameSearch.toUpperCase())) x[i] = flavor;
            })
            props.updateFlavors(x);
        }
        // else props.updateFlavors(aux);
        // else {
        //     Axios.get(`${PORT()}/api/flavors`)
        //         .then(response => props.updateFlavors(response.data))
        //         .catch(error => console.error(error))
        // }
    }, [nameSearch, props.flavorsDispatch]);

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
        flavorsDispatch: state.flavorsDispatch
    };
};

const mapDispatchToProps = {
    updateFiltersFlavors,
    updateFlavors
}

export default connect(mapStateToProps, mapDispatchToProps)(ListFlavors);