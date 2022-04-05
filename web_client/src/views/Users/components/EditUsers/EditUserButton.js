import React from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../../assets/Buttons.css';

export default function EditUserButton(props) {

    const handleEdit = () => {
        let aux = props.production;
        aux.title = aux.name;
        props.edit(aux);
    }

    return (
        <button id='editUserButton' type="button" className="sendEdit"><FontAwesomeIcon icon={faEdit} /></button>
    );

}