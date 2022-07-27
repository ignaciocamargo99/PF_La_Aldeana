import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const EditButton = ({ link, permissionsAccess }) => {
    let buttonStyle = 'btn btn-info btnEdit';
    if (permissionsAccess !== 3) {
        buttonStyle = 'disabledSendBtn';
    }

    return (
        <Link to={link}>
            <button
                className={buttonStyle}
                disabled={permissionsAccess !== 3 ? true : false}
                type="button"
            >
                <FontAwesomeIcon icon={faEdit} />
            </button>
        </Link>
    )
}

export default EditButton