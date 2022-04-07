import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import '../../../../assets/Buttons.css';


const EditEmployeeButton = ({ employeeData, handleEditEmpoyeeClicked }) => {

    const handleEdit = () => {
        handleEditEmpoyeeClicked(employeeData);
    };

    return (
        <button id='editEmployeeButton' type="button" className="sendEdit" onClick={handleEdit}>
            <FontAwesomeIcon icon={faEdit} />
        </button>
    );
};

export default EditEmployeeButton;
