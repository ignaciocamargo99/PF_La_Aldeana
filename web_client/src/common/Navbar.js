import React from 'react';
import { Dropdown } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import '../assets/Navbar.css';
import logo from '../images/logo.png';
import BeShowed from './BeShowed';
import { decrypt } from '../utils/EncryptDecryptCookies/EncryptDecrypt';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignOutAlt , faSignInAlt} from '@fortawesome/free-solid-svg-icons' 

const cookies = new Cookies();
export default function Navbar (props){

    const signOut = () =>{
        cookies.remove('nick_user', {path: '/'})
        cookies.remove('first_name', {path: '/'})
        cookies.remove('last_name', {path: '/'})
        cookies.remove('permissions', {path: '/'})
        window.location.href = '/app/index'
    }

    const signIn = () => {
        window.location.href = '/app/index'
    }

    const showOptionsWithPermissions = () => {
        // Show me permissions with state of redux...
        let permisos = []
        props.options.map((option) => {permisos.push(decrypt(option))})
        const permissionVentas = permisos.find(option => option === "Ventas")
        let ventas 
        if (permissionVentas === "Ventas") {
            ventas =
                <>
                    <Dropdown>
                        <Dropdown.Toggle className="dropdown">
                            Ventas
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/app/typeProducts">Tipos de producto</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Insumos</Dropdown.Item>
                            <Dropdown.Item href="/app/products">Registrar productos</Dropdown.Item>
                            {/* <Dropdown.Item href="/listProducts">Productos</Dropdown.Item> */}
                        </Dropdown.Menu>
                    </Dropdown>
                </>
        }
        const permissionCompras = permisos.find(option => option === "Compras")
        let compras
        if(permissionCompras === "Compras"){
            compras =
                <>
                    <Dropdown>
                        <Dropdown.Toggle className="dropdown">
                            Compras
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/app/purchaseSupplies">Compra de insumos</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </>
        }

        return(
            <>
                {ventas}
                {compras}
            </>
        )
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light back-orange" >
            <div className="container-fluid">
                <a className="navbar-brand" href="/app/index">
                    <img src={logo} alt="" height="50"></img>
                    &nbsp;<b className="color-blue">La Aldeana</b>
                </a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" href='/app/index'><b className="color-blue">Inicio</b></a>
                        </li>
                        {showOptionsWithPermissions()}
                    </ul>
                </div>
                <BeShowed show={cookies.get('nick_user')!= undefined}>
                    <label><b className='color-blue'>{`Usuario: ${cookies.get('first_name')} ${cookies.get('last_name')}`}&nbsp;</b></label>
                    <button className="btn" onClick={signOut}><FontAwesomeIcon icon={faSignOutAlt} /></button>
                </BeShowed>
                <BeShowed show={cookies.get('nick_user') === undefined}>
                    <button className="btn" onClick={signIn}><label><b className='color-blue'>Iniciar sesion&nbsp;</b></label><FontAwesomeIcon icon={faSignInAlt} /></button>
                </BeShowed>
            </div>
        </nav>
    )
}
