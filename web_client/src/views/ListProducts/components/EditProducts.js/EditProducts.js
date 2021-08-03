import Axios from 'axios';
import { useEffect, useState } from 'react';
import '../../../../assets/Buttons.css';
import Buttons from '../../../../common/Buttons';
import success from '../../../../utils/SuccessMessages/successTypeProduct';
import ExtraDataProduct from './ExtraDataProduct';
import GeneralDataProduct from './GeneralDataProduct';
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
    const [ready, setReady] = useState(true);

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

        if (suppliesValues.length > 0) urlApi = '/api/productSupply/update';
        else urlApi = '/api/products/update'

        formData.append('id_product', data.id_product);
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('image', data.image)
        formData.append('price', data.price);
        formData.append('id_sector', data.id_sector);
        formData.append('id_product_type', data.id_product_type);

        const jsonArrSupplies = JSON.stringify(suppliesValues);

        Axios.put(PORT() + urlApi, {
            id_product: data.id_product,
            name: data.name,
            description: data.description,
            image: data.image,
            price: data.price,
            id_sector: data.id_sector,
            id_product_type: data.id_product_type,
            supplies: jsonArrSupplies
        })
            .then(success())
            .catch(error => console.log(error))
    };


    useEffect(() => {
        if (data.name !== '' && data.price > 0 && data.id_sector > 0 && data.id_product_type >= 0
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