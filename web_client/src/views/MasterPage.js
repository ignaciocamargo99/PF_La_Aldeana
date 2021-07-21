import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Footer from '../common/Footer';
import Navbar from '../common/Navbar';
import Login from './LoginUser/Login';
import './MasterPage.css';
import RegisterProductView from './RegisterProduct/RegisterProductView';
import RegisterTypeProductView from './RegisterTypeProduct/RegisterTypeProductView';
import '../assets/Footer.css';

const App = (props) => {

  return (
      <div className="App">
        <header className="App-header">
          <Navbar options={props.permissions} />
        </header>
        <BrowserRouter>
          <div className="viewContainer">
            <Route path='/products' component={RegisterProductView}></Route>
            <Route path='/typeProducts' component={RegisterTypeProductView}></Route>
            <Route path='/index' component={Login}></Route>
          </div>
        </BrowserRouter>
        <footer className="footer text-center">
          <Footer />
        </footer>
      </div>
  );
}

const mapStateToProps = state => {
  return { permissions: state.permissions }
}

export default connect(mapStateToProps)(App);
