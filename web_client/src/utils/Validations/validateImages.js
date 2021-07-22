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
        obj.value = ""
    }
    else {
        let img = new Image();
        let flag = true;
        img.onload = function () {
            if (this.width.toFixed(0) > 200 && this.height.toFixed(0) > 200) {
                warningImageMeasurements();
                flag = false;
            }
            else if (uploadFile.size > 7000000) {
                warningSizeImages();
                flag = false;
            }
            return flag;
        };
        console.log(flag);
        if(flag) return img.src = URL.createObjectURL(uploadFile);
        else return null;
    }
}

export default validateImage;