import React from 'react';
import InnerTabOption from '../../../../common/InnerTabOption';

export default function TabOption(props) {

    let handlerTabSelection = (value) => props.handler(value);

    return (
        <>
            <ul className="nav nav-tabs">
                <li className="nav-item" value='table'>
                    <div className="col-md">
                        <InnerTabOption selected={props.select === 'table'} hand={handlerTabSelection} val='table' text='Tabla de datos' />
                    </div>
                </li>
                <li className="nav-item" value='graph'>
                    <InnerTabOption selected={props.select === 'graph'} hand={handlerTabSelection} val='graph' text='Gráficos' />
                </li>
            </ul>
        </>
    );
}