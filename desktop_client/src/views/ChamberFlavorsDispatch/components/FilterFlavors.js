
import React, { useEffect, useState, useRef } from 'react';
import BeShowed from '../../../common/BeShowed';
import Axios from 'axios';

const PORT = require('../../../config');

const ListFlavors = () => {
    const [typeFlavor, setTypeFlavor] = useState();
    const [familyFlavor, setFamilyFlavor] = useState();
    const inputTypeFlavor = useRef('');
    const inputFamilyFlavor = useRef('');

    useEffect(() => {
        Axios.get(`${PORT()}/api/typeFlavors`)
            .then(response => setTypeFlavor(response.data))
            .catch(error => console.error(error))
    })
    useEffect(() => {
        Axios.get(`${PORT()}/api/familyFlavors`)
            .then(response => setFamilyFlavor(response.data))
            .catch(error => console.error(error))
    })

    const handlerOnChangeTypeFlavor = (e) => {
        if (e.target.value === 'typeFlavor') inputTypeFlavor.current.value = e.target.value;
    }

    const handlerOnChangeFamilyFlavor = (e) => {
        if (e.target.value === 'familyFlavor') inputFamilyFlavor.current.value = e.target.value;
    }

    return (
        <>
            <h2>Helados</h2>
            <br />
            <h4>Filtrar por:</h4>
            <div className="form-radio-group formRow">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="typeFlavor" id="check_flavorType" ref={inputTypeFlavor} onChange={e => handlerOnChangeTypeFlavor(e)} />
                    <label className="form-check-label" htmlFor="check_flavorType">
                        Tipos de sabor
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" value="familyFlavor" id="check_flavorFamily" ref={inputFamilyFlavor} onChange={e => handlerOnChangeFamilyFlavor(e)} />
                    <label className="form-check-label" htmlFor="check_flavorFamily">
                        Familia de sabores
                    </label>
                </div>
            </div>
            <BeShowed show={inputTypeFlavor.current.checked}>
                <select className="form-combo-btn" id="selectTypeProduct" defaultValue='-1'>
                    <option disabled value="-1">Seleccione tipo de sabor</option>
                    {
                        typeFlavor?.map((element, i) => (
                            <option key={i} value={element.id_type_flavor}>{element.name}</option>
                        ))
                    }
                </select>
            </BeShowed>
            <BeShowed show={inputFamilyFlavor.current.checked}>
            <br /><br />
                <select className="form-combo-btn" id="selectTypeProduct" defaultValue='-1'>
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

export default ListFlavors;