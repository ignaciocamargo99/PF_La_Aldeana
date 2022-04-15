import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EditFlavorButton({ flavorId }) {

    const handleEditFlavorBtnClicked = () => {
        window.location.replace(`/app/flavors/${flavorId}`);
    };

    return (
        <button
            className="sendEdit"
            id='editFlavorButton'
            onClick={handleEditFlavorBtnClicked}
            type="button"
        >
            <FontAwesomeIcon icon={faEdit} />
        </button>
    );
};
