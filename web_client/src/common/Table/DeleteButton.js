import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import { defaultQuestionSweetAlert2 } from "utils/questionMessages/sweetAlert2Questions";
import PropTypes from 'prop-types'

const DeleteButton = ({ disable, warningTitle, warningText, onConfirm }) => {
    let buttonStyle = 'btn btn-danger btnDelete';
    if (disable) {
        buttonStyle = 'disabledSendBtn';
    }

    const handleDelete = async () => {
        const deletionConfirmed = (await defaultQuestionSweetAlert2(warningTitle, warningText)).isConfirmed;
        if (deletionConfirmed) {
            onConfirm();
        };
    }

    return (
        <button
            className={buttonStyle}
            disabled={disable}
            onClick={handleDelete}
            type="button"
        >
            <FontAwesomeIcon icon={faMinus} />
        </button>
    )
}

DeleteButton.propTypes = {
    onConfirm: PropTypes.func.isRequired,
}

DeleteButton.defaultProps = {
    warningTitle: '¿Seguro que desea eliminar el elemento seleccionado?',
    warningText: 'El elemento ya no estará disponible.'
}

export default DeleteButton