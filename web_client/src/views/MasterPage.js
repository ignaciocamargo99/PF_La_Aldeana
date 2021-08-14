import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Footer from '../common/Footer';
import Navbar from '../common/Navbar';
import Login from './LoginUser/Login';
import './MasterPage.css';
import RegisterProductView from './RegisterProduct/RegisterProductView';
import RegisterTypeProductView from './RegisterTypeProduct/RegisterTypeProductView';
import '../assets/Footer.css';
import Cookies from 'universal-cookie';
import BeShowed from '../common/BeShowed';
import ListProducts from './ListProducts/ListProducts';
import RegisterFranchise from './RegisterFranchise/RegisterFranchise';

const cookies = new Cookies();

export default function App(props) {

  return (
    <div className="App">
      <header className="App-header">
        <Navbar options={cookies.get('permissions') === undefined ? ['Inicio'] : cookies.get('permissions')} />
      </header>
      <BrowserRouter>
        <div className="viewContainer">
          <BeShowed show={cookies.get('nick_user') !== undefined}>
            <Route path='/app/registerProducts' component={RegisterProductView}></Route>
            <Route path='/app/typeProducts' component={RegisterTypeProductView}></Route>
            <Route path='/app/products' component={ListProducts}></Route>
            <Route path='/app/franchise' component={RegisterFranchise}></Route>
          </BeShowed>
          <Route path='/app/index' component={Login}></Route>
        </div>
      </BrowserRouter>
      <footer className="footer text-center">
        <Footer />
      </footer>
    </div>
  );
}
