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
import displayError from "../../../../utils/ErrorMessages/displayError";

const PORT = require('../../../../config');

const ReadProducts = ({ productToRead, onClickCancelRead }) => {
    const [data, setData] = useState(productToRead);
    const [ready, setReady] = useState(true);

    const load = (childData) => {
        setData(childData);
    }

    const registerProduct = () => {
        console.log('registerProduct')
    }

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Consultar producto"}</div>
            <Breadcrumb parentName="Productos" icon={faIceCream} parentLink="products" currentName="Consultar producto" />
            <div className="viewTitle">
                <h1>Producto {productToRead.title}</h1>
            </div>
            <br />
            <div className="viewBody">
                <GeneralDataProduct load={load} data={productToRead} />
                <ExtraDataProduct load={load} data={productToRead} />
                <Buttons
                    label='Registrar' actionOK={registerProduct}
                    actionNotOK={validationProductRegister}
                    actionCancel={onClickCancelRead}
                    ready={ready}
                    data={data} />
            </div>
        </>
    );
};

export default ReadProducts;