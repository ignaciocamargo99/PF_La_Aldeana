import Axios from 'axios';
import { useEffect, useState } from 'react';
import '../../assets/Buttons.css';
import Buttons from '../../common/Buttons';
import success from '../../utils/SuccessMessages/successTypeProduct';
import validationProductRegister from '../../utils/Validations/validationProductRegister';
import ExtraDataProduct from './ExtraDataProduct';
import GeneralDataProduct from './GeneralDataProduct';
import './RegisterProductView.css';
import './styles/ProductForm.css';

const PORT = require('../../config');

export default function RegisterProductView() {
    const [data, setData] = useState({ name: '', description: '', price: -1, sector: '', typeProduct: -1, img: null, supplies: [] });
    const [nameProductChild, setNameProductChild] = useState('');
    const [descriptionProductChild, setDescriptionProductChild] = useState('');
    const [priceProductChild, setPriceProductChild] = useState('');
    const [sectorProductChild, setSectorProductChild] = useState('');
    const [typeProductChild, setTypeProductChild] = useState(-1);
    const [imgProductChild, setImgProductChild] = useState('');
    const [supplyProductChild, setSupplyProductChild] = useState('');
    const [ready, setReady] = useState(false);

    const load = (childData) => {
        setData(childData)
        setNameProductChild(childData.name);
        setDescriptionProductChild(childData.description);
        setPriceProductChild(childData.price);
        setSectorProductChild(childData.sector);
        setTypeProductChild(childData.typeProduct);
        setImgProductChild(childData.img);
        setSupplyProductChild(childData.supplies)
    }

    const registerProduct = () => {
        let urlApi = '';
        const formData = new FormData();
        const suppliesValues = data.supplies.filter(() => true);

        if (suppliesValues.length > 0) urlApi = '/api/productSupply/new';
        else urlApi = '/api/product/new'

        const jsonArrSupplies = JSON.stringify(suppliesValues);
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('image', data.img)
        formData.append('price', data.price);
        formData.append('id_sector', data.sector);
        formData.append('id_product_type', data.typeProduct);
        formData.append('supplies', jsonArrSupplies);

        Axios.post(PORT() + urlApi, formData)
            .then(success())
            .catch(error => console.log(error))
    };

    useEffect(() => {
        if (data.name !== '' && data.price > 0 && data.sector > 0 && data.typeProduct >= 0
            && data.name !== 'error' && data.price !== 'error' && data.description !== 'error') setReady(true);
        else setReady(false);
    }, [nameProductChild, priceProductChild, sectorProductChild, typeProductChild, imgProductChild, supplyProductChild]);

    return (
        <>
            <div className="viewTitle">
                <h1>Registrar Producto</h1>
            </div>
            <div className="viewBody">
                <GeneralDataProduct load={load} data={data} />
                <hr />
                <ExtraDataProduct load={load} data={data} />
                <Buttons
                    label='Registrar' actionOK={registerProduct}
                    actionNotOK={validationProductRegister}
                    ready={ready}
                    data={data} />
            </div>
        </>
    );
}
