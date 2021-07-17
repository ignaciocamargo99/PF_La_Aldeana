const validateImage = (obj) => {
    var uploadFile = obj.files[0];

    if (!window.FileReader) {
        alert('El navegador no soporta la lectura de archivos');
        return;
    }

    if (!(/\.(jpeg|png|gif)$/i).test(uploadFile.name)) {
        alert('El archivo a adjuntar no es una imagen');
        return
    }
    else {
        var img = new Image();
        img.onload = function () {
            if (this.width.toFixed(0) != 1920 && this.height.toFixed(0) != 1080) {
                alert('Las medidas deben ser: 200 * 200');
            }
            else if (uploadFile.size > 70000)
            {
                alert('El peso de la imagen no puede exceder los 700kb')
            }
            else {
                alert('Imagen correcta :)')                
            }
        };
        img.src = URL.createObjectURL(uploadFile);
    }                 
}

export default validateImage;