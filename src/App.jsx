import DashboardLayout from './layouts/DashboardLayout';
import { Routes, Route } from 'react-router-dom';
import PanelGeneral from './pages/PanelGeneral';
import Productos from './pages/Productos';
import NotFound from './pages/NotFound';
import UsuariosLista from './pages/UsuariosLista';
import UsuariosDetalle from './pages/UsuariosDetalle';
import MisFavoritos from './pages/MisFavoritos';
import Login from './pages/Login';
import Registro from './pages/Registro';
import RutaProtegida from './components/RutaProtegida';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      <Route element={<RutaProtegida />}>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<PanelGeneral />} />
          <Route path="productos" element={<Productos />} />
          <Route path="usuarios" element={<UsuariosLista />} />
          <Route path="usuarios/:id" element={<UsuariosDetalle />} />
          <Route path="mis-favoritos" element={<MisFavoritos />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
