import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../../assets/Buttons.css';
import formattedDate from "../../../../utils/formattedDate";

export default function EditAdvancesButton (props) {

    const handleEdit = () => {
        let aux = props.advances;
        aux.title = aux.name;
        aux.dniEmployee = props.advances.nroDNI;
        aux.date = formattedDate(new Date(props.advances.date));
        aux.amount = props.advances.amount;
        aux.installments = [{month: formattedDate(new Date(props.advances.date)), amount: 0, label: "", pay: 0}];
        aux.pay = props.advances.pay;
        aux.firstMonth = formattedDate(new Date(props.advances.date));
        aux.editing = true;
        props.edit(aux);
    }
    
    return (
        <button id='editAdvancesButton' type="button" className="sendEdit" onClick={handleEdit}><FontAwesomeIcon icon={faEdit} /></button>
    );
}