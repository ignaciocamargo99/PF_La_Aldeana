import React from 'react';
import ReactDOM from 'react-dom';
import MasterView from './views/MasterView';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import reducers from '../src/reducers/Reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

ReactDOM.render(
  <Provider store={createStore(reducers)}>
    <React.StrictMode >
      <div>
        <MasterView />
      </div>
    </React.StrictMode>,
  </Provider>,
  document.getElementById('root')
);

