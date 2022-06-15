import React from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../../assets/Buttons.css';
import BeShowed from '../../../../common/BeShowed';

export default function EditSupplies(props) {
    let permissionsAccess = props.permissionsAccess;

    const handleEdit = () => {
        let aux = props.data;
        aux.title = aux.name;
        props.edit(aux);
    }

    return (
        <>
            <BeShowed show={permissionsAccess === 3}>
                <button
                    id='editSupplyButton'
                    type="button"
                    className="btn btn-info btnEdit"
                    onClick={handleEdit}>
                    <FontAwesomeIcon icon={faEdit}
                    />
                </button>
            </BeShowed>
            <BeShowed show={permissionsAccess !== 3}>
                <button
                    id='editSupplyButton'
                    type="button"
                    disabled
                    className="disabledSendBtn">
                    <FontAwesomeIcon icon={faEdit}
                    />
                </button>
            </BeShowed>
        </>
    );
}