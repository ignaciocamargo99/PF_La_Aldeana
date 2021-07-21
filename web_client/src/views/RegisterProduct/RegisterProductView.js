import Axios from 'axios';
import { useEffect, useState } from 'react';
import '../../assets/Buttons.css';
import Buttons from '../../common/Buttons';
import success from '../../utils/SuccessMessages/successTypeProduct';
import ExtraDataProduct from './ExtraDataProduct';
import GeneralDataProduct from './GeneralDataProduct';
import './RegisterProductView.css';
import './styles/ProductForm.css';

const PORT = require('../../config');

const RegisterProductView = () => {

    const [data, setData] = useState({ name: '', description: '', price: -1, type: {}, supplies: [{}], img: null });
    const [ready, setReady] = useState(false);

    const load = (childData) => {
        setData(childData);
    }

    const postProduct = () => {
        Axios.post(PORT() + '/api/product/new', {
            name: 'producto de prueba 2',
            description: 'h<bf<gb<<fhla',
            image: null,
            price: 200,
            id_sector: 2,
            id_product_type: 1
        })
            .then(success())
            .catch(err => console.error(err))
    };

    useEffect(() => {
        console.log(data);
        if (data.name !== '' && data.price >= 0 && data.type !== {}) setReady(true);
        else setReady(false);
    }, [data]);

    return (
        <>
            <div className="viewTitle">
                <h1>Registrar Producto</h1>
            </div>
            <div className="viewBody">
                <a>{data.name}hola</a>
                <GeneralDataProduct load={load} data={data} />
                <ExtraDataProduct load={load} data={data} />
                <Buttons label='Registrar' actionOk={postProduct} ready={ready} data={data} />
                <button onClick={postProduct}>Registrar que anda sin validaciones a modo de prueba xd</button>
            </div>
        </>
    );
}

export default RegisterProductView;