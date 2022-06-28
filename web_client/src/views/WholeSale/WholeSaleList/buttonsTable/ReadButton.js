import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const ReadButton = ({ link }) => {
    return (
        <Link to="#">
            <button
                className="btn btn-warning btnRead"
                type="button"
            >
                <FontAwesomeIcon icon={faEye} />
            </button>
        </Link>
    )
}

export default ReadButton