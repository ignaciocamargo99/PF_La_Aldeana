import React, { useState } from 'react';
import { connect } from 'react-redux';
import logo from '../images/logo.png';
import '../assets/Navbar.css';
import BeShowed from './BeShowed';
import { Dropdown } from 'react-bootstrap';


const Navbar = (props) => {

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
                            <Dropdown.Item href="#/action-1">Tipos de producto</Dropdown.Item>
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
                <BeShowed show={props.user.nick_user !== ''}>
                    <label><b className='color-blue'>{`Usuario: ${props.user.first_name} ${props.user.last_name}`}</b></label>
                </BeShowed>
            </div>
        </nav>
    )
}

const mapStateToProps = state => {
    return { user: state.user }
}

export default connect(mapStateToProps)(Navbar);