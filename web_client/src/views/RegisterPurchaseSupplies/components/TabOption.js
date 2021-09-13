import React from 'react';
import InnerTabOption from '../../../common/InnerTabOption';

export default function TabOption(props) {

    let handlerTabSelection = (value) => props.handler(value);

    return (
        <>
            <ul className="nav nav-tabs">
                <li className="nav-item" value='text'>
                    <div className="col-md">
                        <InnerTabOption selected={props.select === 'text'} hand={handlerTabSelection} val='text' text='Nombre' />
                    </div>
                </li>
                <li className="nav-item" value='list'>
                    <InnerTabOption selected={props.select === 'list'} hand={handlerTabSelection} val='list' text='Listado' />
                </li>
            </ul>
        </>
    );
}