import BeShowed from '../../common/BeShowed';
import FlavorsAmount from './components/FlavorsAmount';
import ImageProduct from './components/ImageProduct';
import SuppliesPairTables from './components/SuppliesPairTables/SuppliesPairTables';
import TypeProduct from './components/TypeProduct';

const ExtraDataProduct = ({ load, data }) => {

    return (
        <>
            <TypeProduct load={load} data={data} />
            <BeShowed show={parseInt(data.id_product_type, 10) === 3}>
                <FlavorsAmount load={load} data={data} />
            </BeShowed>
            <hr />
            <h2>Insumos</h2>
            <SuppliesPairTables load={load} data={data} />
            <hr />
            <h2>Imagen</h2>
            <ImageProduct load={load} data={data} />
        </>
    );
};

export default ExtraDataProduct;