import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Heart,
  Package,
  Sparkles,
  Users,
} from 'lucide-react';
import ContadorGeneral from '../components/ContadorGeneral';
import RelojDigital from '../components/RelojDigital';
import { useAuth } from '../context/AuthContext';
import { FavoritosContext } from '../context/FavoritosContext';
import './PanelGeneral.css';

const accesos = [
  {
    to: '/productos',
    icono: Package,
    titulo: 'Inventario',
    descripcion: 'Agrega y administra tus productos.',
  },
  {
    to: '/usuarios',
    icono: Users,
    titulo: 'Equipo',
    descripcion: 'Consulta los perfiles del equipo.',
  },
  {
    to: '/mis-favoritos',
    icono: Heart,
    titulo: 'Favoritos',
    descripcion: 'Revisa los productos que guardaste.',
  },
];

export default function PanelGeneral() {
  const { usuario } = useAuth();
  const { favoritos } = useContext(FavoritosContext);

  const primerNombre = usuario?.nombre?.split(' ')[0] || 'bienvenido';
  const fecha = new Date().toLocaleDateString('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

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
            Este es el resumen de Atenea. Revisa tus metricas, administra el
            inventario y manten todo bajo control desde un solo lugar.
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
          <Link to="/mis-favoritos" className="hero-boton hero-boton--fantasma">
            Ver favoritos
            <Heart size={17} />
          </Link>
        </div>
      </section>

      <div className="resumen-metricas">
        <ContadorGeneral />
        <RelojDigital />

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
      </div>

      <section className="resumen-seccion">
        <div className="seccion-cabecera">
          <div>
            <span className="pagina-eyebrow">Atajos</span>
            <h2>Todo a un clic</h2>
            <p>Las secciones que mas vas a usar, siempre a mano.</p>
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
