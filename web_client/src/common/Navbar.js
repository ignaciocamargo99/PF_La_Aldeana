import React from 'react';
import { connect } from 'react-redux';
import logo from '../images/logo.png';
import '../assets/Forms.css';
import BeShowed from './BeShowed';

const Navbar = (props) => {


    return(
        <nav className="navbar navbar-expand-lg navbar-light back-orange" >
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="" height="50"></img>
                    &nbsp;<b className="color-blue">La Aldeana</b>
                    </a>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {props.options.map((option,i) => {
                        return(
                            <li className="nav-item" key={i}>
                                <a className="nav-link active" href={`/${option}`}><b className="color-blue">{option}</b></a>
                            </li>)
                    })}
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
    return { user: state.user}
}

export default connect(mapStateToProps)(Navbar);
