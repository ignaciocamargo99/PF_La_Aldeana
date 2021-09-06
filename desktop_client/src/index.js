import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers/Reducers';
import './index.css';
import MasterView from './views/MasterView';

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

