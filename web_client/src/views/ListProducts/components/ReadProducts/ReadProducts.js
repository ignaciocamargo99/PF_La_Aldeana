import { faIceCream } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import '../../../../assets/Buttons.css';
import Breadcrumb from 'common/Breadcrumb';
import ExtraDataProduct from '../../../RegisterProduct/ExtraDataProduct';
import GeneralDataProduct from '../../../RegisterProduct/GeneralDataProduct';
import '../../styles/ProductForm.css';

const ReadProducts = ({ productToRead, onClickCancelRead }) => {
    const [data, setData] = useState(productToRead);

    const load = (childData) => setData(childData);

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Consultar producto"}</div>
            <Breadcrumb parentName="Productos" icon={faIceCream} parentLink="products" currentName="Consultar producto" />
            <div className="viewTitle">
                <h1>Producto {productToRead.title}</h1>
            </div>
            <br />
            <div className="viewBody">
                <GeneralDataProduct load={load} data={productToRead} />
                <ExtraDataProduct load={load} data={productToRead} />
                <div className='buttons'>
                    <button className='btn btn-light sendOk' onClick={onClickCancelRead}>Volver</button>
                </div>
            </div>
        </>
    );
};

export default ReadProducts;