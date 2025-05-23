import React, { useState } from 'react';
import { FaSignOutAlt, FaBook } from "react-icons/fa";
import logo from "../../assets/logo.png";
import "../../styles/instructor/actaPanel.css";

const ActaPanel = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
            <button className="boton-verde" onClick={() => setDropdownOpen(!dropdownOpen)}>
              Llenar acta ▼
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-item">Acta individual</div>
                <div className="dropdown-item">Acta general</div>
              </div>
            )}
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