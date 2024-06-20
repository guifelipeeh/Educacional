import React, { useState } from 'react';
import api from '../../services/api';
import Joi from 'joi';
import validator from 'validator';

const cadastroSchema = Joi.object({
  nome: Joi.string().min(3).max(100).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).required(),
  senha: Joi.string().min(6).max(100).required(),
  tipo: Joi.string().valid('aluno', 'professor', 'admin').required(),
  cpf: Joi.string().pattern(new RegExp(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)).required(),
  dataNascimento: Joi.date().iso().required(),
  endereco: Joi.string().min(10).max(255).required(),
  telefone: Joi.string().custom((value, helpers) => {
    if (!validator.isMobilePhone(value, 'pt-BR')) {
      return helpers.message({ message: 'Formato de telefone inválido' });
    }
    return value;
  }).required(),
});

const Register = () => {
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    senha: '',
    tipo: '',
    cpf: '',
    dataNascimento: '',
    endereco: '',
    telefone: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Validação usando Joi
      const { error } = cadastroSchema.validate(usuario, { abortEarly: false });
      if (error) {
        const validationErrors = {};
        error.details.forEach(err => {
          validationErrors[err.path[0]] = err.message;
        });
        setErrors(validationErrors);
        return;
      }

      // Reset de erros
      setErrors({});

      // Envio da requisição para o backend
      await api.post('/api/auth/register', usuario);
      alert('Registro realizado com sucesso!');
      // Redirecionamento ou outra lógica aqui após o registro
    } catch (error) {
      alert('Falha no registro. Por favor, tente novamente.');
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4 mb-4">Registrar</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome:</label>
          <input type="text" name="nome" value={usuario.nome} onChange={handleChange} className="form-control" required />
          {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input type="email" name="email" value={usuario.email} onChange={handleChange} className="form-control" required />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Senha:</label>
          <input type="password" name="senha" value={usuario.senha} onChange={handleChange} className="form-control" required />
          {errors.senha && <div className="invalid-feedback">{errors.senha}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo:</label>
          <select name="tipo" value={usuario.tipo} onChange={handleChange} className="form-select" required>
            <option value="">Selecione...</option>
            <option value="aluno">Aluno</option>
            <option value="professor">Professor</option>
            <option value="admin">Admin</option>
          </select>
          {errors.tipo && <div className="invalid-feedback">{errors.tipo}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">CPF:</label>
          <input type="text" name="cpf" value={usuario.cpf} onChange={handleChange} className="form-control" />
          {errors.cpf && <div className="invalid-feedback">{errors.cpf}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Data de Nascimento:</label>
          <input type="date" name="dataNascimento" value={usuario.dataNascimento} onChange={handleChange} className="form-control" />
          {errors.dataNascimento && <div className="invalid-feedback">{errors.dataNascimento}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Endereço:</label>
          <input type="text" name="endereco" value={usuario.endereco} onChange={handleChange} className="form-control" />
          {errors.endereco && <div className="invalid-feedback">{errors.endereco}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Telefone:</label>
          <input type="text" name="telefone" value={usuario.telefone} onChange={handleChange} className="form-control" />
          {errors.telefone && <div className="invalid-feedback">{errors.telefone}</div>}
        </div>
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
