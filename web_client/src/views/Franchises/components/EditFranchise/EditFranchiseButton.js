import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../../assets/Buttons.css';

export default function EditFranchiseButton(props) {

    const handleEdit = () => {
        let aux = props.franchise;
        aux.title = aux.name;
        props.edit(aux);
    }

    return (
        <button id='editFranchiseButton' type="button" onClick={handleEdit} className="sendEdit"><FontAwesomeIcon icon={faEdit} /></button>
    );
}