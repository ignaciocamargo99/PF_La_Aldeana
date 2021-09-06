import Axios from 'axios';
import { useEffect, useState } from 'react';
import '../../../../assets/Buttons.css';
import Buttons from '../../../../common/Buttons';
import successMessage from '../../../../utils/SuccessMessages/successMessage';
import ExtraDataProduct from '../../../RegisterProduct/ExtraDataProduct';
import GeneralDataProduct from '../../../RegisterProduct/GeneralDataProduct';
import './EditProductView.css';
import '../../styles/ProductForm.css';
import validationProductRegister from '../../../../utils/Validations/validationProductRegister';

const PORT = require('../../../../config');

export default function EditProducts(props) {
    const [data, setData] = useState(props.product);
    const [nameProductChild, setNameProductChild] = useState(props.product.name);
    const [descriptionProductChild, setDescriptionProductChild] = useState(props.product.description);
    const [priceProductChild, setPriceProductChild] = useState(props.product.price);
    const [sectorProductChild, setSectorProductChild] = useState(props.product.id_sector);
    const [typeProductChild, setTypeProductChild] = useState(props.product.id_product_type);
    const [imgProductChild, setImgProductChild] = useState(props.product.image);
    const [supplyProductChild, setSupplyProductChild] = useState(props.product.supplies);
    const [flavorChild, setFlavorChild] = useState(props.product.flavor);
    const [flagImageUpdate, setFlagImageUpdate] = useState();
    const [ready, setReady] = useState(true);

    const load = (childData) => {
        setData(childData)
        setNameProductChild(childData.name);
        setDescriptionProductChild(childData.description);
        setPriceProductChild(childData.price);
        setSectorProductChild(childData.id_sector);
        setTypeProductChild(childData.id_product_type);
        setImgProductChild(childData.img);
        setSupplyProductChild(childData.supplies);
        setFlagImageUpdate(childData.flagImageUpdate);
        setFlavorChild(childData.flavor);
        console.log(data)
    }

    const registerProduct = () => {
        let urlApi = '';
        const formData = new FormData();
        const suppliesValues = data.supplies.filter(() => true);

        if (suppliesValues.length > 0) urlApi = '/api/productSupply/update';
        else urlApi = '/api/products/update';

        const jsonArrSupplies = JSON.stringify(suppliesValues);
        formData.append('id_product', data.id_product);
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('image', data.img)
        formData.append('price', data.price);
        formData.append('id_sector', data.id_sector);
        formData.append('id_product_type', data.id_product_type);
        formData.append('supplies', jsonArrSupplies);
        formData.append('flagImageUpdate', data.flagImageUpdate);
        formData.append('flavor', data.flavor);

        Axios.put(PORT() + urlApi, formData)
            .then(successMessage('Atención', 'El producto se ha editado correctamente', 'success'))
            .catch(error => console.log(error));
    };

    useEffect(() => {
        if (data.name !== '' && data.price > 0 && data.id_sector > 0 && data.id_product_type >= 0 && data.id_product_type
            && data.name !== 'error' && data.price !== 'error' && data.description !== 'error') setReady(true);
        else setReady(false);
    }, [nameProductChild, priceProductChild, sectorProductChild, typeProductChild, imgProductChild]);

    return (
        <>
            <h2 style={{ fontWeight: 'bold' }}>Editar {props.product.title}</h2>
            <br />
            <GeneralDataProduct load={load} data={data} />
            <ExtraDataProduct load={load} data={data} />
            <Buttons
                label='Registrar' actionOK={registerProduct}
                actionNotOK={validationProductRegister}
                actionCancel={props.end}
                ready={ready}
                data={data} />
        </>
    );
}