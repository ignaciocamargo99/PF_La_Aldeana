import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../../assets/Buttons.css';
import formattedDate from "../../../../utils/formattedDate";

export default function ReadAdvancesButton (props) {

    const handleRead = () => {
        let aux = props.advances;
        aux.title = aux.name;
        aux.dniEmployee = aux.nroDNI;
        aux.date = formattedDate(new Date(aux.date));
        aux.installments = [{month: formattedDate(new Date(aux.date)), amount: 0, label: "", pay: 0}];
        aux.reading = true;
        aux.months = 0;
        aux.firstMonth = formattedDate(new Date(aux.date));
        aux.editing = false;
        props.read(aux);
    }
    
    return (
        <button id='readAdvancesButton' type="button" className="sendEdit" onClick={handleRead}><FontAwesomeIcon icon={faEye} /></button>
    );
}