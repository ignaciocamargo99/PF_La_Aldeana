import { useState } from 'react';
import '../../assets/Buttons.css';
import Buttons from '../../common/Buttons';
import ExtraDataProduct from './ExtraDataProduct';
import GeneralDataProduct from './GeneralDataProduct';
import './RegisterProductView.css';
import './styles/ProductForm.css';

const RegisterProductView = () => {

    const [data, setData] = useState({ name: '', description: '', price: -1, type: {}, supplies: [{}], img: null });
    const [ready] = useState(false);

    return (
        <>
            <div className="viewTitle">
                <h1>Registrar Producto</h1>
            </div>
            <div className="viewBody">
                <GeneralDataProduct load={setData} data={data} />
                <ExtraDataProduct load={setData} data={data} />
                <Buttons label='Registrar' ready={ready} data={data} />
            </div>
        </>
    );
}

export default RegisterProductView;