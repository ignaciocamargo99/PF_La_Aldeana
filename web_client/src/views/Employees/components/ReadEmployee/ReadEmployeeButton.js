import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../../../../assets/Buttons.css';

export default function ReadEmployeeButton({ employeeData, handleReadEmpoyeeClicked }) {

    const handleRead = () => {
        handleReadEmpoyeeClicked(employeeData);
    }

    return (
        <button id='readEmployeeButton' type="button" className="sendEdit" onClick={handleRead}>
            <FontAwesomeIcon icon={faEye} />
        </button>
    );
}