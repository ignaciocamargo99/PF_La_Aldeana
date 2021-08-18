import React from 'react';
import ReactDOM from 'react-dom';
import MasterView from './views/MasterView';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import combineReducers from '../src/reducers/Reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(

  <Provider store={createStore(combineReducers)}>
    <React.StrictMode >
      <div>
        <MasterView />
      </div>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

