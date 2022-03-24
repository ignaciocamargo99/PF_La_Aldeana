import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ReadFlavorButton() {

    const handleReadFlavorBtnClicked = () => {
        alert("leyendo sabor")
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
