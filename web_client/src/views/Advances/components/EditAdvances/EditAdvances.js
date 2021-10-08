import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import { useState } from 'react';
import Breadcrumb from '../../../../common/Breadcrumb';
import Buttons from '../../../../common/Buttons';
import dateText from '../../../../utils/DateFormat/dateText';
import displayError from '../../../../utils/ErrorMessages/displayError';
import successMessage from '../../../../utils/SuccessMessages/successMessage';
import warningMessage from '../../../../utils/WarningMessages/warningMessage';
import DataAdvances from '../DataAdvances';
import ExtraDataAdvances from '../ExtraDataAdvances';


const PORT = require('../../../../config');

export default function EditAdvances(props) {
    const [data, setData] = useState(props.advances);
    const [dataBack, setDataBack] = useState(props.advances);
    const [ready, setReady] = useState(true);

    const load = (childData) => {
        setData(childData);
        if (data.dniEmployee && data.date && data.amount && data.installments && data.months && (dataBack.amount !== data.amount || dataBack.months !== data.months)) setReady(true);
        else setReady(false);
    }
    const loadBack = (childData) => {
        setDataBack(childData);
    }

    const updateAdvances = () => {
        if (data.dniEmployee && data.date && data.amount && data.installments && data.months && ready && dataBack !== data) {
            Axios.put(`${PORT()}/api/advances?dniEmployee=${data.nroDNI}&date=${data.dateOld}`, data)
                .then((data) => {
                    if (data.data.Ok) successMessage('Atención', 'Se han modificado los datos del adelanto', 'success')
                    else displayError('Ah ocurrido un error al modificar el adelanto, por favor intente de nuevo más tarde', 'Atención')
                })
                .catch(error => console.log(error));
        }
        else warningMessage('Atención', 'Todos los campos son obligatorios', 'error');
    };

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Editar adelanto"}</div>
            <Breadcrumb parentName="Adelantos" icon={faUserFriends} parentLink="advances" currentName="Editar adelanto" />
            <h2 style={{ fontWeight: 'bold' }}>Editar adelanto {props.advances.name + " " + props.advances.last_name + " " + dateText(new Date(props.advances.date))}</h2>
            <br />
            <DataAdvances load={load} data={data} />
            <ExtraDataAdvances load={load} data={data} loadBack={loadBack}/>
            <Buttons
                label='Registrar' actionOK={updateAdvances}
                actionNotOK={updateAdvances}
                actionCancel={props.cancel}
                ready={ready}
                data={data} />
        </>
    );
}