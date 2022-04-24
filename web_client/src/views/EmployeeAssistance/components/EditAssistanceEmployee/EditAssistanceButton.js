import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../../assets/Buttons.css';
import BeShowed from '../../../../common/BeShowed';

export default function EditAssistanceButton(props) {
    let permissionsAccess = props.permissionsAccess
    const handleEdit = () => {
        let aux = props.assistance;
        aux.title = aux.employee;
        props.edit(aux);
    }

    return (
        <>
            <BeShowed show={permissionsAccess === 3}>
                <button id='editAssistanceButton' type="button" className="sendEdit" onClick={handleEdit}><FontAwesomeIcon icon={faEdit} /></button>
            </BeShowed>
            <BeShowed show={permissionsAccess !== 3}>
                <button id='editAssistanceButton' disabled type="button" className="disabledSendBtn"><FontAwesomeIcon icon={faEdit} /></button>
            </BeShowed>
        </>
    );
}