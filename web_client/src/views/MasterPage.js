import React from 'react';
import Navbar from '../common/Navbar';
import Login from './LoginUser/Login'
import logo_expandido from '../images/logo_expandido.png'

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar options={['Inicio']} />
      </header>
      <div className="container">
        <Login imageURL={logo_expandido} text={'Iniciar Sesion'}/>
      </div>
    </div>
  );
}

