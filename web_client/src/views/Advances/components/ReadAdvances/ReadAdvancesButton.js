import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../../assets/Buttons.css';
import dateToString from "../../../../utils/ConverterDate/dateToString";

export default function ReadAdvancesButton (props) {

    const handleRead = () => {
        let aux = props.advances;
        aux.title = aux.name;
        aux.dniEmployee = aux.nroDNI;
        aux.date = dateToString(aux.date, true);
        aux.installments = [{month: dateToString(aux.date, true), amount: 0, label: "", pay: 0}];
        aux.reading = true;
        aux.months = 0;
        console.log(dateToString(aux.date, true))
        aux.firstMonth = dateToString(aux.date, true);
        aux.editing = false;
        props.read(aux);
    }
    
    return (
        <button id='readAdvancesButton' type="button" className="sendEdit" onClick={handleRead}><FontAwesomeIcon icon={faEye} /></button>
    );
}