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

export default function EditProducts (props) {
    const [data, setData] = useState(props.product);
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
        console.log(childData.supplies)
    }

    const registerProduct = () => {
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
                <h1>Editar {props.product.title}</h1>
            </div>
            <div className="viewBody">
                <GeneralDataProduct load={load} data={data} />
                <hr />
                <ExtraDataProduct load={load} data={data} />
                <Buttons
                    label='Registrar' actionOK={registerProduct}
                    actionNotOK={validationProductRegister}
                    actionCancel={props.end}
                    ready={ready}
                    data={data} />
            </div>
        </>
    );
}