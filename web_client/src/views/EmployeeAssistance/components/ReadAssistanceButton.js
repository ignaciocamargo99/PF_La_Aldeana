import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../assets/Buttons.css';

export default function ReadEmployeeButton (props) {

    const handleRead = () => {
        let aux = props.assistance;
        aux.title = aux.employee;
        props.read(aux);
    }
    
    return (
        <button id='readAssistanceButton' type="button" className="btn btn-warning btnRead" onClick={handleRead}><FontAwesomeIcon icon={faEye} /></button>
    );
}