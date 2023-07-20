import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

const root = document.getElementById('root');
const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.createRoot(root).render(app);
