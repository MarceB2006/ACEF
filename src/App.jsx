import { Routes, Route } from 'react-router-dom';
import LoginForm from './component/Login.jsx';
import ActaPanel from './component/Instructor/actaPanel.jsx';
import Acta from './component/Instructor/acta.jsx';
import Inicio from './component/coordinación/inicio.jsx';
import Filtro from './component/coordinación/filtro.jsx';
import Resultados from './component/coordinación/resultados.jsx';
import TablaActas from './component/coordinación/actas.jsx';
import Alertas from './component/coordinación/alertas.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/instructor/actaPanel" element={<ActaPanel />} />
      <Route path="/instructor/acta" element={<Acta />} />
      <Route path="/coordinacion/inicio" element={<Inicio />} />
      <Route path="/coordinacion/filtro" element={<Filtro />} />
      <Route path="/coordinacion/resultados" element={<Resultados />} />
      <Route path="/coordinacion/actas" element={<TablaActas />} />
      <Route path="/coordinacion/alertas" element={<Alertas />} />
    </Routes>
  );
}

export default App;
