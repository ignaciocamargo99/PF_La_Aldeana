import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../../assets/Buttons.css';

export default function EditAdvancesButton (props) {

    const handleEdit = () => {
        let aux = props.advances;
        aux.title = aux.name;
        props.edit(aux);
    }
    
    return (
        <button id='editAdvancesButton' type="button" className="sendEdit" onClick={handleEdit}><FontAwesomeIcon icon={faEdit} /></button>
    );
}