import Axios from 'axios';
import { useEffect, useState } from 'react';
import '../../assets/Buttons.css';
import Buttons from '../../common/Buttons';
import success from '../../utils/SuccessMessages/successTypeProduct';
import validationFranchiseRegister from '../../utils/Validations/validationFranchiseRegister';
import DataFranchise from './DataFranchise';
import DataManager from './DataManager';
import './RegisterFranchise.css';
import './styles/FranchiseForm.css';

const PORT = require('../../config');

export default function RegisterFranchise() {
    const [data, setData] = useState({ name: '', start_date: '', address: '', address_number: -1, city: '', province: '',
    name_manager: '', last_name_manager: '', dni_manager: 0 });
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
        console.log(data)
    }

    const registerFranchise = () => {
        let urlApi = '';
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('start_date', data.start_date);
        formData.append('address', data.address);
        formData.append('address_number', data.address_number);
        formData.append('city', data.city)
        formData.append('province', data.province);
        formData.append('name_manager', data.name_manager);
        formData.append('last_name_manager', data.last_name_manager);
        formData.append('dni_manager', data.dni_manager);

        Axios.post(PORT() + urlApi, formData)
            .then(success())
            .catch(error => console.log(error))
    };

    useEffect(() => {
        console.log(data)
        if (data.name !== '' && data.name !== 'null' &&
        data.start_date !== '' && data.start_date !== 'null' &&
        data.address !== '' && data.address !== 'null'  &&
        data.address_number >= 0 && data.address_number <= 99999  &&
        data.city !== '' && data.city !== 'null'  &&
        data.province !== '' && data.province !== 'null'  &&
        data.name_manager !== '' && data.name_manager !== 'null'  &&
        data.last_name_manager !== '' && data.last_name_manager !== 'null'  &&
        data.dni_manager > 0) setReady(true);
        else setReady(false);
    }, [nameChild, startDateChild, addressChild, cityChild, provinceChild, nameManagerChild, lastNameManagerChild, dniManagerChild, addressNumberChild]);

    const cancelRegisterFranchise = () => window.location.reload();

    return (
        <>
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