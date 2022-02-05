import React from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../../assets/Buttons.css';

export default function EditProductionButton(props) {

    const handleEdit = () => {
        let aux = props.production;
        aux.title = aux.name;
        props.edit(aux);
    }

    return (
        <button id='editProductionButton' type="button" className="sendEdit" onClick={handleEdit}><FontAwesomeIcon icon={faEdit} /></button>
    );

}