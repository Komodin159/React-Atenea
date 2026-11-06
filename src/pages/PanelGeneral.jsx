import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Heart,
  Package,
  Sparkles,
  Users,
  Wallet,
} from 'lucide-react';
import RelojDigital from '../components/RelojDigital';
import clienteAxios from '../api/clienteAxios';
import { useAuth } from '../context/AuthContext';
import { FavoritosContext } from '../context/FavoritosContext';
import './PanelGeneral.css';

const accesos = [
  {
    to: '/productos',
    icono: Package,
    titulo: 'Productos',
    descripcion: 'Administra la carta y el inventario.',
  },
  {
    to: '/clientes',
    icono: Users,
    titulo: 'Clientes',
    descripcion: 'Consulta y registra cuentas de clientes.',
  },
  {
    to: '/mis-favoritos',
    icono: Heart,
    titulo: 'Favoritos',
    descripcion: 'Revisa los productos que guardaste.',
  },
];

export default function PanelGeneral() {
  const { usuario, logout } = useAuth();
  const { favoritos } = useContext(FavoritosContext);
  const navigate = useNavigate();
  const [resumen, setResumen] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;

    const cargarResumen = async () => {
      try {
        const { data } = await clienteAxios.get('/productos/resumen');

        if (activo) {
          setResumen(data);
        }
      } catch (err) {
        if (!activo) {
          return;
        }

        if (err.response?.status === 401) {
          logout();
          navigate('/login', { replace: true });
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    cargarResumen();

    return () => {
      activo = false;
    };
  }, [logout, navigate]);

  const primerNombre = usuario?.nombre?.split(' ')[0] || 'bienvenido';
  const fecha = new Date().toLocaleDateString('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const valorInventario = Number(resumen?.valorInventario || 0).toLocaleString(
    'es-CO',
  );

  return (
    <div className="pagina resumen">
      <section className="resumen-hero">
        <div className="resumen-hero-texto">
          <span className="resumen-eyebrow">
            <Sparkles size={15} />
            Tu espacio de trabajo
          </span>
          <h1>Hola, {primerNombre}</h1>
          <p>
            Este es el resumen de Atenea. Revisa las métricas de la carta,
            administra el inventario y mantén tus clientes bajo control desde un
            solo lugar.
          </p>
          <span className="resumen-fecha">
            <CalendarDays size={16} />
            {fecha}
          </span>
        </div>

        <div className="resumen-hero-acciones">
          <Link to="/productos" className="hero-boton hero-boton--claro">
            Gestionar productos
            <ArrowRight size={17} />
          </Link>
          <Link to="/clientes" className="hero-boton hero-boton--fantasma">
            Ver clientes
            <Users size={17} />
          </Link>
        </div>
      </section>

      <div className="resumen-metricas">
        <section className="tarjeta-metrica">
          <div className="metrica-cabecera">
            <div className="metrica-icono">
              <Package size={21} />
            </div>
            <div>
              <span className="metrica-etiqueta">Productos en carta</span>
              <strong className="metrica-valor">
                {cargando ? '...' : resumen?.total ?? 0}
              </strong>
            </div>
          </div>
          <Link to="/productos" className="enlace-metrica">
            Abrir inventario
            <ArrowUpRight size={15} />
          </Link>
        </section>

        <section className="tarjeta-metrica tarjeta-alerta">
          <div className="metrica-cabecera">
            <div className="metrica-icono metrica-icono--alerta">
              <AlertTriangle size={21} />
            </div>
            <div>
              <span className="metrica-etiqueta">Stock bajo</span>
              <strong className="metrica-valor">
                {cargando ? '...' : resumen?.stockBajo ?? 0}
              </strong>
            </div>
          </div>
          <p className="metrica-detalle">
            Productos con 5 unidades o menos. Repón antes del próximo servicio.
          </p>
        </section>

        <section className="tarjeta-metrica">
          <div className="metrica-cabecera">
            <div className="metrica-icono metrica-icono--dinero">
              <Wallet size={21} />
            </div>
            <div>
              <span className="metrica-etiqueta">Valor del inventario</span>
              <strong className="metrica-valor metrica-valor--moneda">
                ${cargando ? '...' : valorInventario}
              </strong>
            </div>
          </div>
          <p className="metrica-detalle">Precio por unidad × stock disponible.</p>
        </section>

        <section className="tarjeta-metrica tarjeta-favoritos">
          <div className="metrica-cabecera">
            <div className="metrica-icono metrica-icono--favoritos">
              <Heart size={21} />
            </div>
            <div>
              <span className="metrica-etiqueta">Favoritos guardados</span>
              <strong className="metrica-valor">{favoritos.length}</strong>
            </div>
          </div>
          <Link to="/mis-favoritos" className="enlace-metrica">
            Abrir lista
            <ArrowUpRight size={15} />
          </Link>
        </section>

        <RelojDigital />
      </div>

      <section className="resumen-seccion">
        <div className="seccion-cabecera">
          <div>
            <span className="pagina-eyebrow">Atajos</span>
            <h2>Todo a un clic</h2>
            <p>Las secciones que más vas a usar, siempre a mano.</p>
          </div>
        </div>

        <div className="accesos-grid">
          {accesos.map(({ to, icono: Icono, titulo, descripcion }) => (
            <Link key={to} to={to} className="acceso-card">
              <div className="acceso-icono">
                <Icono size={20} />
              </div>
              <div className="acceso-texto">
                <strong>{titulo}</strong>
                <span>{descripcion}</span>
              </div>
              <ArrowUpRight size={17} className="acceso-flecha" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
