import React from 'react';
import ReactDOM from 'react-dom';
import MasterPage from './views/MasterPage';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers/Reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <React.StrictMode >
      <MasterPage />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

