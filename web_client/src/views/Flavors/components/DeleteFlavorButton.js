import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BeShowed from "common/BeShowed";
import { defaultQuestionSweetAlert2 } from "utils/questionMessages/sweetAlert2Questions";

export default function DeleteFlavorButton({ flavorData, deleteFlavor, permissionsAccess }) {

    const handleDeleteFlavorBtnClicked = async () => {
        const warningTitle = `¿Seguro que desea eliminar ${flavorData.name}?`;
        const warningText = 'El sabor ya no será visible para el personal de la empresa.';
        const deletionConfirmed = (await defaultQuestionSweetAlert2(warningTitle, warningText)).isConfirmed;

        if (deletionConfirmed) {
            deleteFlavor(flavorData.idFlavor);
        };
    };

    return (
        <>
            <BeShowed show={permissionsAccess === 3}>
                <button
                    className="sendDelete"
                    onClick={handleDeleteFlavorBtnClicked}
                    type="button"
                >
                    <FontAwesomeIcon icon={faMinus} />
                </button>
            </BeShowed>
            <BeShowed show={permissionsAccess !== 3}>
                <button
                    className="disabledSendBtn"
                    disabled
                    type="button"
                >
                    <FontAwesomeIcon icon={faMinus} />
                </button>
            </BeShowed>
        </>

    );
};
