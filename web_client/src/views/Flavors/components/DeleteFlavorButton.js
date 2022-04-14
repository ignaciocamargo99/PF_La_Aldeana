import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import confirmDelete from "../../../utils/confirmDelete";

export default function DeleteFlavorButton({ flavorData, deleteFlavor }) {

    const handleDeleteFlavorBtnClicked = () => {
        confirmDelete(() => deleteFlavor(flavorData.idFlavor));
    };

    return (
        <button
            className="sendDelete"
            onClick={handleDeleteFlavorBtnClicked}
            type="button"
        >
            <FontAwesomeIcon icon={faMinus} />
        </button>
    );
};
