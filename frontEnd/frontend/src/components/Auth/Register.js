import React, { useState } from 'react';
import api from '../../services/api';
import Joi from 'joi';
import validator from 'validator';
import MaskedInput from 'react-text-mask';
import '../../styles/register.css';

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
      return helpers.message('Formato de telefone inválido');
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
      const { error } = cadastroSchema.validate(usuario, { abortEarly: false });
      if (error) {
        const validationErrors = {};
        error.details.forEach(err => {
          validationErrors[err.path[0]] = err.message;
        });
        setErrors(validationErrors);
        return;
      }

      setErrors({});

      console.log("Enviando dados: ", usuario);
      await api.post('/api/auth/register', usuario);
      alert('Registro realizado com sucesso!');
    } catch (error) {
      console.error("Erro ao registrar: ", error);
      alert('Falha no registro. Por favor, tente novamente.');
    }
  };

  return (
    <div className='container-fluid' id="register"><div className="container text-muted mt-5 p-2 w-50 "  >
      <div className="row justify-content-center shadow-lg p-3 mb-5 bg-white rounded">
        <h2 className="mt-4 mb-4 text-center">Registrar</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nome:</label>
            <input type="text" name="nome" value={usuario.nome} onChange={handleChange} className={`form-control ${errors.nome ? 'is-invalid' : ''}`} required />
            {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input type="email" name="email" value={usuario.email} onChange={handleChange} className={`form-control ${errors.email ? 'is-invalid' : ''}`} required />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Senha:</label>
            <input type="password" name="senha" value={usuario.senha} onChange={handleChange} className={`form-control ${errors.senha ? 'is-invalid' : ''}`} required />
            {errors.senha && <div className="invalid-feedback">{errors.senha}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Tipo:</label>
            <select name="tipo" value={usuario.tipo} onChange={handleChange} className={`form-select ${errors.tipo ? 'is-invalid' : ''}`} required>
              <option value="">Selecione...</option>
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
              <option value="admin">Admin</option>
            </select>
            {errors.tipo && <div className="invalid-feedback">{errors.tipo}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">CPF:</label>
            <MaskedInput
              mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
              guide={false}
              name="cpf"
              value={usuario.cpf}
              onChange={handleChange}
              className={`form-control ${errors.cpf ? 'is-invalid' : ''}`}
              required />
            {errors.cpf && <div className="invalid-feedback">{errors.cpf}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Data de Nascimento:</label>
            <input type="date" name="dataNascimento" value={usuario.dataNascimento} onChange={handleChange} className={`form-control ${errors.dataNascimento ? 'is-invalid' : ''}`} required />
            {errors.dataNascimento && <div className="invalid-feedback">{errors.dataNascimento}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Endereço:</label>
            <input type="text" name="endereco" value={usuario.endereco} onChange={handleChange} className={`form-control ${errors.endereco ? 'is-invalid' : ''}`} required />
            {errors.endereco && <div className="invalid-feedback">{errors.endereco}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Telefone:</label>
            <MaskedInput
              mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
              guide={false}
              name="telefone"
              value={usuario.telefone}
              onChange={handleChange}
              className={`form-control ${errors.telefone ? 'is-invalid' : ''}`}
              required />
            {errors.telefone && <div className="invalid-feedback">{errors.telefone}</div>}
          </div>
          <button type="submit" className="btn btn-dark">Registrar</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Register;
