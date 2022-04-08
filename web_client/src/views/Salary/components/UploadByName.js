import React, { useState , useRef} from 'react';
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
            if (inc === j) aux[i] = {name: /*validateConcepts(*/e.target.value/*, props.listName)*/, price: inc.price};
            else aux[i] = {name: inc.name, price: inc.price};
        });
        //props.upload(aux);
    }

    const updateShowOptions = () => {
        setShowOptions(true);
        upload();
    }

    return(
        <>
            <BeShowed show={showOptions}>
                <datalist id={props.listName}>
                    {props.list.map((item, i) => {
                        return (<option value={item.name} key={i}></option>)
                    })}
                </datalist>
            </BeShowed>
            <div className="form-control-input">
                <input className={(i.name.length < 1 ? "form-control is-invalid" : "form-control") + props.class + props.n} type="search" list={props.listName} placeholder={props.placeholder} maxLength={props.maxLength} ref={input} onChange={(e) => updateShowOptions(e)} defaultValue={props.default?props.default:null}/>
            </div>
        </>
    );
}

export default UploadByName;