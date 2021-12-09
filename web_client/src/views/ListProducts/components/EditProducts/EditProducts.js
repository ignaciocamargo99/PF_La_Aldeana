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

const PORT = require('../../../../config');

const EditProducts = ({ productToEdit, onClickCancelEdit }) => {
    const [data, setData] = useState(productToEdit);
    const [ready, setReady] = useState(true);

    const load = (childData) => {
        setData(childData);
    }

    const registerProduct = () => {
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

        Axios.put(PORT() + urlApi, formData)
            .then((data) => {
                if (data.data.Ok) successMessage('Atención', 'El producto se ha editado correctamente', 'success');
            })
            .catch(error => {
                console.log(error)
                displayError('Error al registrar edición del producto por parte del servidor');
            });
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
                <h1>Editar {productToEdit.title}</h1>
            </div>
            <br />
            <div className="viewBody">
                <GeneralDataProduct load={load} data={productToEdit} />
                <ExtraDataProduct load={load} data={productToEdit} />
                <Buttons
                    label='Registrar' actionOK={registerProduct}
                    actionNotOK={validationProductRegister}
                    actionCancel={onClickCancelEdit}
                    ready={ready}
                    data={data} />
            </div>
        </>
    );
};

export default EditProducts;