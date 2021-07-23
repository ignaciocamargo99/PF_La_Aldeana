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
        function validateImage(heightImage, widthImage, flag) {
            if (widthImage.toFixed(0) > 200 && heightImage.toFixed(0) > 200){
                warningImageMeasurements();
                return obj.value = "";
            } 
            else if (uploadFile.size > 7000000){
                warningSizeImages();
                return obj.value = "";
            } 
        };

        function addImageProcess() {
            let img = new Image();
            img.onload = () => validateImage(img.height, img.width)
            img.src = URL.createObjectURL(uploadFile);
            return img.onload();
        }

        async function process() {
            const f = await addImageProcess();
            return f
        }
        return process()
    }
}

export default validateImage;