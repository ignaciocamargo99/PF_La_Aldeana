import React from "react";
import robot_descompuesto from '../images/robot_descompuesto.png'

const PORT = require('../config');

export default function SesionPage() {
    return (
        <>
            <div className="login-content" style={{ marginTop: '50px' }}>
                <img className="index-image" src={robot_descompuesto} alt=""></img>
            </div>
            <div style={{ textAlign: 'center', fontSize:'25px' }}>
                <p>¡Ooops! Página no encontrada. Por favor, <a href={`${PORT()}/app/index`}>inicie sesión...</a></p>
            </div>

        </>

    );
}