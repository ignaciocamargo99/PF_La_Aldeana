import React, { useEffect, useState } from 'react';
import DateProduction from './components/DateProduction';
import FlavorsTable from './components/FlavorsTable';
import { connect } from 'react-redux';
import { updateDate } from '../../actions/DateActions';
import Buttons from '../../common/Buttons';
import Axios from 'axios';
import successMessage from '../../utils/SuccessMessages/successMenssage';
import warningMessage from '../../utils/WarningMessages/warningMessage';
import displayError from '../../utils/ErrorMessages/displayError';

function RegisterProductionView (props){
   
    const PORT = require('../../config');
    const [ready, setReady] = useState(false);

    const cancelRegisterProduction = () => window.location.reload();

    const registerProduction = () => {
        
        if (ready) {
            const flavorsValues = props.productionFlavors.filter(() => true);
            let production = { "dateProduction":props.date, "flavors":flavorsValues }
            Axios.post(PORT() + '/api/productions/new', production)
            .then((production) => {
                if(production.data.Ok) successMessage("Atención", "Producción Registrada", "success");
                else displayError('Ha ocurrido un error al registrar la producción. \n' + production.data.Message);
            })
            .catch(error => console.log(error))
        }
        else {
            warningMessage("Error","Se debe ingresar al menos un sabor para registrar la producción.","error");
        }
    }
    
    useEffect(() => {
        if (props.productionFlavors.length > 0) {
            setReady(true);
        }
        else
        {
            setReady(false);
        }
    },[props.productionFlavors])
    
    return(
        <>
            <div className="viewTitle">
                <h1>Registrar Producción</h1>
            </div>
            
            <div className="viewBody">
                <DateProduction></DateProduction>
                <br></br>
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

export default connect(mapStateToProps,mapDispatchToProps)(RegisterProductionView);