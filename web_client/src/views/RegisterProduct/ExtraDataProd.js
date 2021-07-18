import ImageProduct from './components/ImageProduct';
import SuppliesProduct from './components/SuppliesProduct';
import TypeProduct from './components/TypeProduct';

const ExtraDataProd = (props) => {
    return (
        <>
            <TypeProduct load={props.load} data={props.data} />
            <SuppliesProduct load={props.load} data={props.data} />
            <ImageProduct load={props.load} data={props.data} />
            {/* <div className="formRow">
                <InputImage load={props.load} data={props.data} label="Imagen" htmlfordata="productImage" />
            </div> */}
        </>
    );
}

export default ExtraDataProd;