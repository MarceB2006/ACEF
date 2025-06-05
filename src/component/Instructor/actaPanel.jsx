import React, { useState } from 'react';
import { FaSignOutAlt, FaBook } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png";
import "../../styles/Instructor/acta.css";

const ActaPanel = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleUploadClick = () => {
    window.open('/subir-acta', '_blank');
  };

  const handleLogout = () => {
    console.log("Cerrar sesión");
  };

  const handleManual = () => {
    console.log("Abrir manual");
  };

  return (
    <div className="pantalla">
      <header className="header">
        <button className="hamburguesa" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        {menuOpen && (
          <div className="menu">
            <button onClick={handleLogout}>
              <FaSignOutAlt style={{ marginRight: "8px" }} />
              Cerrar sesión
            </button>
            <button onClick={handleManual}>
              <FaBook style={{ marginRight: "8px" }} />
              Manual
            </button>
          </div>
        )}
        <div className="logo">
          <img src={logo} alt="Logo ACEF" className="logo-img" />
        </div>
      </header>

      <div className="contenido">
        <aside className="panel-lateral">
          <button
            type="button"
            className="boton-verde"
            onClick={() => navigate('/Instructor/acta')}
          >
            Llenar acta
          </button>
          <button
            type="button"
            className="boton-verde subir"
            onClick={handleUploadClick}
          >
            Subir acta
          </button>
        </aside>

        <div className="panel-principal">
          {/* Aquí se muestra el contenido del acta */}
        </div>
      </div>
    </div>
  );
};

export default ActaPanel;