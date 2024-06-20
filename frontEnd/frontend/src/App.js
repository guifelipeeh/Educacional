// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 // Se necessário, importe seus estilos adicionais
import { Container } from 'react-bootstrap'; // Exemplo de importação de componente do react-bootstrap
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Container className="py-4"> {/* Utilize o Container do react-bootstrap para alinhar o conteúdo */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          {/* Adicione outras rotas aqui */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
