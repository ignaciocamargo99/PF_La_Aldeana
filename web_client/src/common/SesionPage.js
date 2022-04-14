import React from "react";
import notFound from '../images/notFound.png'

const PORT = require('../config');

export default function SesionPage() {
    return (
        <>
            <div className="login-content" style={{ marginTop: '50px' }}>
                <img className="index-image" src={notFound} alt=""></img>
            </div>
            <div style={{ textAlign: 'center', fontSize:'25px' }}>
                <p>¡Ooops! Página no encontrada. Vuelva al <a href={`${PORT()}/app/index`}>inicio...</a></p>
            </div>

        </>

    );
}