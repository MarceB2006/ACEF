import React, { useState } from 'react';
import '../styles/LoginForm.css';
import logo from '../assets/logo.png';

function LoginForm() {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Iniciar sesión con:', { role, username, password });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-img" />
          </div>
        <h2 className="title">Iniciar sesión</h2>
        <div className="input-group1">
          <label htmlFor="role" className="label">Rol</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="select">

            <option value="">Seleccionar rol</option>
            <option value="instructor">Instructor</option>
            <option value="coordinador">Coordinador / Coordinación</option>
          </select>
        </div>
        <div className="input-group2">
          <label htmlFor="usuario" className="label">Usuario</label>
          <input
            type="text"
            id="usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
        </div>
        <div className="input-group3">
          <label htmlFor="contrasena" className="label">Contraseña</label>
          <input
            type="password"
            id="contrasena"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>
        <button type="submit" onClick={handleSubmit} className="button">
          Ingresar
        </button>
      </div>
    </div>
  );
}

export default LoginForm;