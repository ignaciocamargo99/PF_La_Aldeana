import React, { useEffect, useState } from 'react';
import DateProduction from './components/DateProduction';
import FlavorsTable from './components/FlavorsTable';
import { connect } from 'react-redux';
import { updateDate } from '../../actions/DateActions';
import Buttons from '../../common/Buttons';
import Axios from 'axios';
import successMessage from '../../utils/SuccessMessages/successMessage';
import warningMessage from '../../utils/WarningMessages/warningMessage';
import displayError from '../../utils/ErrorMessages/displayError';
import Breadcrumb from '../../common/Breadcrumb';
import { faIceCream } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import loadingMessage from '../../utils/LoadingMessages/loadingMessage';
import { defaultQuestionSweetAlert2 } from 'utils/questionMessages/sweetAlert2Questions';

function RegisterProductionView(props) {

    const PORT = require('../../config');
    const [ready, setReady] = useState(false);
    const [productions, setProductions] = useState(true);
    const data = [];
    data.reading = false;

    useEffect(() => {
        Axios.get(PORT() + '/api/productions')
            .then(({ data }) => {
                setProductions(data);
            })
            .catch((error) => console.log(error));
    }, []);

    const cancelRegisterProduction = () => window.location.replace('/app/productions');

    const registerProduction = async () => {
        if (ready) {
            const registrationConfirmed = (await defaultQuestionSweetAlert2(`¿Registrar producción?`)).isConfirmed;
            if (registrationConfirmed) {
                let productionDateRegistered = []
                if (PORT() === '') productionDateRegistered = productions.find(production => moment(production.date_production).format('YYYY-MM-DD') === props.date);
                else productionDateRegistered = productions.find(production => moment(production.date_production).add(1, 'days').format('YYYY-MM-DD') === props.date);

                if (!productionDateRegistered) {
                    const flavorsValues = props.productionFlavors.filter(() => true);
                    let production = { "dateProduction": props.date, "flavors": flavorsValues };
                    loadingMessage('Registrando producción...')
                    Axios.post(PORT() + '/api/productions', production)
                        .then((production) => {
                            if (production.data.Ok) successMessage("Atención", "Producción registrada exitosamente", "success");
                            else displayError('Ha ocurrido un error...');
                        })
                        .catch(error => console.log(error))

                }
                else {
                    warningMessage("Atención", "Ya existe una producción registrada en el día de la fecha", "warning");
                }
            }
        }
        else {
            warningMessage("Atención", "Se debe ingresar al menos un sabor y cargar la fecha para registrar la producción.", "warning");
        }
    }

    useEffect(() => {
        if (props.productionFlavors.length > 0 && props.date) {
            setReady(true);
        }
        else {
            setReady(false);
        }
    }, [props.productionFlavors, props.date])

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Registrar producción"}</div>
            <Breadcrumb parentName="Producción" icon={faIceCream} parentLink="productions" currentName="Registrar producción" />
            <div className="viewTitle">
                <h1>Registrar Producción</h1>
            </div>
            <div className="viewBody">
                <DateProduction data={data} />
                <br />
                <FlavorsTable data={data}></FlavorsTable>
                <Buttons label="Registrar" ready={ready} actionOK={registerProduction} actionNotOK={registerProduction} actionCancel={cancelRegisterProduction}></Buttons>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterProductionView);