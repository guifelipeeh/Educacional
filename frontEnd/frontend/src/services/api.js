import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // O servidor retornou um código de status fora do intervalo de 2xx
      if (error.response.status === 401) {
        // Caso receba um 401, remova o token e redirecione para a página de login
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        // Aqui você pode lidar com outros erros de resposta
        // Por exemplo, exibir mensagens de erro ao usuário
        console.log('Erro na resposta:', error.response.data);
      }
    } else if (error.request) {
      // A requisição foi feita, mas não houve resposta
      console.log('Erro na requisição:', error.request);
    } else {
      // Outros erros
      console.log('Erro:', error.message);
    }
    console.log('Configuração da requisição:', error.config);
    return Promise.reject(error);
  }
);

export default api;
