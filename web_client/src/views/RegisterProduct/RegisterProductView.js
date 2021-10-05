import Axios from 'axios';
import { useEffect, useState } from 'react';
import '../../assets/Buttons.css';
import Buttons from '../../common/Buttons';
import successMessage from '../../utils/SuccessMessages/successMessage';
import validationProductRegister from '../../utils/Validations/validationProductRegister';
import ExtraDataProduct from './ExtraDataProduct';
import GeneralDataProduct from './GeneralDataProduct';
import './RegisterProductView.css';
import './styles/ProductForm.css';
import displayError from '../../utils/ErrorMessages/displayError';
import Breadcrumb from '../../common/Breadcrumb';
import { faIceCream } from '@fortawesome/free-solid-svg-icons';

const PORT = require('../../config');

export default function RegisterProductView() {
    const [data, setData] = useState({ name: null, description: '', price: null, id_sector: null, id_product_type: null, img: null, supplies: [], flavor: null, editing: false });
    const [nameProductChild, setNameProductChild] = useState('');
    const [priceProductChild, setPriceProductChild] = useState('');
    const [sectorProductChild, setSectorProductChild] = useState('');
    const [typeProductChild, setTypeProductChild] = useState(-1);
    const [imgProductChild, setImgProductChild] = useState('');
    const [supplyProductChild, setSupplyProductChild] = useState('');
    const [ready, setReady] = useState(false);

    const load = (childData) => {
        setData(childData)
        setNameProductChild(childData.name);
        setPriceProductChild(childData.price);
        setSectorProductChild(childData.id_sector);
        setTypeProductChild(childData.id_product_type);
        setImgProductChild(childData.img);
        setSupplyProductChild(childData.supplies);
    }

    const registerProduct = () => {
        let urlApi = '';
        const formData = new FormData();

        urlApi = '/api/products';

        const jsonArrSupplies = JSON.stringify(data.supplies);

        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('image', data.img)
        formData.append('price', data.price);
        formData.append('id_sector', data.id_sector);
        formData.append('id_product_type', data.id_product_type);
        formData.append('supplies', jsonArrSupplies);
        formData.append('flavor', data.flavor);

        Axios.post(PORT() + urlApi, formData)
            .then((formData) => {
                if (formData.data.Ok) successMessage('Atención', 'Producto registrado exitosamente', 'success');
                else displayError('Ha ocurrido un error al registrar el producto.');
            })
            .catch(error => console.log(error))
    };

    useEffect(() => {
        if (data.name !== '' && data.price && data.price > 0 && data.name && data.id_sector > 0 && data.id_product_type) setReady(true);
        else setReady(false);
    }, [
        nameProductChild,
        priceProductChild,
        sectorProductChild,
        typeProductChild,
        imgProductChild,
        supplyProductChild,
        data.id_sector,
        data.id_product_type,
        data.name,
        data.price
    ]);

    const cancelTypeProduct = () => window.location.replace('/app/products');

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Registrar producto"}</div>
            <Breadcrumb parentName="Productos" icon={faIceCream} parentLink="products" currentName="Registrar producto" />
            <div className="viewTitle">
                <h1>Registrar Producto</h1>
            </div>
            <div className="viewBody">
                <GeneralDataProduct load={load} data={data} />
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
