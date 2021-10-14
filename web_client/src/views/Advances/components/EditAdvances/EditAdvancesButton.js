import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../../assets/Buttons.css';
import moment from 'moment';
import formattedDate from "../../../../utils/formattedDate";

export default function EditAdvancesButton (props) {

    const handleEdit = () => {
        let aux = props.advances;
        aux.title = aux.name;
        aux.dniEmployee = props.advances.nroDNI;
        aux.date = moment(props.advances.date).format('YYYY-MM-DD');
        aux.amount = props.advances.amount;
        aux.installments = [{month: formattedDate(new Date()),amount: 0, label: "", pay: 0}];
        aux.pay = props.advances.pay;
        aux.editing = true;
        props.edit(aux);
    }
    
    return (
        <button id='editAdvancesButton' type="button" className="sendEdit" onClick={handleEdit}><FontAwesomeIcon icon={faEdit} /></button>
    );
}