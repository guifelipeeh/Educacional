// src/components/Auth/UploadTest.js
import React, { useState } from 'react';
import axios from 'axios';

const UploadTest = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadType, setUploadType] = useState('profile-picture');
  const [response, setResponse] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadTypeChange = (e) => {
    setUploadType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Por favor, selecione um arquivo para fazer upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const token = 'your_jwt_token_here'; // Substitua pelo seu token de autenticação
      const endpoint = `http://localhost:3001/api/uploads/${uploadType}`;

      const res = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      setResponse(res.data);
    } catch (err) {
      console.error('Erro ao fazer upload:', err);
    }
  };

  return (
    <div>
      <h2>Upload de Arquivo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Selecione um arquivo:</label>
          <input type="file" id="file" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="uploadType">Tipo de Upload:</label>
          <select id="uploadType" value={uploadType} onChange={handleUploadTypeChange}>
            <option value="profile-picture">Foto de Perfil</option>
            <option value="document">Documento</option>
          </select>
        </div>
        <button type="submit">Fazer Upload</button>
      </form>
      {response && <div>{JSON.stringify(response)}</div>}
    </div>
  );
};

export default UploadTest;
