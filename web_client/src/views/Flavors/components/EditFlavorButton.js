import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BeShowed from "common/BeShowed";

export default function EditFlavorButton({ flavorId, permissionsAccess }) {

    const handleEditFlavorBtnClicked = () => {
        window.location.replace(`/app/flavors/${flavorId}`);
    };

    return (
        <>
            <BeShowed show={permissionsAccess === 3}>
                <button
                    className="sendEdit"
                    id='editFlavorButton'
                    onClick={handleEditFlavorBtnClicked}
                    type="button"
                >
                    <FontAwesomeIcon icon={faEdit} />
                </button>
            </BeShowed>
            <BeShowed show={permissionsAccess !== 3}>
                <button
                    className="disabledSendBtn"
                    id='editFlavorButton'
                    disabled
                    type="button"
                >
                    <FontAwesomeIcon icon={faEdit} />
                </button>
            </BeShowed>
        </>

    );
};
