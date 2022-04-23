import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ReadFlavorButton({ flavorId, permissionsAccess }) {

    const handleReadFlavorBtnClicked = () => {
        window.location.replace(`/app/flavors/view/${flavorId}`);
    };

    return (
        <button
            className="sendEdit"
            id='readFlavorButton'
            onClick={handleReadFlavorBtnClicked}
            type="button"
        >
            <FontAwesomeIcon icon={faEye} />
        </button>
    );
};
