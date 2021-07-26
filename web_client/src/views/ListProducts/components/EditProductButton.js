import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EditProductButton (props) {

    const handleEdit = () => {
        console.log('edit')
    }
    
    return (
        <button id='editProductButton' type="button" className="btn btn-success btn-sm px-3" onClick={handleEdit}><FontAwesomeIcon icon={faEdit} /></button>
    );
}