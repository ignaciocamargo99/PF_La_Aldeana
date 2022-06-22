import Axios from 'axios';
import { useEffect, useState } from 'react';
import '../../../../assets/Buttons.css';
import Buttons from '../../../../common/Buttons';
import successMessage from '../../../../utils/SuccessMessages/successMessage';
import validationFranchiseRegister from '../../../../utils/Validations/validationFranchiseRegister';
import DataFranchise from './../../DataFranchise';
import DataManager from './../../DataManager';
import './../../styles/FranchiseForm.css';
import displayError from '../../../../utils/ErrorMessages/errorMesage';
import Breadcrumb from '../../../../common/Breadcrumb';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import loadingMessage from '../../../../utils/LoadingMessages/loadingMessage';
import { defaultQuestionSweetAlert2 } from 'utils/questionMessages/sweetAlert2Questions';

const PORT = require('../../../../config');

export default function EditFranchise(props) {
    const [data, setData] = useState(props.franchiseToEdit);
    const [ready, setReady] = useState(false);

    const load = (childData) => {
        setData(childData);
        if (data.name && data.start_date && data.address && (data.address_number >= 0 && data.address_number <= 99999) &&
            data.city && data.province && data.name_manager && data.last_name_manager && data.dni_manager > 0) setReady(true);
        else setReady(false);
    }

    const registerFranchise = async () => {
        const editionConfirmed = (await defaultQuestionSweetAlert2('¿Confirmar cambios?')).isConfirmed;
        if (editionConfirmed) {
            loadingMessage('Guardando cambios...');
            let urlApi = `/api/franchises/${data.id_franchise}`;
            Axios.put(PORT() + urlApi, data)
                .then(({ data }) => {
                    if (data.Ok) successMessage('Atención', 'Franquicia editada exitosamente', 'success');
                    else displayError('Ha ocurrido un error al guardar los cambios');
                })
                .catch(error => console.log(error))
        }
    };

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Editar franquicia"}</div>
            <Breadcrumb parentName="Franquicias" icon={faStore} parentLink="franchises" currentName="Editar franquicia" />
            <div className="viewTitle">
                <h1>Editar Franquicia "{data.name}"</h1>
            </div>
            <div className="viewBody">
                <DataFranchise load={load} data={data} />
                <hr />
                <DataManager load={load} data={data} />
                <Buttons
                    label='Aceptar' actionOK={registerFranchise}
                    actionNotOK={validationFranchiseRegister}
                    ready={ready}
                    data={data}
                    actionCancel={props.onClickCancelEdit}
                />
            </div>
        </>
    );
}