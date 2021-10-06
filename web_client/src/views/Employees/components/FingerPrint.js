import React, { useRef, useEffect, useState } from "react";
import Axios from 'axios';
import BeShowed from "../../../common/BeShowed";

//var child = require('child_process').execFile;
var executablePath = "%windir%\system32\cmd.exe";
const { execFile } = require('child_process');



const PORT = require('../../../config');

export default function FingerPrint(props) { 
    
    const click = () => {
        execFile('node', ['--version'], (error, stdout, stderr) => {
            if (error) {
              throw error;
            }
            console.log(stdout);
          });
        
        
        
    }
  
    return (
        <>
            <h2>Huellas</h2>
            <h3>Huellas Registradas</h3>
            <label>Se listan los nombres de los dedos (campo finger) que ya estan registrados...</label>
            <button onClick={click}>Agregar Huella</button>
        </>
    )
}