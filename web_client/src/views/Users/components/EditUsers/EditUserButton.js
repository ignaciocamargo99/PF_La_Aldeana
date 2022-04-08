import React from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../../assets/Buttons.css';

export default function EditUserButton(props) {

    const handleEdit = () => {
        let aux = props.data;
        aux.title = aux.nick_user;
        props.edit(aux);
    }

    return (
        <button id='editUserButton' type="button" className="sendEdit" onClick={handleEdit}><FontAwesomeIcon icon={faEdit} /></button>
    );

}