import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const EditButton = ({ link, disable }) => {
    let buttonStyle = 'btn btn-info btnEdit';
    if (disable) {
        buttonStyle = 'disabledSendBtn';
    }

    return (
        <Link to={link}>
            <button
                className={buttonStyle}
                disabled={disable}
                type="button"
            >
                <FontAwesomeIcon icon={faEdit} />
            </button>
        </Link>
    )
}

export default EditButton