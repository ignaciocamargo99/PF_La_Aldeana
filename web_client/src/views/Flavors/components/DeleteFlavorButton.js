import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BeShowed from "common/BeShowed";
import confirmDelete from 'utils/confirmDelete';

export default function DeleteFlavorButton({ flavorData, deleteFlavor, permissionsAccess }) {

    const handleDeleteFlavorBtnClicked = () => {
        confirmDelete(() => deleteFlavor(flavorData.idFlavor));
    };

    return (
        <>
            <BeShowed show={permissionsAccess === 3}>
                <button
                    className="sendDelete"
                    onClick={handleDeleteFlavorBtnClicked}
                    type="button"
                >
                    <FontAwesomeIcon icon={faMinus} />
                </button>
            </BeShowed>
            <BeShowed show={permissionsAccess !== 3}>
                <button
                    className="disabledSendBtn"
                    disabled
                    type="button"
                >
                    <FontAwesomeIcon icon={faMinus} />
                </button>
            </BeShowed>
        </>

    );
};
