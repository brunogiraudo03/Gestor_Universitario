// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';

// BORRA la línea que importaba el CSS de Bootstrap de "dist"
// import 'bootstrap/dist/css/bootstrap.min.css'; 

// AÑADE la importación a tu nuevo archivo .scss
import './styles/custom.scss'; 

import 'bootstrap/dist/js/bootstrap.bundle.min'; // El JS se mantiene igual

import App from './App.jsx';
import './index.css'; 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);