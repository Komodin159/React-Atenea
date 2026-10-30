import { useState } from 'react';
import './DashboardLayout.css';
import Sidebar from '../components/Sidebar';
import TopNav from '../components/TopNav';
import { Outlet } from 'react-router-dom';

function DashboardLayout() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <div className={`dashboard-contenedor${menuAbierto ? ' menu-abierto' : ''}`}>
      <Sidebar abierto={menuAbierto} cerrarMenu={cerrarMenu} />
      <button
        type="button"
        className="menu-overlay"
        aria-label="Cerrar menu de navegacion"
        onClick={cerrarMenu}
      />
      <div className="dashboard-derecha">
        <TopNav abrirMenu={() => setMenuAbierto(true)} />
        <main className="dashboard-contenido">
          <div className="contenido-interno">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
