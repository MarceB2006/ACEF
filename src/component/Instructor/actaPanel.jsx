import React, { useState } from 'react';
import { FaSignOutAlt, FaBook } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png";
import "../../styles/instructor/actaPanel.css";

const ActaPanel = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleUploadClick = () => {
    window.open('/subir-acta', '_blank');
  };

  return (
    <div className="pantalla">
      <header className="header">
        <button className="hamburguesa" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
        {menuOpen && (
          <div className="menu">
            <button>
              <FaSignOutAlt style={{ marginRight: "8px" }} />
              Cerrar sesión
            </button>
            <button>
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
        <div className="panel-lateral">
          <div className="dropdown">
            <button
              className="boton-verde"
              onClick={() => navigate('/Instructor/acta')}
            >
              Llenar acta 
            </button>

          </div>

          <button className="boton-verde subir" onClick={handleUploadClick}>
            Subir acta
          </button>
        </div>

        <div className="panel-principal">
          {/* Aquí se muestra el contenido del acta */}
        </div>
      </div>
    </div>
  );
};

export default ActaPanel;