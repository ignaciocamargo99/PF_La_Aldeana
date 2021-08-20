import React, { useRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import '../assets/Navbar.css';
import logo from '../images/logo.png';
import BeShowed from './BeShowed';
import { decrypt } from '../utils/EncryptDecryptCookies/EncryptDecrypt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons'

const cookies = new Cookies();

export default function Navbar(props) {
    const burgerRef = useRef(null);

    const burgerOnClick = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.navbar-list');
        const navLinks = document.querySelectorAll('.navbar-list li');

        nav.classList.toggle('nav-active');

        navLinks.forEach((li, index) => {
            if (li.style.animation) {
                li.style.animation = '';
            }
            else {
                li.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger animation
        burger.classList.toggle('toggle');
    }

    const signOut = () => {
        cookies.remove('nick_user', { path: '/' })
        cookies.remove('first_name', { path: '/' })
        cookies.remove('last_name', { path: '/' })
        cookies.remove('permissions', { path: '/' })
        window.location.href = '/app/index'
    }

    const signIn = () => {
        window.location.href = '/app/index'
    }

    const showOptionsWithPermissions = () => {
        // Show me permissions with state of redux...
        let permissions = []
        props.options.map((option) => {permissions.push(decrypt(option))})
        const permissionVentas = permissions.find(option => option === "Ventas")
        if (permissionVentas === "Ventas") {
            return (
                <li>
                    <Dropdown>
                        <Dropdown.Toggle className="nav-dropdown">
                            Ventas
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/app/typeProducts">Registrar tipo de producto</Dropdown.Item>
                            <Dropdown.Item href="/app/products">Productos</Dropdown.Item>
                            <Dropdown.Item href="/app/franchise">Registrar franquicias</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
            )
        }
    }

    return (
        <nav className="navbar-header">
            <div className="navbar-left">
                <a className="navbar-brand" href="/app/index">
                    <img src={logo} alt="" height="50"></img>
                    &nbsp;<label><b className="color-blue img-title">La Aldeana</b></label>
                </a>
                <ul className="navbar-list">
                    {showOptionsWithPermissions()}

                    <div className="li-btn-close-session">
                        <li>
                            <a className="navbar-ref" href="#"><button className="navbar-btn" onClick={signOut}>Cerrar sesión</button></a>
                        </li>
                    </div>
                </ul>
            </div>

            <div className="navbar-right">
                <ul>
                    <BeShowed show={cookies.get('nick_user')}>
                        <label><b className='color-blue signed-user'>{`Usuario: ${cookies.get('first_name')} ${cookies.get('last_name')}`}&nbsp;</b></label>
                        <button className="btn" onClick={signOut}><FontAwesomeIcon icon={faSignOutAlt} /></button>
                    </BeShowed>
                    <BeShowed show={!cookies.get('nick_user')}>
                        <label><b className='color-blue'>Iniciar sesion&nbsp;</b></label>
                        <button className="btn" onClick={signIn}><FontAwesomeIcon icon={faSignInAlt} /></button>
                    </BeShowed>
                </ul>
            </div>


            <div className="burger" ref={burgerRef} onClick={burgerOnClick}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </nav>
    )
}
