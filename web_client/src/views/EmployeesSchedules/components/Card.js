import React from 'react';
import './Card.css';

const Card = ({ title, text, handleCardClicked }) => {
    return (
        <div onClick={handleCardClicked} className="card">
            <div className="card-header bg-light-blue">
            </div>
            <div className="card-body">
                <h4 className="card-title">{title}</h4>
                <p className="card-text">{text}</p>
            </div>
        </div>
    )
};

export default Card;
