import Line from '../../common/Line';
import TypeProduct from './TypeProduct';
import SuppliesProduct from './SuppliesProduct';
import ImgProducto from './ImgProducto';

const ExtraDataProd = (props) => {
    return (
        <>
            <TypeProduct load={props.load} data={props.data}/>
            <SuppliesProduct load={props.load} data={props.data}/>
            <ImgProducto load={props.load} data={props.data}/>
        </>
    );
}

export default ExtraDataProd;