import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import Breadcrumb from '../../../../common/Breadcrumb';
import Buttons from '../../../../common/Buttons';
import dateText from '../../../../utils/DateFormat/dateText';
import displayError from '../../../../utils/ErrorMessages/displayError';
import successMessage from '../../../../utils/SuccessMessages/successMessage';
import warningMessage from '../../../../utils/WarningMessages/warningMessage';
import DataAdvances from '../DataAdvances';
import ExtraDataAdvances from '../ExtraDataAdvances';
import formattedDate from '../../../../utils/formattedDate';

const PORT = require('../../../../config');

export default function EditAdvances(props) {
    const [data, setData] = useState(props.advances);
    const [dataBack, setDataBack] = useState(props.advances);
    const [ready, setReady] = useState(true);
    const [isLoad, setIsLoad] = useState(false);

    useEffect(()=>{
        if (!isLoad) {
            if(data.reading || data.editing){
                Axios.get(PORT() + `/api/installments?dniEmployee=${data.dniEmployee}&date=${data.date}`)
                    .then((response) => {
                        let aux = data;
                        aux.installments[0].month = formattedDate(new Date(response.data[0].month));
                        aux.firstMonth = formattedDate(new Date(response.data[0].month));
                        data.installments = response.data;
                        data.months = response.data.length;
                        data.firstMonth = response.data[0].month;
                        setDataBack({amount: data.amount, date: data.date, installments: response.data, months: response.data.length, firstMonth: formattedDate(new Date(response.data[0].month))});
                        setData(aux);
                        setIsLoad(true);
                    })
                    .catch((error) => console.log(error));
                }
        }
    }, [isLoad, data.editing, data.reading, data]);

    const load = (childData) => {
        setData(childData);
        //console.log(data.dniEmployee , data.date , data.amount , data.installments , data.months , dataBack.amount , data.amount , dataBack.months , data.months , dataBack.firstMonth , data.firstMonth)
        if (data.dniEmployee && data.date && data.amount && data.installments && data.months && (dataBack.amount !== data.amount || dataBack.months !== data.months || dataBack.firstMonth !== data.firstMonth) && data.date < data.firstMonth) setReady(true);
        else setReady(false);
    }

    const updateAdvances = () => {
        if (data.dniEmployee && data.date && data.amount && data.installments && data.months && ready) {
            Axios.put(`${PORT()}/api/advances?dniEmployee=${data.nroDNI}&date=${data.dateOld}`, data)
                .then((data) => {
                    if (data.data.Ok) successMessage('Atención', 'Se han modificado los datos del adelanto', 'success')
                    else displayError('Ah ocurrido un error al modificar el adelanto, por favor intente de nuevo más tarde', 'Atención')
                })
                .catch(error => console.log(error));
        }
        else warningMessage('Atención', 'Todos los campos son obligatorios', 'error');
    };
    const back = () => {
        setData(dataBack);
        props.cancel();
    }

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Editar adelanto"}</div>
            <Breadcrumb parentName="Adelantos" icon={faUserFriends} parentLink="advances" currentName="Editar adelanto" />
            <h2 style={{ fontWeight: 'bold' }}>Editar adelanto {props.advances.name + " " + props.advances.last_name + " " + dateText(new Date(props.advances.date))}</h2>
            <br />
            <DataAdvances load={load} data={data} />
            <ExtraDataAdvances load={load} data={data} />
            <Buttons
                label='Registrar' actionOK={updateAdvances}
                actionNotOK={updateAdvances}
                actionCancel={back}
                ready={ready}
                data={data} />
        </>
    );
}