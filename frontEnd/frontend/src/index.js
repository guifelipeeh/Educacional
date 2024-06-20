// Importações necessárias
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importação do CSS do Bootstrap
import './styles/index.css'; // Seu arquivo de estilo personalizado
import reportWebVitals from './reportWebVitals';

// Criação do root do ReactDOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Reporta as métricas de performance
reportWebVitals();
