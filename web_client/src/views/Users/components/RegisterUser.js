import Axios from 'axios';
import { useEffect, useState } from 'react';
import '../../../assets/Buttons.css';
import Buttons from '../../../common/Buttons';
import successMessage from '../../../utils/SuccessMessages/successMessage';
// import GeneralDataProduct from './GeneralDataProduct';
import displayError from '../../../utils/ErrorMessages/displayError';
import Breadcrumb from '../../../common/Breadcrumb';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import loadingMessage from '../../../utils/LoadingMessages/loadingMessage';
import DataUser from './DataUsers/DataUser';
import ListPermissions from './Permissions/components/ListPermissions';

const PORT = require('../../../config');

export default function RegisterUser() {
    const [data, setData] = useState({ nick_user: null, first_name: null, last_name: null, password: null, editing: false });
    const [ready, setReady] = useState(false);
    // For view permissions
    const [valueSelect, setValueSelect] = useState();
    let matrix = [];

    useEffect(() => {
        for (let x = 0; x <= 7; x++) {
            matrix[x] = [];
            for (let y = 0; y <= 3; y++) {
                matrix[x][y] = 0;
            }
        };
        setValueSelect(matrix);
        console.log(matrix)
    }, []);
    // const [nameProductChild, setNameProductChild] = useState('');
    // const [priceProductChild, setPriceProductChild] = useState('');
    // const [sectorProductChild, setSectorProductChild] = useState('');
    // const [typeProductChild, setTypeProductChild] = useState(-1);
    // const [imgProductChild, setImgProductChild] = useState('');
    // const [supplyProductChild, setSupplyProductChild] = useState('');

    const load = (childData) => {
        setData(childData);
        // setNameProductChild(childData.name);
        // setPriceProductChild(childData.price);
        // setSectorProductChild(childData.id_sector);
        // setTypeProductChild(childData.id_product_type);
        // setImgProductChild(childData.img);
        // setSupplyProductChild(childData.supplies);
    }

    const registerUser = () => {

        console.log(data);
        // let urlApi = '';
        // const formData = new FormData();

        // urlApi = '/api/products';

        // const jsonArrSupplies = JSON.stringify(data.supplies);

        // formData.append('name', data.name);
        // formData.append('description', data.description);
        // formData.append('image', data.img)
        // formData.append('price', data.price);
        // formData.append('id_sector', data.id_sector);
        // formData.append('id_product_type', data.id_product_type);
        // formData.append('supplies', jsonArrSupplies);
        // formData.append('flavor', data.flavor);

        // loadingMessage('Registrando nuevo producto...');
        // Axios.post(PORT() + urlApi, formData)
        //     .then((formData) => {
        //         if (formData.data.Ok) successMessage('Atención', 'Producto registrado exitosamente', 'success');
        //         else displayError('Ha ocurrido un error al registrar el producto.');
        //     })
        //     .catch(error => console.log(error))
    };

    // useEffect(() => {
    //     if (data.name !== '' && data.price && data.price > 0 && data.name && data.id_sector > 0 && data.id_product_type) setReady(true);
    //     else setReady(false);
    // }, [
    //     nameProductChild,
    //     priceProductChild,
    //     sectorProductChild,
    //     typeProductChild,
    //     imgProductChild,
    //     supplyProductChild,
    //     data.id_sector,
    //     data.id_product_type,
    //     data.name,
    //     data.price
    // ]);

    const cancelRegisterUser = () => window.location.replace('/app/users');

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Registrar usuario"}</div>
            <Breadcrumb parentName="Usuarios" icon={faUser} parentLink="users" currentName="Registrar usuario" />
            <div className="viewTitle">
                <h1>Registrar usuario</h1>
            </div>
            <div className="viewBody">
                <DataUser data={data} load={load} />
                <ListPermissions data={data} load={load} matrix={matrix} valueSelect={valueSelect}/>
                {/* <GeneralDataProduct load={load} data={data} /> */}
                {/* <ExtraDataProduct load={load} data={data} /> */}
                <Buttons
                    label='Registrar' actionOK={registerUser}
                    actionNotOK={registerUser}
                    ready={ready}
                    data={data}
                    actionCancel={cancelRegisterUser}
                />
            </div>
        </>
    );
}