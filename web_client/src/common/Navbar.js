import React, { useRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import '../assets/Navbar.css';
import logo from '../images/logo.png';
import BeShowed from './BeShowed';
import { decrypt } from '../utils/EncryptDecryptCookies/EncryptDecrypt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faPlus, faSignInAlt, faList, faFile, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

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
    };

    const signOut = () => {
        cookies.remove('nick_user', { path: '/' })
        cookies.remove('first_name', { path: '/' })
        cookies.remove('last_name', { path: '/' })
        cookies.remove('permissions', { path: '/' })
        window.location.href = '/app/index'
    };

    const signIn = () => {
        window.location.href = '/app/index'
    };

    const showOptionsWithPermissions = () => {
        // Show me permissions with state of redux...
        let permissions = []
        props.options.forEach((option) => { permissions.push(decrypt(option)) })

        const permissionProducts = permissions.find(option => option === "Productos");
        let products;
        if (permissionProducts === "Productos") {
            products =
                <li>
                    <Dropdown>
                        <Dropdown.Toggle className="nav-dropdown">
                            Productos
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/app/products">
                                <FontAwesomeIcon icon={faList} /> Ver productos
                            </Dropdown.Item>
                            <Dropdown.Item href="/app/typeProducts">
                                <FontAwesomeIcon className="drop-item-new" icon={faPlus} /> Tipo de producto
                            </Dropdown.Item>
                            <Dropdown.Item href="/app/supplies">
                                <FontAwesomeIcon className="drop-item-new" icon={faPlus} /> Insumo
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
        };

        const permissionProduction = permissions.find(option => option === "Producciones");
        let productions;
        if (permissionProduction === 'Producciones') {
            productions =
                <li>
                    <Dropdown>
                        <Dropdown.Toggle className="nav-dropdown">
                            Producción
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="">
                                <FontAwesomeIcon icon={faList} /> Ver producciones
                            </Dropdown.Item>
                            <Dropdown.Item href="/app/production">
                                <FontAwesomeIcon className="drop-item-new" icon={faPlus} /> Nueva producción
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
        };

        const permissionFranchises = permissions.find(option => option === "Franquicias");
        let franchises;
        if (permissionFranchises === "Franquicias") {
            franchises =
                <li>
                    <Dropdown>
                        <Dropdown.Toggle className="nav-dropdown">
                            Franquicias
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/app/franchises">
                                <FontAwesomeIcon icon={faList} /> Ver franquicias
                            </Dropdown.Item>
                            <Dropdown.Item href="/app/newFranchise">
                                <FontAwesomeIcon className="drop-item-new" icon={faPlus} /> Nueva franquicia
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
        };

        const permissionSales = permissions.find(option => option === "Ventas")
        let sales;
        const permissionReports = permissions.find(option => option === "Reportes");
        if (permissionSales === "Ventas") {
            sales =
                <li>
                    <Dropdown>
                        <Dropdown.Toggle className="nav-dropdown">
                            Ventas
                        </Dropdown.Toggle>
                        <BeShowed show={permissionReports === "Reportes"}>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/app/salesReport">
                                    <FontAwesomeIcon icon={faFile} /> Ver informe de productos vendidos
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </BeShowed>
                    </Dropdown>
                </li>
        };

        const permissionPurchases = permissions.find(option => option === "Compras")
        let purchases
        if (permissionPurchases === "Compras") {
            purchases =
                <li>
                    <Dropdown>
                        <Dropdown.Toggle className="nav-dropdown">
                            Compras
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/app/purchaseSupplies">
                                <FontAwesomeIcon className="drop-item-new" icon={faPlus} /> Compra de insumos
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
        };

        const permissionEmployees = permissions.find(option => option === "Empleados")
        let employees;
        if (permissionEmployees === "Empleados") {
            employees =
                <li>
                    <Dropdown>
                        <Dropdown.Toggle className="nav-dropdown">
                            Empleados
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/app/employees">
                                <FontAwesomeIcon icon={faList} /> Ver empleados
                            </Dropdown.Item>
                            <Dropdown.Item href="/app/licenses">
                                <FontAwesomeIcon icon={faList} /> Ver licencias
                            </Dropdown.Item>
                            <Dropdown.Item href="/app/assistanceEmployees">
                                <FontAwesomeIcon icon={faList} /> Ver asistencias 
                            </Dropdown.Item>
                            <Dropdown.Item href="/app/employeesSchedules">
                                <FontAwesomeIcon icon={faCalendarAlt} /> Grilla de horarios
                            </Dropdown.Item>
                            <Dropdown.Item href="/app/advances">
                                <FontAwesomeIcon icon={faList} /> Ver adelantos
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
        }

        return (
            <>
                {products}
                {productions}
                {franchises}
                {sales}
                {purchases}
                {employees}
            </>
        )
    };

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
