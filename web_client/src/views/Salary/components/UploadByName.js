import React, { useState, useRef } from 'react';
import BeShowed from '../../../common/BeShowed';

const UploadByName = (props) => {

    const input = useRef(null);
    const [showOptions, setShowOptions] = useState(false);

    const validateConcepts = (concept, concepts) => {
        let aux = concept;
        concepts?.forEach(existentConcept => {
            if (existentConcept.predictive === 0 && concept.toUpperCase() === existentConcept.name.toUpperCase()) aux = '';
        });
        props.destiny?.forEach(existentConcept => {
            if (concept.toUpperCase() === existentConcept.name.toUpperCase()) aux = '';
        });
        props.otherDestiny?.forEach(existentConcept => {
            if (concept.toUpperCase() === existentConcept.name.toUpperCase()) aux = '';
        });
        return aux;
    }


    const upload = (e) => {
        const j = props.i;
        const aux = [];
        props.destiny.forEach((inc, i) => {
            if (inc === j) aux[i] = { name: validateConcepts(e.target.value, props.list), price: inc.price, predictive: 1 };
            else aux[i] = { name: inc.name, price: inc.price, predictive: inc.predictive };
        });
        props.upload(aux);
    }

    const updateShowOptions = (e) => {
        setShowOptions(true);
        upload(e);
    }

    return (
        <>
            <BeShowed show={showOptions}>
                <datalist id={props.listName}>
                    {props.list?.filter((elem) => { return elem.predictive === 1; }).map((item, i) => {
                        return (<option value={item.name} key={i}></option>)
                    })}
                </datalist>
            </BeShowed>
            <input className={(props.i.name.length < 1 ? "form-control is-invalid " : "form-control ") + props.className + props.n} type="search" list={props.listName} placeholder={props.placeholder} maxLength={props.maxLength} ref={input} onChange={(e) => updateShowOptions(e)} defaultValue={props.default ? props.default : null} />
        </>
    );
}

export default UploadByName;