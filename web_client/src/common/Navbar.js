import React from 'react';
import logo from '../images/logo.png';
import '../assets/Forms.css';

export default function Navbar(props){


    return(
        <nav className="navbar navbar-expand-lg navbar-light back-orange" >
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src={logo} height="50"></img>
                    &nbsp;<b className="color-blue">La Aldeana</b>
                    </a>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {props.options.map((option,i) => {
                        return(
                            <li className="nav-item" key={i}>
                                <a className="nav-link active" href="#"><b className="color-blue">{option}</b></a>
                            </li>)
                    })}
                </ul>
                </div>
            </div>
        </nav>
    )
}