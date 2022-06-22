import React from 'react';
import './Card.css';

const Card = ({ title, text, handleCardClicked, style }) => {
    return (
        <div onClick={handleCardClicked} className="card" style={style}>
            <div className="card-header bg-light-blue ">
            </div>
            <div className="card-body">
                <h4 className="card-title">{title}</h4>
                <p className="card-text">{text}</p>
            </div>
        </div>
    )
};

export default Card;
