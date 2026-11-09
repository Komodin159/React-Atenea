import DashboardLayout from './layouts/DashboardLayout';
import { Routes, Route } from 'react-router-dom';
import PanelGeneral from './pages/PanelGeneral';
import Productos from './pages/Productos';
import NotFound from './pages/NotFound';
import Clientes from './pages/Clientes';
import ClienteDetalle from './pages/ClienteDetalle';
import DetalleBicicleta from './pages/DetalleBicicleta';
import Carrito from './pages/Carrito';
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
          <Route path="bicicletas/:id" element={<DetalleBicicleta />} />
          <Route path="carrito" element={<Carrito />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="clientes/:id" element={<ClienteDetalle />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
