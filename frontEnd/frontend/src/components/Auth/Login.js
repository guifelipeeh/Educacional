// src/components/Auth/Login.js
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert, Nav } from 'react-bootstrap';
import api from '../../services/api';



const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    

    try {
      const response = await api.post('/api/auth/login', { email,senha});
      localStorage.setItem('token', response.data.token);
      window.location.href = '/'; // Redirecionar para a página inicial após o login bem-sucedido
    } catch (err) {
      setError('Credenciais inválidas. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    
  
    <Container className="container-fluid d-flex flex-column align-items-center justify-content-center min-vh-100 vh-100 w-100 bg-light text-light p-5 rounded shadow-lg">
    
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="p-5 mx-auto border border-transparent bg-dark rounded shadow-lg bg-opacity-30 border-opacity-50 ">
          <h1 className="text-center mb-4 text-light">Login</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant=" " type="submit" disabled={loading} className="w-100 btn btn-primary btn-lg text-light mb-3 shadow-lg bg-warning rounded text-center">
              {loading ? 'Carregando...' : 'Login'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
