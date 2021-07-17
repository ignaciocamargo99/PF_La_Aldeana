import TypeProduct from './components/TypeProduct';
import SuppliesProduct from './components/SuppliesProduct';
import InputImage from '../../common/InputImage';

const ExtraDataProd = (props) => {
    return (
        <>
            <TypeProduct load={props.load} data={props.data} />
            <SuppliesProduct load={props.load} data={props.data} />
            <div className="formRow">
                <InputImage load={props.load} data={props.data} label="Imagen" htmlfordata="productImage" />
            </div>
        </>
    );
}

export default ExtraDataProd;