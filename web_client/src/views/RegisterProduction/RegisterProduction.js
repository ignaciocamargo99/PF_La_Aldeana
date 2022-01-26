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

function RegisterProductionView(props) {

    const PORT = require('../../config');
    const [ready, setReady] = useState(false);
    const data = [];
    data.reading = false;

    const cancelRegisterProduction = () => window.location.reload();

    const registerProduction = () => {

        if (ready) {
            const flavorsValues = props.productionFlavors.filter(() => true);
            let production = { "dateProduction": props.date, "flavors": flavorsValues }
            Axios.post(PORT() + '/api/productions', production)
                .then((production) => {
                    if (production.data.Ok) successMessage("Atención", "Producción Registrada", "success");
                    else displayError('La producción del sabor/es ya fue registrada en la fecha actual.');
                })
                .catch(error => console.log(error))
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
                <FlavorsTable></FlavorsTable>
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