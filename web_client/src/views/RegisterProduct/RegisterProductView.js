import { useEffect, useState } from 'react';
import Buttons from '../../common/Buttons';
import GeneralDataProduct from './GeneralDataProduct';
import ExtraDataProd from './ExtraDataProd';
import './RegisterProductView.css';

const RegisterProductView = (props) => {

    const [data, setData] = useState({ name: '', description: '', price: -1, type: {}, supplies: [{}], img: null });
    const [ready] = useState(false);

    useEffect(
        () => {
            //const isValidate = validationProductRegister(data.name, data.price, data.type);
            //if (isValidate === true) setReady(true);
            console.log(data)

        }
        , [data]);

    const register = () => {
        console.log('hola');
    }

    return (
        <>
            <div className="viewTitle">
                <h1>Registrar Producto</h1>
            </div>
            <div className="viewBody">
                <form>
                    <GeneralDataProduct load={setData} data={data} />
                    <ExtraDataProd load={setData} data={data} />
                    <Buttons label='Registrar' ready={ready} data={data} register={register} />
                </form>
            </div>
        </>
    );
}

export default RegisterProductView;