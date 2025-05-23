import React, { useState, useRef } from 'react';
import { FaSignOutAlt, FaBook } from "react-icons/fa";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from "../../assets/logo.png";
import logoSena from "../../assets/senaLogo.webp"
import "../../styles/instructor/acta.css";

const Acta = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [nombreComite, setNombreComite] = useState("");
  const [ciudadFecha, setCiudadFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [direccionCentro, setDireccionCentro] = useState("");
  const [agenda, setAgenda] = useState("");
  const [objetivos, setObjetivos] = useState("");
  const [aprendicesTotales, setAprendicesTotales] = useState("");
  const [conclusiones, setConclusiones] = useState("");
  const [actaNumero, setActaNumero] = useState("");
  const [anexos, setAnexos] = useState("");


  const [planMejoramiento, setPlanMejoramiento] = useState("");
  const [novedades, setNovedades] = useState("");
  const actaRef = useRef();

 
  const year = new Date().getFullYear();

  // Estados para las tablas dinámicas
  // Tabla general aprendices (solo filas editables simples)
  const [aprendicesGenerales, setAprendicesGenerales] = useState([
    { tipoDocumento: "", numeroDocumento: "", nombre: "", apellidos: "", estado: "" }
  ]);

  // Tabla filtrada aprendices
  const [aprendicesFiltrados, setAprendicesFiltrados] = useState([
    { tipoDocumento: "", numeroDocumento: "", nombre: "", apellidos: "", estado: "" }
  ]);

  // Tabla instructores
  const [instructores, setInstructores] = useState([
    { instructor: "", tematica: "", competencia: "", resultado: "", numeroEvaluados: "" }
  ]);

  // Tabla compromisos
  const [compromisos, setCompromisos] = useState([
    { actividad: "", fecha: "", responsable: "", firma: "" }
  ]);

  // Tabla asistentes
  const [asistentes, setAsistentes] = useState([
    { nombre: "", dependencia: "", aprueba: "", observacion: "", firmaVirtual: "" }
  ]);

  // Funciones para manejar inputs en tablas y agregar filas:
  const handleChangeAprendizGeneral = (index, field, value) => {
    const nuevos = [...aprendicesGenerales];
    nuevos[index][field] = value;
    setAprendicesGenerales(nuevos);
  };
  const agregarFilaAprendizGeneral = () => {
    setAprendicesGenerales([...aprendicesGenerales, { tipoDocumento: "", numeroDocumento: "", nombre: "", apellidos: "", estado: "" }]);
  };

  const handleChangeAprendizFiltrado = (index, field, value) => {
    const nuevos = [...aprendicesFiltrados];
    nuevos[index][field] = value;
    setAprendicesFiltrados(nuevos);
  };
  const agregarFilaAprendizFiltrado = () => {
    setAprendicesFiltrados([...aprendicesFiltrados, { tipoDocumento: "", numeroDocumento: "", nombre: "", apellidos: "", estado: "" }]);
  };

  const handleChangeInstructor = (index, field, value) => {
    const nuevos = [...instructores];
    nuevos[index][field] = value;
    setInstructores(nuevos);
  };
  const agregarFilaInstructor = () => {
    setInstructores([...instructores, { instructor: "", tematica: "", competencia: "", resultado: "", numeroEvaluados: "" }]);
  };

  const handleChangeCompromiso = (index, field, value) => {
    const nuevos = [...compromisos];
    nuevos[index][field] = value;
    setCompromisos(nuevos);
  };
  const agregarFilaCompromiso = () => {
    setCompromisos([...compromisos, { actividad: "", fecha: "", responsable: "", firma: "" }]);
  };

  const handleChangeAsistente = (index, field, value) => {
    const nuevos = [...asistentes];
    nuevos[index][field] = value;
    setAsistentes(nuevos);
  };
  const agregarFilaAsistente = () => {
    setAsistentes([...asistentes, { nombre: "", dependencia: "", aprueba: "", observacion: "", firmaVirtual: "" }]);
  };

  const handleUploadClick = () => {
    window.open('/subir-acta', '_blank');
  };

  const handleDownloadPDF = () => {
    const input = actaRef.current;
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("acta_general.pdf");
    });
  };


  return (
    <div className="pantalla">
      <header className="header">
        <button className="hamburguesa" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        {menuOpen && (
          <div className="menu">
            <button><FaSignOutAlt style={{ marginRight: "8px" }} />Cerrar sesión</button>
            <button><FaBook style={{ marginRight: "8px" }} />Manual</button>
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
            <div  ref={actaRef} className="acta-word">
              <div className="logo-sena">
                <img src={logoSena} alt="logoSena" />
              </div>

              <table>
                <tbody>
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                      ACTA No. <input type="text" className="campo-acta" value={actaNumero} onChange={(e) => setActaNumero(e.target.value)} style={{ width: 40, textAlign: 'center' }} />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="4">NOMBRE DEL COMITÉ O DE LA REUNIÓN: <input type="text" className="campo-acta" value={nombreComite} onChange={(e) => setNombreComite(e.target.value)} /></td>
                  </tr>
                  <tr>
                    <td>CIUDAD Y FECHA: <input type="text" className="campo-acta" value={ciudadFecha} onChange={(e) => setCiudadFecha(e.target.value)} /></td>
                    <td>HORA INICIO: <input type="text" className="campo-acta" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} /></td>
                    <td>HORA FIN: <input type="text" className="campo-acta" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} /></td>
                  </tr>
                  <tr>
                    <td>LUGAR Y/O ENLACE: BOGOTÁ</td>
                    <td colSpan="3">DIRECCIÓN / REGIONAL / CENTRO: <input type="text" className="campo-acta" value={direccionCentro} onChange={(e) => setDireccionCentro(e.target.value)} /></td>
                  </tr>
                </tbody>
              </table>

              <h2>Información General</h2>
              <table>
                <tbody>
                  <tr><td colSpan="3">AGENDA O PUNTOS PARA DESARROLLAR:</td></tr>
                  <tr><td colSpan="3"><textarea className="campo-acta" rows="3" value={agenda} onChange={(e) => setAgenda(e.target.value)} placeholder="Describe los temas a tratar..." /></td></tr>
                  <tr><td colSpan="3">OBJETIVO(S) DE LA REUNIÓN:</td></tr>
                  <tr><td colSpan="3"><textarea className="campo-acta" rows="3" value={objetivos} onChange={(e) => setObjetivos(e.target.value)} placeholder="Describe el objetivo de la reunión..." /></td></tr>
                </tbody>
              </table>

              <h2>Desarrollo de la Reunión</h2>
              <p>Con el fin de identificar las novedades de los aprendices...</p>

              {/* Tabla general aprendices */}
              <table>
                <thead>
                  <tr>
                    <th>N°</th>
                    <th>Tipo de Documento</th>
                    <th>Número de Documento</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {aprendicesGenerales.map((row, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td><input type="text" className="campo-acta" value={row.tipoDocumento} onChange={(e) => handleChangeAprendizGeneral(i, 'tipoDocumento', e.target.value)} /></td>
                      <td><input type="text" className="campo-acta" value={row.numeroDocumento} onChange={(e) => handleChangeAprendizGeneral(i, 'numeroDocumento', e.target.value)} /></td>
                      <td><input type="text" className="campo-acta" value={row.nombre} onChange={(e) => handleChangeAprendizGeneral(i, 'nombre', e.target.value)} /></td>
                      <td><input type="text" className="campo-acta" value={row.apellidos} onChange={(e) => handleChangeAprendizGeneral(i, 'apellidos', e.target.value)} /></td>
                      <td><input type="text" className="campo-acta" value={row.estado} onChange={(e) => handleChangeAprendizGeneral(i, 'estado', e.target.value)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="boton-pequeno" onClick={agregarFilaAprendizGeneral} title="Agregar fila">+</button>

              <p>
                1. Se revisan los aprendices que una vez finalizado el trimestre continúan asistiendo a la formación, el total de aprendices es 
                <input type="number" className="campo-acta" value={aprendicesTotales} onChange={(e) => setAprendicesTotales(e.target.value)} style={{ width: 65, textAlign: 'center' }} />, los cuales se relacionan alfabéticamente por nombre a continuación:
              </p>

              {/* Tabla filtrada aprendices */}
              <table>
                <thead>
                  <tr>
                    <th>N°</th>
                    <th>Tipo de Documento</th>
                    <th>Número de Documento</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Estado</th>
                  </tr>
                </thead> 
                <tbody>
                  {aprendicesFiltrados.map((row, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td><input type="text" className="campo-acta" value={row.tipoDocumento} onChange={(e) => handleChangeAprendizFiltrado(i, 'tipoDocumento', e.target.value)} /></td>
                      <td><input type="text" className="campo-acta" value={row.numeroDocumento} onChange={(e) => handleChangeAprendizFiltrado(i, 'numeroDocumento', e.target.value)} /></td>
                      <td><input type="text" className="campo-acta" value={row.nombre} onChange={(e) => handleChangeAprendizFiltrado(i, 'nombre', e.target.value)} /></td>
                      <td><input type="text" className="campo-acta" value={row.apellidos} onChange={(e) => handleChangeAprendizFiltrado(i, 'apellidos', e.target.value)} /></td>
                      <td><input type="text" className="campo-acta" value={row.estado} onChange={(e) => handleChangeAprendizFiltrado(i, 'estado', e.target.value)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="boton-pequeno" onClick={agregarFilaAprendizGeneral} title="Agregar fila">+</button>

              <h2>Evaluación Trimestral</h2>
              <p>Los Instructores encargados de evaluar los resultados de aprendizaje durante el I Trimestre de {year}, son:</p>
              <table>
                <thead>
                  <tr>
                    <th>Instructor</th>
                    <th>Temática</th>
                    <th>Competencia</th>
                    <th>Resultado de Aprendizaje</th>
                    <th>Número Aprendices Evaluados</th>
                  </tr>
                </thead>
                <tbody>
                  {instructores.map((row, i) => (
                    <tr key={i}>
                      <td><input className="campo-acta" type="text" value={row.instructor} onChange={(e) => handleChangeInstructor(i, 'instructor', e.target.value)} /></td>
                      <td><input className="campo-acta" type="text" value={row.tematica} onChange={(e) => handleChangeInstructor(i, 'tematica', e.target.value)} /></td>
                      <td><input className="campo-acta" type="text" value={row.competencia} onChange={(e) => handleChangeInstructor(i, 'competencia', e.target.value)} /></td>
                      <td><input className="campo-acta" type="text" value={row.resultado} onChange={(e) => handleChangeInstructor(i, 'resultado', e.target.value)} /></td>
                      <td><input className="campo-acta" type="number" value={row.numeroEvaluados} onChange={(e) => handleChangeInstructor(i, 'numeroEvaluados', e.target.value)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="boton-pequeno" onClick={agregarFilaAprendizGeneral} title="Agregar fila">+</button>

              <h2>Compromisos</h2>
              <table>
                <thead>
                  <tr>
                    <th>Actividad</th>
                    <th>Fecha</th>
                    <th>Responsable</th>
                    <th>Firma</th>
                  </tr>
                </thead>
                <tbody>
                  {compromisos.map((row, i) => (
                    <tr key={i}>
                      <td><input className="campo-acta" type="text" value={row.actividad} onChange={(e) => handleChangeCompromiso(i, 'actividad', e.target.value)} /></td>
                      <td><input className="campo-acta" type="date" value={row.fecha} onChange={(e) => handleChangeCompromiso(i, 'fecha', e.target.value)} /></td>
                      <td><input className="campo-acta" type="text" value={row.responsable} onChange={(e) => handleChangeCompromiso(i, 'responsable', e.target.value)} /></td>
                      <td><input className="campo-acta" type="text" value={row.firma} onChange={(e) => handleChangeCompromiso(i, 'firma', e.target.value)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="boton-pequeno" onClick={agregarFilaAprendizGeneral} title="Agregar fila">+</button>

              <h2>Asistentes</h2>
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Dependencia</th>
                    <th>Aprueba</th>
                    <th>Observación</th>
                    <th>Firma virtual</th>
                  </tr>
                </thead>
                <tbody>
                  {asistentes.map((row, i) => (
                    <tr key={i}>
                      <td><input className="campo-acta" type="text" value={row.nombre} onChange={(e) => handleChangeAsistente(i, 'nombre', e.target.value)} /></td>
                      <td><input className="campo-acta" type="text" value={row.dependencia} onChange={(e) => handleChangeAsistente(i, 'dependencia', e.target.value)} /></td>
                      <td><input className="campo-acta" type="text" value={row.aprueba} onChange={(e) => handleChangeAsistente(i, 'aprueba', e.target.value)} /></td>
                      <td><input className="campo-acta" type="text" value={row.observacion} onChange={(e) => handleChangeAsistente(i, 'observacion', e.target.value)} /></td>
                      <td><input className="campo-acta" type="text" value={row.firmaVirtual} onChange={(e) => handleChangeAsistente(i, 'firmaVirtual', e.target.value)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="boton-pequeno" onClick={agregarFilaAprendizGeneral} title="Agregar fila">+</button>

              <h2>Conclusiones</h2>
              <textarea className="campo-acta" rows="3" value={conclusiones} onChange={(e) => setConclusiones(e.target.value)} />

              <h2>Plan de Mejoramiento</h2>
              <textarea className="campo-acta" rows="3" value={planMejoramiento} onChange={(e) => setPlanMejoramiento(e.target.value)} />

              <h2>Novedades</h2>
              <textarea className="campo-acta" rows="3" value={novedades} onChange={(e) => setNovedades(e.target.value)} />

              <section className="proteccion-datos">
                <p>
                  De acuerdo con la Ley 1581 de 2012, Protección de Datos Personales, el SENA se compromete a garantizar la seguridad
                  y tratamiento adecuado de los datos personales contenidos en este documento.
                </p>
              </section>

              <footer>
                <h2>Anexos</h2>
                  <p>Si existen documentos o evidencias adicionales, descríbalos a continuación:</p>
                  <textarea
                    className="campo-acta"
                    rows="4"
                    value={anexos}
                    onChange={(e) => setAnexos(e.target.value)}
                    placeholder="Describa los anexos, documentos o evidencias que complementan el acta..."
                  />

              </footer>
            </div>

            {/* Botón de descargar PDF fijo */}
            <div>
              <button className="boton-verde boton-descargar-pdf" onClick={handleDownloadPDF}>Descargar</button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Acta;