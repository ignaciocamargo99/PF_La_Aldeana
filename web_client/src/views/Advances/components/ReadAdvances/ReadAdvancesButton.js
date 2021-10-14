import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../../assets/Buttons.css';
import moment from 'moment';
import formattedDate from "../../../../utils/formattedDate";

export default function ReadAdvancesButton (props) {

    const handleRead = () => {
        let aux = props.advances;
        aux.title = aux.name;
        aux.dniEmployee = aux.nroDNI;
        aux.date = moment(aux.date).format('YYYY-MM-DD');
        aux.installments = [{month: formattedDate(new Date()),amount: 0, label: "", pay: 0}];
        aux.reading = true;
        aux.months = 0;
        aux.editing = false;
        props.read(aux);
    }
    
    return (
        <button id='readAdvancesButton' type="button" className="sendEdit" onClick={handleRead}><FontAwesomeIcon icon={faEye} /></button>
    );
}