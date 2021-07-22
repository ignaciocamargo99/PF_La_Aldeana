import React from 'react';
import { Dropdown } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import '../assets/Navbar.css';
import logo from '../images/logo.png';
import BeShowed from './BeShowed';

const cookies = new Cookies();
export default function Navbar (props){

    const signOut = () =>{
        cookies.remove('nick_user', {path: '/'})
        cookies.remove('first_name', {path: '/'})
        cookies.remove('last_name', {path: '/'})
        cookies.remove('permissions', {path: '/'})
        window.location.href = './index'
    }

    const showOptionsWithPermissions = () => {
        // Show me permissions with state of redux...
        const permissionVentas = props.options.find(option => option === "Ventas")
        if (permissionVentas === "Ventas") {
            return (
                <>
                    <Dropdown>
                        <Dropdown.Toggle className="dropdown">
                            Ventas
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/typeProducts">Tipos de producto</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Insumos</Dropdown.Item>
                            <Dropdown.Item href="/products">Productos</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </>
            )
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light back-orange" >
            <div className="container-fluid">
                <a className="navbar-brand" href="/index">
                    <img src={logo} alt="" height="50"></img>
                    &nbsp;<b className="color-blue">La Aldeana</b>
                </a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" href='/index'><b className="color-blue">Inicio</b></a>
                        </li>
                        {showOptionsWithPermissions()}
                    </ul>
                </div>
                <BeShowed show={cookies.get('nick_user')!== undefined}>
                    <label><b className='color-blue'>{`Usuario: ${cookies.get('first_name')} ${cookies.get('last_name')}`}</b></label>
                    <button className="btn btn-primary" onClick={signOut}>Cerrar Sesion</button>
                </BeShowed>
            </div>
        </nav>
    )
}
