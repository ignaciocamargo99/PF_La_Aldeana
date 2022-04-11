import React from "react";
import robot_descompuesto from '../images/robot_descompuesto.png'


export default function NotPermissionPage() {
    return (
        <>
            <div className="login-content" style={{ marginTop: '50px' }}>
                <img className="index-image" src={robot_descompuesto} alt=""></img>
            </div>
            <div style={{ textAlign: 'center', fontSize:'25px' }}>
                <p>¡Ooops! Página no encontrada. Usted no tiene permiso para visualizar el link ingresado...</p>
            </div>

        </>

    );
}