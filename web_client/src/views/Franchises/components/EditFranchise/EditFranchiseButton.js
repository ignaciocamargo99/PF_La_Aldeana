import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../../assets/Buttons.css';
import BeShowed from '../../../../common/BeShowed';

export default function EditFranchiseButton(props) {
    let permissionsAccess = props.permissionsAccess;
    const handleEdit = () => {
        let aux = props.franchise;
        aux.title = aux.name;
        props.edit(aux);
    }

    return (
        <>
            <BeShowed show={permissionsAccess === 3} >
                <button id='editFranchiseButton' type="button" onClick={handleEdit} className="btn btn-info btnEdit"><FontAwesomeIcon icon={faEdit} /></button>
            </BeShowed>
            <BeShowed show={permissionsAccess !== 3} >
                <button id='editFranchiseButton' disabled type="button" className="disabledSendBtn"><FontAwesomeIcon icon={faEdit} /></button>
            </BeShowed>
        </>
    );
}