import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import '../../../../assets/Buttons.css';
import BeShowed from '../../../../common/BeShowed';

const EditEmployeeButton = ({ employeeData, handleEditEmpoyeeClicked, permissionsAccess }) => {

    const handleEdit = () => {
        handleEditEmpoyeeClicked(employeeData);
    };

    return (
        <>
            <BeShowed show={permissionsAccess === 3}>
                <button id='editEmployeeButton' type="button" className="btn btn-info btnEdit" onClick={handleEdit}><FontAwesomeIcon icon={faEdit} /></button>
            </BeShowed>
            <BeShowed show={permissionsAccess !== 3}>
                <button id='editEmployeeButton' disabled type="button" className="disabledSendBtn"><FontAwesomeIcon icon={faEdit} /></button>
            </BeShowed>
        </>

    );
};

export default EditEmployeeButton;
