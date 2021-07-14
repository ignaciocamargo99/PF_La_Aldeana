import React from 'react';
import Index from '../views/Index';
import RegisterProduct from './RegisterProduct/RegisterProduct';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          La Aldeana app
        </p>
        {/*<Index />*/}
        <RegisterProduct/>
      </header>
    </div>
  );
}

