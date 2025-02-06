import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './vanguard/redux/store'; // Ensure correct import path

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container missing in index.html');
}

const root = ReactDOM.createRoot(container); 

root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Provide the store to the app */}
      <App />
    </Provider>
  </React.StrictMode>
);