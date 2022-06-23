import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ReadProductTypeButton(props) {

    const handleRead = () => {
        let aux = props.data;
        aux.title = aux.name;
        props.read(aux);
    }

    return (
        <button
            className="btn btn-warning btnRead"
            id='readFlavorButton'
            onClick={handleRead}
            type="button"
        >
            <FontAwesomeIcon icon={faEye} />
        </button>
    );
};
