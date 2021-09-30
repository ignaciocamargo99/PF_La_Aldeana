import React from 'react';
import InnerTabOption from '../../../common/InnerTabOption';

export default function TabOption(props) {

    let handlerTabSelection = (value) => props.handler(value);

    return (
        <>
            <ul className="nav nav-tabs">
                <li className="nav-item" value={props.option1}>
                    <div className="col-md">
                        <InnerTabOption selected={props.select === props.option1} hand={handlerTabSelection} val={props.option1} text={props.textOption1} />
                    </div>
                </li>
                <li className="nav-item" value={props.option2}>
                    <InnerTabOption selected={props.select === props.option2} hand={handlerTabSelection} val={props.option2} text={props.textOption2} />
                </li>
            </ul>
        </>
    );
}