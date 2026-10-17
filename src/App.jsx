import DashboardLayout from "./layouts/DashboardLayout";
import { Routes, Route } from "react-router-dom";
import PanelGeneral from "./pages/PanelGeneral";
import Productos from "./pages/Productos";
import NotFound from "./pages/NotFound";
import UsuariosLista from "./pages/UsuariosLista";
import UsuariosDetalle from './pages/UsuariosDetalle';
<<<<<<< HEAD
import MisFavoritos from './pages/MisFavoritos';
=======
import MisFavoritos from "./pages/MisFavoritos";
>>>>>>> 5f570b0b1b76b8c54d8553a44c8ea1f061ede717

function App() {
  return(
    <Routes>
      <Route path="/" element={ <DashboardLayout /> }>
        <Route index element={ <PanelGeneral /> }/>
        <Route path="productos" element={ <Productos /> }/>
        <Route path="usuarios" element={ <UsuariosLista /> } />
        <Route path="usuarios/:id" element={ <UsuariosDetalle /> } />
        <Route path="mis-favoritos" element={ <MisFavoritos /> } />
      </Route>

      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App
