import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx'; // Note the absence of curly braces

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);