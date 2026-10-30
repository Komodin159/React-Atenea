import './TopNav.css';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { FavoritosContext } from '../context/FavoritosContext';

const titulos = {
  '/': 'Resumen',
  '/productos': 'Productos',
  '/usuarios': 'Equipo',
  '/mis-favoritos': 'Favoritos',
};

function TopNav({ abrirMenu }) {
  const { usuario } = useContext(AuthContext);
  const { favoritos } = useContext(FavoritosContext);
  const { pathname } = useLocation();

  const titulo = pathname.startsWith('/usuarios/')
    ? 'Detalle de usuario'
    : titulos[pathname] || 'Panel de control';

  return (
    <header className="topnav">
      <div className="topnav-izquierda">
        <button
          type="button"
          className="menu-toggle"
          onClick={abrirMenu}
          aria-label="Abrir menu de navegacion"
        >
          <Menu size={22} />
        </button>
        <div className="topnav-contexto">
          <span>Panel de control</span>
          <strong>{titulo}</strong>
        </div>
      </div>

      <div className="topnav-derecha">
        <Link to="/mis-favoritos" className="favoritos-acceso">
          <Heart size={18} />
          <span className="favoritos-texto">Favoritos</span>
          <span className="favoritos-contador">{favoritos.length}</span>
        </Link>

        {usuario && (
          <div className="perfil-usuario">
            <div className="avatar">{usuario.nombre.charAt(0).toUpperCase()}</div>
            <div className="usuario-texto">
              <strong>{usuario.nombre}</strong>
              <span>{usuario.rol === 'admin' ? 'Administrador' : 'Usuario'}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default TopNav;
