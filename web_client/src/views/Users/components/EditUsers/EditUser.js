import Axios from 'axios';
import { useEffect, useState } from 'react';
import '../../../../assets/Buttons.css';
import Buttons from '../../../../common/Buttons';
import successMessage from '../../../../utils/SuccessMessages/successMessage';
import warningMessage from '../../../../utils/WarningMessages/warningMessage';
import displayError from '../../../../utils/ErrorMessages/displayError';
import Breadcrumb from '../../../../common/Breadcrumb';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import loadingMessage from '../../../../utils/LoadingMessages/loadingMessage';
import DataUser from '../DataUsers/DataUser';
import ListPermissions from '../Permissions/ListPermissions';

const PORT = require('../../../../config');

export default function EditUser(props) {
    const [quantityPermissions, setQuantityPermissions] = useState();
    const [data, setData] = useState(props.userToEdit);
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
        if (data.password) {
            if (stringContainsNumber(data.password) && data.nick_user && data.first_name && data.last_name) setReady(true);
            else setReady(false);
        }
        else if (data.nick_user && data.first_name && data.last_name) setReady(true);
        else setReady(false);
    }

    useEffect(() => {
        if (data.nick_user && data.first_name && data.last_name) setReady(true);
        else setReady(false);
    }, [])

    const loadMatrix = (matrix) => setValueSelect(matrix);

    const stringContainsNumber = (_string) => /\d/.test(_string);


    const updateUser = () => {
        if (ready) {
            loadingMessage('Actualizando datos...');
            Axios.put(`${PORT()}/api/user/${data.id_user}`, [data, valueSelect])
                .then((data) => {
                    if (data.data.Ok) successMessage("Atención", "Datos modificados correctamente", "success");
                    else displayError('Ha ocurrido un error...');
                })
                .catch(error => console.log(error))
        }
        else warningMessage('Atención', 'Recuerde que la contraseña debe tener 8 dígitos como mínimo incluído un número y todos los campos son obligatorios', 'warning');
    };

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Editar usuario"}</div>
            <Breadcrumb parentName="Usuarios" icon={faUser} parentLink="users" currentName="Editar usuario" />
            <div className="viewTitle">
                <h1>Usuario N° {props.userToEdit.id_user}</h1>
            </div>
            <div className="viewBody">
                <DataUser data={data} loadData={loadData} />
                <ListPermissions data={data} loadMatrix={loadMatrix} valueSelect={valueSelect} />
                <Buttons
                    label='Aceptar' actionOK={updateUser}
                    actionNotOK={updateUser}
                    ready={ready}
                    data={data}
                    actionCancel={props.onClickCancelEdit}
                />
            </div>
        </>
    );
}