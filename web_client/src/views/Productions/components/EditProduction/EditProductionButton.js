import React from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../../assets/Buttons.css';
import BeShowed from "../../../../common/BeShowed";

export default function EditProductionButton(props) {
    let permissionsAccess = props.permissionsAccess;

    const handleEdit = () => {
        let aux = props.production;
        aux.title = aux.name;
        props.edit(aux);
    }

    return (
        <>
            <BeShowed show={permissionsAccess === 3}>
                <button id='editProductionButton' type="button" className="sendEdit" onClick={handleEdit}><FontAwesomeIcon icon={faEdit} /></button>
            </BeShowed>
            <BeShowed show={permissionsAccess !== 3}>
                <button id='editProductionButton' type="button" disabled className="disabledSendBtn"><FontAwesomeIcon icon={faEdit} /></button>
            </BeShowed>
        </>
    );
}