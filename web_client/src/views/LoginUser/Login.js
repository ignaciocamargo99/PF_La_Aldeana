import React, { useState } from 'react';
import '../../assets/Buttons.css';
import ModalLogin from './ModalLogin';

export default function Login(props){

    const [printModal,setPrintModal] = useState(false);

    const changePrintModal = () => {
        setPrintModal(!printModal)
        
    }

    const init = () =>{
      console.log('Se inicio sesion')
    }

    return(<div className="row justify-content-sm-center col-md-6 offset-sm-3">
            <div className="row">
                <img src={props.imageURL} alt=""></img>
                <button className="btn-Access" onClick={changePrintModal}>Iniciar Sesion</button>
            </div>
            <ModalLogin show={printModal} close={changePrintModal} init={init}/>
        </div>)
}