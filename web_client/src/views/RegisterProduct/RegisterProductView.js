import { useDebugValue, useEffect, useState } from 'react';
import '../../assets/Buttons.css';
import Buttons from '../../common/Buttons';
import ExtraDataProduct from './ExtraDataProduct';
import GeneralDataProduct from './GeneralDataProduct';
import './RegisterProductView.css';
import './styles/ProductForm.css';

const RegisterProductView = () => {

    const [data, setData] = useState({ name: '', description: '', price: -1, type: {}, supplies: [{}], img: null });
    const [ready, setReady] = useState(false);

    const load = (childData) => {
        setData(childData);
    }

    useEffect(()=>{
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
                <Buttons label='Registrar' ready={ready} data={data} />
            </div>
        </>
    );
}

export default RegisterProductView;