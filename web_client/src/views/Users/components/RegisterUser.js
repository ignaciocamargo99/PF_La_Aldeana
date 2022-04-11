import Axios from 'axios';
import { useEffect, useState } from 'react';
import '../../../assets/Buttons.css';
import Buttons from '../../../common/Buttons';
import successMessage from '../../../utils/SuccessMessages/successMessage';
import warningMessage from '../../../utils/WarningMessages/warningMessage';
import displayError from '../../../utils/ErrorMessages/displayError';
import Breadcrumb from '../../../common/Breadcrumb';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import loadingMessage from '../../../utils/LoadingMessages/loadingMessage';
import DataUser from './DataUsers/DataUser';
import ListPermissions from './Permissions/ListPermissions';

const PORT = require('../../../config');

export default function RegisterUser() {
    const [quantityPermissions, setQuantityPermissions] = useState();
    const [data, setData] = useState({ nick_user: null, first_name: null, last_name: null, password: null, editing: false });
    const [ready, setReady] = useState(false);
    const [valueSelect, setValueSelect] = useState();
    let matrix = [];

    useEffect(() => {
        Axios.get(PORT() + '/api/permissions')
            .then((response) => {
                setQuantityPermissions(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        if (quantityPermissions) {
            for (let x = 0; x < quantityPermissions.length; x++) {
                matrix[x] = [];
                for (let y = 0; y <= 3; y++) {
                    matrix[x][y] = 0;
                }
            };
            setValueSelect(matrix);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantityPermissions]);

    const loadData = (childData) => {
        setData(childData);
        if (data.nick_user && data.first_name && data.last_name && data.password) setReady(true);
        else setReady(false);
    }

    const loadMatrix = (matrix) => setValueSelect(matrix);

    const registerUser = () => {
        if (ready) {
            console.log(data);
            console.log(valueSelect);
        }

        else warningMessage('Atención', 'Todos los campos son obligatorios', 'warning');
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

    const cancelRegisterUser = () => window.location.replace('/app/users');

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Registrar usuario"}</div>
            <Breadcrumb parentName="Usuarios" icon={faUser} parentLink="users" currentName="Registrar usuario" />
            <div className="viewTitle">
                <h1>Registrar usuario</h1>
            </div>
            <div className="viewBody">
                <DataUser data={data} loadData={loadData} />
                <ListPermissions data={data} loadMatrix={loadMatrix} valueSelect={valueSelect} />
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