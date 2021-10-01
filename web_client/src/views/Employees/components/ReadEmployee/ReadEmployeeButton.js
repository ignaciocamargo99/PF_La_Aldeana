import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../../assets/Buttons.css';

export default function ReadEmployeeButton (props) {

    const handleRead = () => {
        let aux = props.employee;
        aux.title = aux.name;
        props.read(aux);
    }
    
    return (
        <button id='readEmployeeButton' type="button" className="sendEdit" onClick={handleRead}><FontAwesomeIcon icon={faEye} /></button>
    );
}