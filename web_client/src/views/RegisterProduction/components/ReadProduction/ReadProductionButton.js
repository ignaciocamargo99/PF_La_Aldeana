import React from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../../assets/Buttons.css';

export default function ReadProductButton(props) {

    const handleRead = () => {
        let aux = props.production;
        aux.title = aux.name;
        props.read(aux);
    }

    return (
        <button id='readProductionButton' type="button" className="sendEdit" onClick={handleRead}><FontAwesomeIcon icon={faEye} /></button>
    );

}