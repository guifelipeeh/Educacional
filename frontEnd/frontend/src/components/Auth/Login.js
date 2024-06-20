import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Substituindo useHistory por useNavigate

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('api/auth/Login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/profile');  // Substituindo history.push por navigate
    } catch (error) {
      alert('Login falhou. Por favor, verifique suas credenciais e tente novamente.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Senha:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Entrar</button>
    </form>
  );
};

export default Login;
