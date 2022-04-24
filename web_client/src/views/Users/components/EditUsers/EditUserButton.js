import React from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../../assets/Buttons.css';
import BeShowed from '../../../../common/BeShowed';

export default function EditUserButton(props) {
    let permissionsAccess = props.permissionsAccess;

    const handleEdit = () => {
        let aux = props.data;
        aux.title = aux.nick_user;
        props.edit(aux);
    }

    return (
        <>
            <BeShowed show={permissionsAccess === 3}>
                <button id='editUserButton' type="button" className="sendEdit" onClick={handleEdit}><FontAwesomeIcon icon={faEdit} /></button>
            </BeShowed>
            <BeShowed show={permissionsAccess !== 3}>
                <button id='editUserButton' type="button" disabled className="disabledSendBtn"><FontAwesomeIcon icon={faEdit} /></button>
            </BeShowed>
        </>
    );

}