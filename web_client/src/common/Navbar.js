import { faCalendarAlt, faFile, faList, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import { WHOLESALE_PAGE } from 'routes/routes';
import Cookies from 'universal-cookie';
import { FLAVOR_TYPES_VIEW_TITLE } from 'views/FlavorTypes/constants';
import '../assets/Navbar.css';
import logo from '../images/logo.png';
import { decrypt } from '../utils/EncryptDecryptCookies/EncryptDecrypt';
import BeShowed from './BeShowed';

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
        cookies.remove('accesses', { path: '/' })
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
                            <Dropdown.Item href="/app/productTypes">
                                <FontAwesomeIcon icon={faList} /> Ver tipos de producto
                            </Dropdown.Item>
                            <Dropdown.Item href="/app/supplies">
                                <FontAwesomeIcon icon={faList} /> Ver insumos
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
                            <Dropdown.Item href="/app/productions">
                                <FontAwesomeIcon icon={faList} /> Ver producciones
                            </Dropdown.Item>
                            <Dropdown.Item href="/app/flavors">
                                <FontAwesomeIcon icon={faList} /> Ver sabores
                            </Dropdown.Item>
                            <Dropdown.Item href="/app/flavorTypes">
                                <FontAwesomeIcon icon={faList} /> {`Ver ${FLAVOR_TYPES_VIEW_TITLE.toLowerCase()}`}
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
                            <Dropdown.Item href={WHOLESALE_PAGE}>
                                <FontAwesomeIcon icon={faPlus} /> Venta mayorista
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
        };

        let reports;
        const permissionReports = permissions.find(option => option === "Reportes Ventas" || option === "Reportes Recursos Humanos");
        const permissionReportsSales = permissions.find(option => option === "Reportes Ventas");
        const permissionReportsHumanResources = permissions.find(option => option === "Reportes Recursos Humanos");
        if (permissionReports) {
            reports =
                <li>
                    <Dropdown>
                        <Dropdown.Toggle className="nav-dropdown">
                            Reportes
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <BeShowed show={permissionReportsSales === "Reportes Ventas"}>
                                <Dropdown.Item href="/app/salesReport">
                                    <FontAwesomeIcon icon={faFile} /> Informe de ventas
                                </Dropdown.Item>
                            </BeShowed>
                            <BeShowed show={permissionReportsHumanResources === "Reportes Recursos Humanos"}>
                                <Dropdown.Item href="/app/RRHHReport">
                                    <FontAwesomeIcon icon={faFile} /> Informe de recursos humanos
                                </Dropdown.Item>
                            </BeShowed>
                        </Dropdown.Menu>
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
                            <Dropdown.Item href="/app/salary">
                                <FontAwesomeIcon icon={faList} /> Ver salarios
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </li>
        };

        const permission = permissions.find(option => option === "Usuarios")
        let permissionsAdministrator;
        if (permission === "Usuarios") {
            permissionsAdministrator =
                <li>
                    <Dropdown>
                        <Dropdown.Toggle className="nav-dropdown">
                            Usuarios
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/app/users">
                                <FontAwesomeIcon icon={faList} /> Ver usuarios
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
                {reports}
                {purchases}
                {employees}
                {permissionsAdministrator}
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
                    <BeShowed show={cookies.get('nick_user')}>
                        <div className="li-btn-close-session">
                            <li>
                                <a className="navbar-ref" href="#"><button className="navbar-btn" onClick={signOut}>Cerrar sesión</button></a>
                            </li>
                        </div>
                    </BeShowed>
                </ul>
            </div>

            <div className="navbar-right">
                <ul>
                    <BeShowed show={cookies.get('nick_user')}>
                        <label><b className='color-blue signed-user'>{`Usuario: ${cookies.get('first_name')} ${cookies.get('last_name')}`}&nbsp;</b></label>
                        <button className="btn" onClick={signOut}><FontAwesomeIcon icon={faSignOutAlt} /></button>
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
