import Axios from 'axios';
import { useEffect, useState } from 'react';
import '../../assets/Buttons.css';
import Buttons from '../../common/Buttons';
import success from '../../utils/SuccessMessages/successTypeProduct';
import ExtraDataProduct from './ExtraDataProduct';
import GeneralDataProduct from './GeneralDataProduct';
import './RegisterProductView.css';
import './styles/ProductForm.css';
import validationProductRegister from '../../utils/Validations/validationProductRegister';

const PORT = require('../../config');

const RegisterProductView = () => {

    const [data, setData] = useState({ name: '', description: '', price: -1, sector: '', typeProduct: -1, img: null });
    const [nameProductChild, setNameProductChild] = useState('');
    const [descriptionProductChild, setDescriptionProductChild] = useState('');
    const [priceProductChild, setPriceProductChild] = useState('');
    const [sectorProductChild, setSectorProductChild] = useState('');
    const [typeProductChild, setTypeProductChild] = useState(-1);
    const [ready, setReady] = useState(false);

    const load = (childData) => {
        setData(childData)
        setNameProductChild(childData.name);
        setDescriptionProductChild(childData.description);
        setPriceProductChild(childData.price);
        setSectorProductChild(childData.sector);
        setTypeProductChild(childData.typeProduct);
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
        if (data.name !== '' && data.price > 0 && data.sector > 0 && data.typeProduct >= 0
        && data.name !== 'error' && data.price !== 'error' && data.description !== 'error') setReady(true);
        else setReady(false);
    }, [nameProductChild, priceProductChild, sectorProductChild, typeProductChild, descriptionProductChild]);

    return (
        <>
            <div className="viewTitle">
                <h1>Registrar Producto</h1>
            </div>
            <div className="viewBody">
                <GeneralDataProduct load={load} data={data} />
                <ExtraDataProduct load={load} data={data} />
                <Buttons label='Registrar' actionOK={postProduct} 
                    actionNotOK={validationProductRegister}
                    ready={ready} data={data} />
            </div>
        </>
    );
}

export default RegisterProductView;