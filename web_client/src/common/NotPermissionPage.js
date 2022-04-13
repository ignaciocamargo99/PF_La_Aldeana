import React from "react";
import unauthorized from '../images/unauthorized.png'

export default function NotPermissionPage() {
    return (
        <>
            <div className="login-content" style={{ marginTop: '50px' }}>
                <img className="index-image" src={unauthorized} alt="" width='320px'></img>
            </div>
            <div style={{ textAlign: 'center', fontSize:'23px' }}>
                <p>¡Ooops! Usted no tiene permiso para visualizar el link ingresado...</p>
            </div>

        </>

    );
}