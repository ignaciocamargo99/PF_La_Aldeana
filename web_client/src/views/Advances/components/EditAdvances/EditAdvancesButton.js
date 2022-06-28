import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../../assets/Buttons.css';
import dateToString from "../../../../utils/ConverterDate/dateToString";

export default function EditAdvancesButton(props) {

    const handleEdit = () => {
        let aux = props.advances;
        aux.title = aux.name;
        aux.dniEmployee = props.advances.nroDNI;
        aux.date = dateToString(props.advances.date, true);
        aux.amount = props.advances.amount;
        aux.installments = [{ month: dateToString(props.advances.date, true), amount: 0, label: "", pay: 0 }];
        aux.pay = props.advances.pay;
        aux.firstMonth = dateToString(props.advances.date, true);
        aux.editing = true;
        props.edit(aux);
    }

    return (
        <button id='editAdvancesButton' type="button" className="btn btn-ligth btn-info btnEdit" onClick={handleEdit}><FontAwesomeIcon icon={faEdit} /></button>
    );
}