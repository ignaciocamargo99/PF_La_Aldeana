import { faIceCream } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateDate } from '../../../../actions/DateActions';
import Breadcrumb from '../../../../common/Breadcrumb';
import DateProduction from './../../components/DateProduction';
import FlavorsTable from './../../components/FlavorsTable';

function RegisterProductionView(props) {

    const [data, setData] = useState(props.productionToRead)

    const load = (childData) => setData(childData);

    return (
        <>
            <div style={{ display: 'none' }}>{document.title = "Consultar producción"}</div>
            <Breadcrumb parentName="Producción" icon={faIceCream} parentLink="productions" currentName="Consultar producción" />
            <div className="viewTitle">
                <h1>Producción de helado N°{data.id_production}</h1>
            </div>
            <div className="viewBody">
                <DateProduction load={load} data={data} />
                <FlavorsTable data={data}/>
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