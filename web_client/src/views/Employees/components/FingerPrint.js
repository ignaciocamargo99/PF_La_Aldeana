import React, { useRef, useEffect, useState } from "react";
import Axios from 'axios';
import BeShowed from "../../../common/BeShowed";

const PORT = require('../../../config');

export default function FingerPrint(props) { 
    
    return (
        <>
            <h2>Huellas</h2>
            <h3>Huellas Registradas</h3>
            <label>Se listan los nombres de los dedos (campo finger) que ya estan registrados...</label>
            <button>Agregar Huella</button>
        </>
    )
}