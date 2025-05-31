import React, { useState, useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FaSignOutAlt, FaBook } from "react-icons/fa";
import logo from "../../assets/logo.png";
import "../../styles/instructor/acta.css";

function crearFilaAprendices(tbody, index) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${index}</td>
    <td><input type="text"></td>
    <td><input type="text"></td>
    <td><input type="text"></td>
    <td><input type="text"></td>
    <td><input type="text"></td>
  `;
  tbody.appendChild(row);

  const inputs = row.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('input', () => verificarUltimaFila(input, tbody.id));
  });
}

function crearFilaEvaluacion(tbody) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><input type="text"/></td>
    <td contenteditable="true"></td>
    <td><input type="text"/></td>
    <td><input type="text"/></td>
    <td><input type="text"/></td>
  `;
  tbody.appendChild(row);

  const inputs = row.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('input', () => verificarUltimaFila(input, tbody.id));
  });
}

function verificarUltimaFila(input, tablaId) {
  const tbody = document.getElementById(tablaId);
  if (!tbody) return;
  const filas = tbody.getElementsByTagName('tr');
  const ultimaFila = filas[filas.length - 1];
  if (ultimaFila && ultimaFila.contains(input)) {
    if (tablaId === 'evaluacion') {
      crearFilaEvaluacion(tbody);
    } else {
      crearFilaAprendices(tbody, filas.length + 1);
    }
  }
}

function subirActa() {
  alert('Simulación de subida de acta. Conéctese a un backend real para almacenar el archivo.');
}

const Acta = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");
  const actaRef = useRef(null);

  useEffect(() => {
    fetch('/acta/acta.html')
      .then(res => res.text())
      .then(data => setHtmlContent(data))
      .catch(err => console.error("Error al cargar el acta:", err));
  }, []);

  useEffect(() => {
    if (htmlContent) {
      setTimeout(() => {
        const tbodyAprendices = document.getElementById('aprendices');
        const tbodyAprendices2 = document.getElementById('aprendices2');
        const tbodyEvaluacion = document.getElementById('evaluacion');

        if (tbodyAprendices && tbodyAprendices.children.length === 0) {
          crearFilaAprendices(tbodyAprendices, 1);
        }
        if (tbodyAprendices2 && tbodyAprendices2.children.length === 0) {
          crearFilaAprendices(tbodyAprendices2, 1);
        }
        if (tbodyEvaluacion && tbodyEvaluacion.children.length === 0) {
          crearFilaEvaluacion(tbodyEvaluacion);
        }
      }, 0);
    }
  }, [htmlContent]);

  const handleFillActa = () => {
    try {
      const tbodyAprendices = document.getElementById('aprendices');
      const tbodyAprendices2 = document.getElementById('aprendices2');
      const tbodyEvaluacion = document.getElementById('evaluacion');

      if (tbodyAprendices) crearFilaAprendices(tbodyAprendices, tbodyAprendices.children.length + 1);
      if (tbodyAprendices2) crearFilaAprendices(tbodyAprendices2, tbodyAprendices2.children.length + 1);
      if (tbodyEvaluacion) crearFilaEvaluacion(tbodyEvaluacion);

    } catch (error) {
      console.error("Error llenando acta:", error);
    }
  };

  const handleUploadClick = () => {
    try {
      subirActa();
      window.open('/subir-acta', '_blank');
    } catch (error) {
      console.error("Error en subirActa:", error);
    }
  };

  const handleDownloadPDF = () => {
    const input = actaRef.current;
    if (!input) {
      console.error("No se encontró el contenedor del acta.");
      return;
    }

    html2canvas(input, {
      scale: 2,
      useCORS: true,
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      const totalPages = Math.ceil(pdfHeight / pdf.internal.pageSize.getHeight());
      let position = 0;

      for (let i = 0; i < totalPages; i++) {
        if (i !== 0) pdf.addPage();
        pdf.addImage(
          imgData,
          'PNG',
          0,
          -position,
          pdfWidth,
          pdfHeight
        );
        position += pdf.internal.pageSize.getHeight();
      }

      pdf.save("acta_general.pdf");
    }).catch(err => {
      console.error("Error al generar el PDF:", err);
    });
  };

  return (
    <div className="pantalla">
      <header className="header">
        <button
          type="button"
          className="hamburguesa"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        {menuOpen && (
          <div className="menu">
            <button type="button"><FaSignOutAlt style={{ marginRight: 8 }} />Cerrar sesión</button>
            <button type="button"><FaBook style={{ marginRight: 8 }} />Manual</button>
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
            onClick={handleFillActa}
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

        <main className="panel-principal">
          <div
            id="acta"
            ref={actaRef}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
          <div>
            <button
              type="button"
              className="boton-verde boton-descargar-pdf"
              onClick={handleDownloadPDF}
            >
              Descargar
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Acta;