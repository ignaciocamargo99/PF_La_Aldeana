import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from '../common/Navbar';
import logo_expandido from '../images/logo_expandido.png';
import Login from './LoginUser/Login';
import './MasterPage.css';
import RegisterProductView from './RegisterProduct/RegisterProductView';

const App = (props) => {

  return (
      <div className="App">
        <header className="App-header">
          <Navbar options={props.permissions} />
        </header>
        <BrowserRouter>
          <div className="viewContainer">
            <Route path='/products' component={RegisterProductView}></Route>
          </div>
          <div className="container">
            <Route path='/index' component={Login}></Route>
          </div>
        </BrowserRouter>
      </div>
  );
}

const mapStateToProps = state => {
  return { permissions: state.permissions }
}

export default connect(mapStateToProps)(App);
