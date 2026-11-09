import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  ShoppingCart,
  Package,
  Sparkles,
  Users,
  Wallet,
} from 'lucide-react';
import clienteAxios from '../api/clienteAxios';
import { useAuth } from '../context/AuthContext';
import { CarritoContext } from '../context/CarritoContext';
import './PanelGeneral.css';

const accesos = [
  {
    to: '/productos',
    icono: Package,
    titulo: 'Catálogo',
    descripcion: 'Explora bicicletas de alto rendimiento.',
  },
  {
    to: '/clientes',
    icono: Users,
    titulo: 'Clientes',
    descripcion: 'Consulta y registra cuentas de clientes.',
  },
  {
    to: '/carrito',
    icono: ShoppingCart,
    titulo: 'Mi cotización',
    descripcion: 'Revisa las bicicletas seleccionadas.',
  },
];

export default function PanelGeneral() {
  const { usuario, logout } = useAuth();
  const { cantidadTotal } = useContext(CarritoContext);
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
            Descubre bicicletas premium de Orbea, Trek, Canyon y Specialized.
            Explora el catálogo y crea una cotización desde un solo lugar.
          </p>
        </div>

        <div className="resumen-hero-acciones">
          <Link to="/productos" className="hero-boton hero-boton--claro">
            Explorar catálogo
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
              <span className="metrica-etiqueta">Bicicletas disponibles</span>
              <strong className="metrica-valor">
                {cargando ? '...' : resumen?.total ?? 0}
              </strong>
            </div>
          </div>
          <Link to="/productos" className="enlace-metrica">
            Abrir catálogo
            <ArrowUpRight size={15} />
          </Link>
        </section>

        <section className="tarjeta-metrica tarjeta-alerta">
          <div className="metrica-cabecera">
            <div className="metrica-icono metrica-icono--alerta">
              <AlertTriangle size={21} />
            </div>
            <div>
              <span className="metrica-etiqueta">Unidades limitadas</span>
              <strong className="metrica-valor">
                {cargando ? '...' : resumen?.stockBajo ?? 0}
              </strong>
            </div>
          </div>
          <p className="metrica-detalle">
            Bicicletas con 5 unidades o menos en el inventario.
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

        <section className="tarjeta-metrica tarjeta-cotizacion">
          <div className="metrica-cabecera">
            <div className="metrica-icono metrica-icono--cotizacion">
              <ShoppingCart size={21} />
            </div>
            <div>
              <span className="metrica-etiqueta">En tu cotización</span>
              <strong className="metrica-valor">{cantidadTotal}</strong>
            </div>
          </div>
          <Link to="/carrito" className="enlace-metrica">
            Ver cotización
            <ArrowUpRight size={15} />
          </Link>
        </section>

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
