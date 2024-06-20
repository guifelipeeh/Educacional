# Educacional
EducacionalAPP
Descrição
EducacionalAPP é uma aplicação web educacional desenvolvida para gerenciar usuários, incluindo alunos, professores e administradores. Este projeto utiliza Node.js com Express no backend, Sequelize para ORM, e React no frontend.

Funcionalidades
Registro de usuários com diferentes tipos (aluno, professor, admin).
Autenticação e autorização de usuários.
Validação de dados do usuário no frontend e backend.
Interface de usuário responsiva utilizando Bootstrap.
Estrutura do Projeto
arduino
Copiar código
EducacionalAPP/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── configurations/
│   ├── services/
│   ├── server.js
│   └── ...
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   └── ...
└── README.md
Pré-requisitos
Node.js
npm ou yarn
MySQL
Instalação
Backend
Clone o repositório:

bash
Copiar código
git clone https://github.com/seu-usuario/EducacionalAPP.git
cd EducacionalAPP/backend
Instale as dependências:

bash
Copiar código
npm install
Configure o banco de dados MySQL:

Crie um banco de dados chamado educacionalapp.
Configure as credenciais do banco de dados no arquivo configurations/DataBaseConfig.js.
Execute as migrações:

bash
Copiar código
npx sequelize db:migrate
Inicie o servidor:

bash
Copiar código
npm start
Frontend
Vá para o diretório do frontend:

bash
Copiar código
cd ../frontend
Instale as dependências:

bash
Copiar código
npm install
Inicie o servidor de desenvolvimento:

bash
Copiar código
npm start
Endpoints da API
Autenticação
POST /api/auth/register: Registra um novo usuário.
POST /api/auth/login: Autentica um usuário e retorna um token JWT.
Usuários
GET /api/users: Lista todos os usuários (apenas para administradores).
GET /api/users/:id: Obtém detalhes de um usuário específico.
PUT /api/users/:id: Atualiza os dados de um usuário.
DELETE /api/users/:id: Exclui um usuário.
Validação
A validação dos dados é realizada tanto no frontend quanto no backend. No backend, utilizamos Joi para validar os dados no middleware. No frontend, utilizamos Joi e validator para garantir que os dados sejam inseridos corretamente pelos usuários.

Exemplo de Requisição JSON
json
Copiar código
{
  "nome": "Guilherme Felipe de Assis Andrade",
  "email": "guifelipesis@gmail.com",
  "senha": "12345678",
  "tipo": "admin",
  "cpf": "450.782.668-31",
  "dataNascimento": "1995-12-13",
  "endereco": "Rua dos Professores, 123",
  "telefone": "(11) 98765-4321"
}
Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

Faça um fork do projeto.
Crie uma nova branch para sua feature ou correção (git checkout -b feature/nova-feature).
Faça commit das suas alterações (git commit -m 'Adiciona nova feature').
Envie para a branch original (git push origin feature/nova-feature).
Abra um pull request.
Licença
Este projeto está licenciado sob a MIT License.
