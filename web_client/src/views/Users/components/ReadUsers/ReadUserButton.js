import React from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../../assets/Buttons.css';

export default function ReadUserButton(props) {

    const handleRead = () => {
        let aux = props.data;
        aux.title = aux.nick_user;
        props.read(aux);
    }

    return (
        <button id='readUserButton' type="button" className="btn btn-warning btnRead" onClick={handleRead}><FontAwesomeIcon icon={faEye} /></button>
    );

}