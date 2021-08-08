import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../assets/Buttons.css';

export default function EditProductButton (props) {

    const handleEdit = () => {
        let aux = props.product;
        aux.title = aux.name;
        props.edit(aux);
    }
    
    return (
        <button id='editProductButton' type="button" className="sendEdit" onClick={handleEdit}><FontAwesomeIcon icon={faEdit} /></button>
    );
}