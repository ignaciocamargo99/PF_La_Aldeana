import Axios from 'axios';
import { useEffect, useState } from 'react';
import '../../assets/Buttons.css';
import Buttons from '../../common/Buttons';
import successMessage from '../../utils/SuccessMessages/successMessage';
import validationFranchiseRegister from '../../utils/Validations/validationFranchiseRegister';
import DataFranchise from './DataFranchise';
import DataManager from './DataManager';
import './styles/FranchiseForm.css';
import displayError from '../../utils/ErrorMessages/errorMesage';
import Breadcrumb from '../../common/Breadcrumb';
import { faStore } from '@fortawesome/free-solid-svg-icons';

const PORT = require('../../config');

export default function RegisterFranchise() {
    const [data, setData] = useState({
        name: '', start_date: '', address: '', address_number: -1, city: '', province: '',
        name_manager: '', last_name_manager: '', dni_manager: 0
    });
    const [nameChild, setNameChild] = useState('');
    const [startDateChild, setStartDateChild] = useState('');
    const [addressChild, setAddressChild] = useState('');
    const [addressNumberChild, setAddressNumberChild] = useState('');
    const [cityChild, setCityChild] = useState('');
    const [provinceChild, setProvinceChild] = useState('');
    const [nameManagerChild, setNameManagerChild] = useState('');
    const [lastNameManagerChild, setLastNameManagerChild] = useState('');
    const [dniManagerChild, setDniManagerChild] = useState('');
    const [ready, setReady] = useState(false);

    const load = (childData) => {
        setData(childData);
        setNameChild(childData.name);
        setStartDateChild(childData.start_date);
        setAddressChild(childData.address);
        setAddressNumberChild(childData.address_number);
        setCityChild(childData.city);
        setProvinceChild(childData.province);
        setNameManagerChild(childData.name_manager);
        setLastNameManagerChild(childData.last_name_manager);
        setDniManagerChild(childData.dni_manager);
    }

    const registerFranchise = () => {
        let urlApi = '/api/franchises';

        Axios.post(PORT() + urlApi, data)
            .then(({ data }) => {
                if (data.Ok) {
                    successMessage('Atención', 'Producto registrado exitosamente', 'success');
                }
                else {
                    displayError('Ha ocurrido un error al registrar una franquicia.');
                }
            })
            .catch(error => console.log(error))
    };

    useEffect(() => {
        if (data.name && data.start_date && data.address && (data.address_number >= 0 && data.address_number <= 99999) &&
            data.city && data.province && data.name_manager && data.last_name_manager && data.dni_manager > 0) setReady(true);
        else setReady(false);
    }, [nameChild, startDateChild, addressChild, cityChild, provinceChild, nameManagerChild, lastNameManagerChild, dniManagerChild, addressNumberChild]);

    const cancelRegisterFranchise = () => window.location.reload();

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Registrar franquicia"}</div>
            <Breadcrumb parentName="Franquicias" icon={faStore} parentLink="franchises" currentName="Registrar franquicia" />
            <div className="viewTitle">
                <h1>Registrar Franquicia</h1>
            </div>
            <div className="viewBody">
                <DataFranchise load={load} data={data} />
                <hr />
                <DataManager load={load} data={data} />
                <Buttons
                    label='Registrar' actionOK={registerFranchise}
                    actionNotOK={validationFranchiseRegister}
                    ready={ready}
                    data={data}
                    actionCancel={cancelRegisterFranchise}
                />
            </div>
        </>
    );
}