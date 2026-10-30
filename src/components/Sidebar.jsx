import './Sidebar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Heart,
  LayoutDashboard,
  LogOut,
  Package,
  Sparkles,
  Users,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const enlaces = [
  { to: '/', etiqueta: 'Resumen', icono: LayoutDashboard, end: true },
  { to: '/productos', etiqueta: 'Productos', icono: Package },
  { to: '/usuarios', etiqueta: 'Equipo', icono: Users },
  { to: '/mis-favoritos', etiqueta: 'Favoritos', icono: Heart },
];

function Sidebar({ abierto, cerrarMenu }) {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <aside className={`sidebar${abierto ? ' sidebar--abierta' : ''}`}>
      <div className="sidebar-logo">
        <div className="sidebar-marca">
          <Sparkles size={22} strokeWidth={2.4} />
        </div>
        <div>
          <h2>Atenea</h2>
          <span>Panel de control</span>
        </div>
      </div>

      <nav className="sidebar-menu" aria-label="Navegacion principal">
        <p className="sidebar-etiqueta">Menu</p>
        {enlaces.map(({ to, etiqueta, icono: Icono, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={cerrarMenu}
            className={({ isActive }) =>
              isActive ? 'menu-item activo' : 'menu-item'
            }
          >
            <Icono size={19} strokeWidth={2} />
            <span>{etiqueta}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-usuario">
          <div className="sidebar-avatar">
            {usuario?.nombre?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="sidebar-datos">
            <strong>{usuario?.nombre || 'Usuario'}</strong>
            <span>{usuario?.rol === 'admin' ? 'Administrador' : 'Usuario'}</span>
          </div>
        </div>
        <button className="btn-logout" onClick={cerrarSesion}>
          <LogOut size={18} />
          Cerrar sesion
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
