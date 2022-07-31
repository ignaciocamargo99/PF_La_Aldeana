
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GenerateButton = ({ readOnly, errorDate, onClickNewSalary }) => {

    const getButtonClass = () => {
        if (readOnly) {
            return 'disabledNewBtn'
        }
        return "btn btn-light " + (errorDate ? "disabledNewBtn" : "newBtn");
    }

    const getButtonStyle = () => {
        if (readOnly) {
            return {}
        }
        return errorDate ? { backgroundColor: 'grey' } : {};
    }

    const buttonClass = getButtonClass();
    const buttonStyle = getButtonStyle();
    const isDisabled = readOnly || errorDate;

    return (
        <div className="form-control-input">
            <button
                className={buttonClass}
                disabled={isDisabled}
                onClick={onClickNewSalary}
                style={buttonStyle}
                type="button"
            >
                <FontAwesomeIcon icon={faPlus} />
                &nbsp;Generar
            </button>
        </div>
    )
}

export default GenerateButton