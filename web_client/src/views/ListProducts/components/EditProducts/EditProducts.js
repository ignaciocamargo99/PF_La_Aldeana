import { faIceCream } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import '../../../../assets/Buttons.css';
import Breadcrumb from '../../../../common/Breadcrumb';
import Buttons from '../../../../common/Buttons';
import successMessage from '../../../../utils/SuccessMessages/successMessage';
import validationProductRegister from '../../../../utils/Validations/validationProductRegister';
import ExtraDataProduct from '../../../RegisterProduct/ExtraDataProduct';
import GeneralDataProduct from '../../../RegisterProduct/GeneralDataProduct';
import '../../styles/ProductForm.css';
import './EditProductView.css';
import displayError from "../../../../utils/ErrorMessages/displayError";
import loadingMessage from 'utils/LoadingMessages/loadingMessage';
import { defaultQuestionSweetAlert2 } from 'utils/questionMessages/sweetAlert2Questions';

const PORT = require('../../../../config');

const EditProducts = (props) => {
    const [data, setData] = useState(props.productToEdit);
    const [nameProductChild, setNameProductChild] = useState(props.productToEdit.name);
    const [priceProductChild, setPriceProductChild] = useState(props.productToEdit.price);
    const [sectorProductChild, setSectorProductChild] = useState(props.productToEdit.id_sector);
    const [typeProductChild, setTypeProductChild] = useState(props.productToEdit.id_product_type);
    const [imgProductChild, setImgProductChild] = useState(props.productToEdit.image);
    const [ready, setReady] = useState(true);

    const load = (childData) => {
        setNameProductChild(childData.name);
        setPriceProductChild(childData.price);
        setSectorProductChild(childData.id_sector);
        setTypeProductChild(childData.id_product_type);
        setImgProductChild(childData.img);
        setData(childData);
    }

    const registerProduct = async () => {
        const editionConfirmed = (await defaultQuestionSweetAlert2('¿Confirmar cambios?')).isConfirmed;
        if (editionConfirmed) {
            let urlApi = '';
            const formData = new FormData();
            const suppliesValues = data.supplies.filter(() => true);

            urlApi = `/api/products/${data.id_product}`;

            const jsonArrSupplies = JSON.stringify(suppliesValues);
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('image', data.img)
            formData.append('price', data.price);
            formData.append('id_sector', data.id_sector);
            formData.append('id_product_type', data.id_product_type);
            formData.append('supplies', jsonArrSupplies);
            formData.append('flagImageUpdate', data.flagImageUpdate);
            formData.append('flavor', data.flavor);

            loadingMessage('Guardando cambios...');
            Axios.put(PORT() + urlApi, formData)
                .then((data) => {
                    if (data.data.Ok) successMessage('Atención', 'Producto editado exitosamente', 'success');
                })
                .catch(error => {
                    console.log(error)
                    displayError('Error al registrar edición del producto por parte del servidor');
                });
        }
    };

    useEffect(() => {
        if (data.name !== '' && data.price > 0 && data.id_sector > 0 && data.id_product_type >= 0 && data.id_product_type
            && data.name !== 'error' && data.price !== 'error' && data.description !== 'error') setReady(true);
        else setReady(false);
    }, [data]);

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Editar producto"}</div>
            <Breadcrumb parentName="Productos" icon={faIceCream} parentLink="products" currentName="Editar producto" />
            <div className="viewTitle">
                <h1>Editar {props.productToEdit.title}</h1>
            </div>
            <br />
            <div className="viewBody">
                <GeneralDataProduct load={load} data={data} />
                <ExtraDataProduct load={load} data={data} />
                <Buttons
                    label='Aceptar' actionOK={registerProduct}
                    actionNotOK={validationProductRegister}
                    actionCancel={props.onClickCancelEdit}
                    ready={ready}
                    data={data} />
            </div>
        </>
    );
};

export default EditProducts;