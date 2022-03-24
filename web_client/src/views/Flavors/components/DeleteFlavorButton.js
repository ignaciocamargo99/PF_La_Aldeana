import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DeleteFlavorButton() {

    const handleDeleteFlavorBtnClicked = (e) => {
        alert("eliminando sabor")
    };

    return (
        <button
            className="sendDelete"
            id='deleteFlavorButton'
            onClick={handleDeleteFlavorBtnClicked}
            type="button"
        >
            <FontAwesomeIcon icon={faMinus} />
        </button>
    );
}
