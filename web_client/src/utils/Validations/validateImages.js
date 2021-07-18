import errorImageFormat from "../ErrorMessages/errorImageFormat";
import warningImageMeasurements from "../WarningMessages/warningImageMeasurements";
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
        return obj.value = ""
    }
    else {
        let img = new Image();
        img.onload = function () {
            if (this.width.toFixed(0) < 1920 && this.height.toFixed(0) < 1080) {
                warningImageMeasurements();
                return obj.value = "";
            }
            else if (uploadFile.size > 7000000) {
                warningSizeImages();
                return obj.value = "";
            }
        };
        img.src = URL.createObjectURL(uploadFile);
    }
}

export default validateImage;