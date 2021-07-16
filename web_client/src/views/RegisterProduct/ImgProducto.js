import InputImage from "../../common/InputImage";

const ImgProducto = (props) => {
    return (
        <div className="formRow">
            <InputImage label='Imagen' htmlfordata="productImage"/>
        </div>
    );
}

export default ImgProducto;