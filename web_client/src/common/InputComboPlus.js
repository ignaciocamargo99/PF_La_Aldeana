import { useRef, useState } from 'react';
import Combo from "./Combo";

const InputComboPlus = (props) => {

    const openModal = () => {
        props.open(props.label);
    }

    return (
        <div className="row justify-content-start">
            <Combo
                descriptioncombo={props.label} 
                optiondefault={props.optiondefault}
                defaultValue='-1' 
                options={props.options}>
                <button type="button" className="col-md-1 plus" onClick={openModal}>+</button>
            </Combo>
        </div>
    );
}

export default InputComboPlus;