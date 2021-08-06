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
    const [data, setData] = useState({ name: null, description: '', price: null, id_sector: 2, id_product_type: null, img: null, supplies: [] });
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
        setSectorProductChild(childData.id_sector);
        setTypeProductChild(childData.id_product_type);
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
        formData.append('id_sector', data.id_sector);
        formData.append('id_product_type', data.id_product_type);
        formData.append('supplies', jsonArrSupplies);

        Axios.post(PORT() + urlApi, formData)
            .then(success())
            .catch(error => console.log(error))
    };

    useEffect(() => {
        if (data.name !== '' && data.price && data.price > 0 && data.name && data.id_sector > 0 && data.id_product_type) setReady(true);
        else setReady(false);
    }, [nameProductChild, priceProductChild, sectorProductChild, typeProductChild, imgProductChild, supplyProductChild]);

    const cancelTypeProduct = () => window.location.replace('/app/products');

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
                    data={data}
                    actionCancel={cancelTypeProduct}
                />
            </div>
        </>
    );
}
