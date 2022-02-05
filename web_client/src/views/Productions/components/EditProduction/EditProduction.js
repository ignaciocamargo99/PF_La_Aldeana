import React, { useEffect, useState } from 'react';
import DateProduction from '../DateProduction';
import FlavorsTable from '../FlavorsTable';
import { connect } from 'react-redux';
import { updateDate } from '../../../../actions/DateActions';
import Buttons from '../../../../common/Buttons';
import Axios from 'axios';
import successMessage from '../../../../utils/SuccessMessages/successMessage';
import warningMessage from '../../../../utils/WarningMessages/warningMessage';
import displayError from '../../../../utils/ErrorMessages/displayError';
import Breadcrumb from '../../../../common/Breadcrumb';
import { faIceCream } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import loadingMessage from '../../../../utils/LoadingMessages/loadingMessage';

function EditProduction(props) {

    const PORT = require('../../../../config');
    const [ready, setReady] = useState(false);
    const [productions, setProductions] = useState(true);
    const [data, setData] = useState(props.productionToEdit)

    const load = (childData) => setData(childData);

    useEffect(() => {
        Axios.get(PORT() + '/api/productions')
            .then(({ data }) => {
                setProductions(data);
            })
            .catch((error) => console.log(error));
    }, []);

    const registerProduction = () => {
        if (ready) {
            let productionDateRegistered = productions.find(production => moment(production.date_production).format('YYYY-MM-DD') === props.date && (data.id_production !== production.id_production));
            if (!productionDateRegistered) {
                const flavorsValues = props.productionFlavors.filter(() => true);
                let production = { "date_production": props.date, "id_production": data.id_production}
                loadingMessage('Modificando datos de producción')
                Axios.put(PORT() + '/api/productions', [production, flavorsValues])
                    .then(production => {
                        if (production.status === 200) successMessage("Atención", "Producción Registrada", "success");
                        else displayError('Ha ocurrido un error...');
                    })
                    .catch(error => console.log(error))

            }
            else {
                warningMessage("Atención", "Ya existe una producción registrada en el día de la fecha", "warning");
            }
        }
        else {
            warningMessage("Atención", "Se debe ingresar al menos un sabor y cargar la fecha para registrar la producción.", "warning");
        }
    }

    useEffect(() => {
        if (props.productionFlavors.length > 0) setReady(true);
        else setReady(false);
    }, [props.productionFlavors, props.date])

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Editar producción"}</div>
            <Breadcrumb parentName="Producción" icon={faIceCream} parentLink="productions" currentName="Editar producción" />
            <div className="viewTitle">
                <h1>Editar Producción N°{data.id_production}</h1>
            </div>
            <div className="viewBody">
                <DateProduction load={load} data={data} />
                <br />
                <FlavorsTable data={data}></FlavorsTable>
                <Buttons label="Registrar" ready={ready} actionOK={registerProduction} actionNotOK={registerProduction} actionCancel={props.onClickCancelEdit}></Buttons>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        date: state.date,
        productionFlavors: state.productionFlavors
    }
}

const mapDispatchToProps = {
    updateDate
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduction);