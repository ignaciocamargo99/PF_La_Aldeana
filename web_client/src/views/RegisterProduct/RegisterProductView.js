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
    const [imgProductChild, setImgProductChild] = useState('');
    const [ready, setReady] = useState(false);

    const load = (childData) => {
        setData(childData)
        setNameProductChild(childData.name);
        setDescriptionProductChild(childData.description);
        setPriceProductChild(childData.price);
        setSectorProductChild(childData.sector);
        setTypeProductChild(childData.typeProduct);
        setImgProductChild(childData.img);
    }

    const registerProduct = () => {
        console.log(data.img)
        if (!imgProductChild) {
            alert("Ingrese imagen")
            return;
        }
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('image', data.img)
        formData.append('price', data.price);
        formData.append('id_sector', data.sector);
        formData.append('id_product_type', data.typeProduct);

        Axios.post(PORT() + '/api/product/new', formData)
            .then(success())
            .catch(error => console.log(error))
    };

    useEffect(() => {
        if (data.name !== '' && data.price > 0 && data.sector > 0 && data.typeProduct >= 0
            && data.name !== 'error' && data.price !== 'error' && data.description !== 'error') setReady(true);
        else setReady(false);
    }, [nameProductChild, priceProductChild, sectorProductChild, typeProductChild, imgProductChild]);

    return (
        <>
            <div className="viewTitle">
                <h1>Registrar Producto</h1>
            </div>
            <div className="viewBody">
                <GeneralDataProduct load={load} data={data} />
                <ExtraDataProduct load={load} data={data} />
                <Buttons label='Registrar' actionOK={registerProduct}
                    actionNotOK={validationProductRegister}
                    ready={ready} data={data} />
            </div>
        </>
    );
}

export default RegisterProductView;