import InputImage from "../../common/InputImage";

const ImgProducto = (props) => {
    return (
        <div className="formRow">
            <InputImage label='Imagen' htmlForData="productImage"/>
        </div>
    );
}

export default ImgProducto;