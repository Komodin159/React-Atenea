import './TopNav.css';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingCart } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CarritoContext } from '../context/CarritoContext';

const titulos = {
  '/': 'Inicio',
  '/productos': 'Catálogo',
  '/carrito': 'Mi cotización',
  '/clientes': 'Clientes',
};

function TopNav({ abrirMenu }) {
  const { usuario } = useContext(AuthContext);
  const { cantidadTotal } = useContext(CarritoContext);
  const { pathname } = useLocation();

  const titulo = pathname.startsWith('/clientes/')
    ? 'Ficha de cliente'
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
          <span>Atenea Cycling · Performance Store</span>
          <strong>{titulo}</strong>
        </div>
      </div>

      <div className="topnav-derecha">
        <Link to="/carrito" className="cotizacion-acceso">
          <ShoppingCart size={18} />
          <span className="cotizacion-texto">Cotización</span>
          <span className="cotizacion-contador">{cantidadTotal}</span>
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
