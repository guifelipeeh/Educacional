// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap'; 
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Register from './components/Auth/Register';
import UploadTest from './components/Auth/UploadTest';
import profile from './pages/Profile';
import './styles/App.css';


function App() {
  return (
    <Router>
      <Container fluid className="py-5 vh-100"> {/* Adicione o fluid para ocupar toda a tela */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/uploadTest" element={<UploadTest />} />
          <Route path="/profile" element={<profile />} />
          {/* Adicione outras rotas aqui */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
