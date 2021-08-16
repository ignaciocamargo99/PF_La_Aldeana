import React from 'react';
import ReactDOM from 'react-dom';
import MasterView from './views/MasterView';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode >
    <div>
      <MasterView />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

