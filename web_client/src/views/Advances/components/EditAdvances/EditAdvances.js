import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import Breadcrumb from '../../../../common/Breadcrumb';
import Buttons from '../../../../common/Buttons';
import dateToString from '../../../../utils/ConverterDate/dateToString';
import dateText from '../../../../utils/DateFormat/dateText';
import displayError from '../../../../utils/ErrorMessages/displayError';
import formattedDate from '../../../../utils/formattedDate';
import successMessage from '../../../../utils/SuccessMessages/successMessage';
import warningMessage from '../../../../utils/WarningMessages/warningMessage';
import ExtraDataAdvances from '../ExtraDataAdvances';
import formatInstallments from '../formatInstallments';

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
                        let res = formatInstallments(response.data);
                        aux.firstMonth = res[0].month.slice(0, -3);
                        aux.installments = res;
                        aux.months = res.length;
                        setDataBack({amount: data.amount, date: data.date, installments: res, months: res.length, firstMonth: res[0].month.slice(0, -3)});
                        setData(aux);
                        setIsLoad(true);
                    })
                    .catch((error) => console.log(error));
                }
        }
    }, [isLoad, data.editing, data.reading, data]);

    const load = (childData) => {
        setData(childData);
        
        let aux = false;
        if (data.firstMonth.length === 10) aux = parseInt(dataBack.firstMonth.slice(0,-3)) !== parseInt(dateToString(data.firstMonth).slice(0, -5)) || parseInt(dataBack.firstMonth.slice(5)) !== parseInt(dateToString(data.firstMonth).slice(5, -3));
        else aux = parseInt(dataBack.firstMonth.slice(0,-3)) !== parseInt(data.installments[0].month.slice(0, -5)) || parseInt(dataBack.firstMonth.slice(5)) !== parseInt(data.installments[0].month.slice(5, -3));
            
        if (data.installments[0].month){
            if (parseInt(data.installments[0].month.slice(0, -5)) === parseInt(data.date.slice(0, -5))) {
                if (parseInt(data.installments[0].month.slice(5, -3)) > parseInt(data.date.slice(5, -3))) {
                    if (data.dniEmployee && data.date && data.amount && data.installments && data.months && (dataBack.amount !== data.amount || dataBack.months !== data.months || aux)) setReady(true);
                    else setReady(false);
                }
                else setReady(false);
            } else if (parseInt(data.installments[0].month.slice(0, -5)) > parseInt(data.date.slice(0, -5))) {
                if (data.dniEmployee && data.date && data.amount && data.installments && data.months && (dataBack.amount !== data.amount || dataBack.months !== data.months || aux)) setReady(true);
                else setReady(false);
            }
            else setReady(false);
        }
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