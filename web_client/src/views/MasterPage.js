import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
import '../assets/Footer.css';
import '../assets/Forms.css';
import '../assets/Background.css';
import '../assets/Icons.css';
import '../assets/Views.css';
import BeShowed from '../common/BeShowed';
import Footer from '../common/Footer';
import Navbar from '../common/Navbar';
import SesionPage from '../common/SesionPage';
import Login from './LoginUser/Login';
import './MasterPage.css';
import RouterPage from './RoutePage';

const cookies = new Cookies();

export default function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Navbar options={cookies.get('permissions') === undefined ? ['Inicio'] : cookies.get('permissions')} />
      </header>
      <BrowserRouter>
        <div className="viewContainer">
          {(window.location.pathname === '/app/index' || window.location.pathname === '/' || window.location.pathname === '/index')
            ?
            <Route path='/' component={Login}></Route>
            :
            <>
              <BeShowed show={cookies.get('nick_user') !== undefined}>
                <RouterPage options={cookies.get('permissions')} user={cookies.get('nick_user')} accesses={cookies.get('accesses')} />
              </BeShowed>
              <BeShowed show={cookies.get('nick_user') === undefined}>
                <SesionPage />
              </BeShowed>
            </>
          }
        </div>
      </BrowserRouter>
      <footer className="footer text-center">
        <Footer />
      </footer>
    </div>
  );
}