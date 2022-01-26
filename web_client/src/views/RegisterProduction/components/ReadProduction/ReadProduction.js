import React, { useEffect, useState } from 'react';
import DateProduction from './../../components/DateProduction';
import FlavorsTable from './../../components/FlavorsTable';
import { connect } from 'react-redux';
import { updateDate } from '../../../../actions/DateActions';
import Buttons from '../../../../common/Buttons';
import Axios from 'axios';
import successMessage from '../../../../utils/SuccessMessages/successMessage';
import warningMessage from '../../../../utils/WarningMessages/warningMessage';
import displayError from '../../../../utils/ErrorMessages/displayError';
import Breadcrumb from '../../../../common/Breadcrumb';
import { faIceCream } from '@fortawesome/free-solid-svg-icons';
import FlavorProduction from './FlavorProduction';

const PORT = require('../../../../config');

function RegisterProductionView(props) {

    const [data, setData] = useState(props.productionToRead)

    const load = (childData) => setData(childData);

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Consultar producción"}</div>
            <Breadcrumb parentName="Producción" icon={faIceCream} parentLink="productions" currentName="Consultar producción" />
            <div className="viewTitle">
                <h1>Producción de helado "{data.name}"</h1>
            </div>
            <div className="viewBody">
                <DateProduction load={load} data={data} />
                <FlavorProduction data={data} />
                <div className='buttons'>
                    <button className='sendOk' onClick={props.onClickCancelRead}>Volver</button>
                </div>
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