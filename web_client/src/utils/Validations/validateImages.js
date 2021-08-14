import errorImageFormat from "../ErrorMessages/errorImageFormat";
import warningSizeImages from "../WarningMessages/warningSizeImages";
import warningSupportImages from "../WarningMessages/warningSupportImages";

const validateImage = (obj) => {
    let uploadFile = obj.files[0];

    if (!window.FileReader) {
        warningSupportImages();
        return;
    }

    if (!(/\.(jpg|jpeg|png)$/i).test(uploadFile.name)) {
        errorImageFormat();
        obj.value = ""
    }
    else {
        if (uploadFile.size > 7000000) {
            warningSizeImages();
            return obj.value = "";
        }
    };
}

export default validateImage;