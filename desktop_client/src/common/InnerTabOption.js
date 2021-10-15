import React from 'react';

export default function InnerTabOption(props){

    const handler = (e) => {
        props.hand(e.target.name)
    }

    if (props.selected){
        return <button className="nav-link active" style={{fontSize:'20px', fontWeight:'bold'}} data-bs-toggle="tab" name={props.val} onClick={handler}>
            {props.text}
            </button>
    } else {
        return <button className="nav-link" style={{fontSize:'20px', fontWeight:'bold'}} data-bs-toggle="tab" name={props.val} onClick={handler}>
            {props.text}
            </button>
    }
}
