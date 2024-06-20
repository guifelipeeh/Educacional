import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate(); // Obter a função navigate do react-router-dom

  useEffect(() => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    navigate('/login'); // Navega para a rota /login após o logout
  }, [navigate]); // Dependência para o hook useEffect

  return null; // Retorna null porque não renderiza nenhum conteúdo visível
};

export default Logout;
