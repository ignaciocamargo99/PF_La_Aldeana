import React from 'react';
import RegisterProductView from './RegisterProduct/RegisterProductView';
import './MasterPage.css';
import Navbar from '../common/Navbar';
import Login from './LoginUser/Login';
import { connect } from 'react-redux';
import logo_expandido from '../images/logo_expandido.png'

const App = (props) => {

  return (
    <div className="App">
      <header className="App-header">
        <Navbar options={props.permissions} />
      </header>
      <div className="viewContainer">
        <RegisterProductView />
      </div> 
      {/* <div className="container">
        <Login imageURL={logo_expandido} text={'Iniciar Sesion'} />
      </div> */}
    </div>
  );
}

const mapStateToProps = state => {
  return { permissions: state.permissions }
}

export default connect(mapStateToProps)(App);
