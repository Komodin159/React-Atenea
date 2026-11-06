import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  Building2,
  CheckCircle2,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  Save,
  UserRound,
} from 'lucide-react';
import clienteAxios from '../api/clienteAxios';
import { useAuth } from '../context/AuthContext';
import './Clientes.css';

const TIPOS_CLIENTE = ['Corporativo', 'PYME', 'Persona natural', 'VIP'];

export default function ClienteDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [cliente, setCliente] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    let activo = true;

    const cargarCliente = async () => {
      try {
        const { data } = await clienteAxios.get(`/clientes/${id}`);

        if (activo) {
          setCliente(data);
        }
      } catch (err) {
        if (!activo) {
          return;
        }

        if (err.response?.status === 401) {
          logout();
          navigate('/login', { replace: true });
          return;
        }

        setError(
          err.response?.data?.mensaje || 'No se pudo cargar el cliente.',
        );
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    cargarCliente();

    return () => {
      activo = false;
    };
  }, [id, logout, navigate]);

  const cambiarCampo = (campo) => (evento) => {
    setCliente((actual) => ({ ...actual, [campo]: evento.target.value }));
  };

  const guardarCambios = async (evento) => {
    evento.preventDefault();
    setError('');
    setMensaje('');
    setGuardando(true);

    try {
      const { data } = await clienteAxios.patch(`/clientes/${id}`, {
        estado: cliente.estado,
        tipo: cliente.tipo,
        notas: cliente.notas,
      });
      setCliente(data);
      setMensaje('Cambios guardados correctamente.');
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate('/login', { replace: true });
        return;
      }

      setError(
        err.response?.data?.mensaje || 'No se pudieron guardar los cambios.',
      );
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return (
      <div className="pagina clientes-pagina">
        <div className="estado-carga">
          <LoaderCircle size={20} /> Cargando ficha del cliente...
        </div>
      </div>
    );
  }

  if (!cliente) {
    return (
      <div className="pagina clientes-pagina">
        <div className="estado-vacio">
          <AlertCircle size={34} />
          <h3>No encontramos este cliente</h3>
          <p>{error || 'Puede que haya sido eliminado.'}</p>
          <Link to="/clientes" className="boton-primario">
            Volver a clientes
          </Link>
        </div>
      </div>
    );
  }

  const iniciales = cliente.nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte.charAt(0).toUpperCase())
    .join('');

  return (
    <div className="pagina clientes-pagina">
      <header className="pagina-cabecera">
        <div>
          <Link to="/clientes" className="detalle-volver">
            <ArrowLeft size={16} /> Volver a clientes
          </Link>
          <span className="pagina-eyebrow">Ficha de cliente</span>
          <h1>{cliente.nombre}</h1>
          <p className="pagina-descripcion">
            {cliente.empresa || 'Cliente particular'} ·{' '}
            {cliente.ciudad || 'Ciudad no registrada'}
          </p>
        </div>
        <span
          className={`cliente-estado cliente-estado--grande ${
            cliente.estado === 'Activo'
              ? 'cliente-estado--activo'
              : 'cliente-estado--inactivo'
          }`}
        >
          {cliente.estado}
        </span>
      </header>

      {error && (
        <p className="producto-alerta producto-alerta--error" role="alert">
          <AlertCircle size={17} /> {error}
        </p>
      )}
      {mensaje && (
        <p className="producto-alerta producto-alerta--exito" role="status">
          <CheckCircle2 size={17} /> {mensaje}
        </p>
      )}

      <div className="detalle-grid">
        <section className="cliente-form-card">
          <div className="seccion-cabecera">
            <div>
              <span className="pagina-eyebrow">Contacto</span>
              <h2>Datos registrados</h2>
            </div>
            <div className="detalle-avatar">{iniciales}</div>
          </div>

          <ul className="detalle-lista">
            <li>
              <span>
                <UserRound size={16} /> Nombre
              </span>
              <strong>{cliente.nombre}</strong>
            </li>
            <li>
              <span>
                <Building2 size={16} /> Empresa
              </span>
              <strong>{cliente.empresa || 'Cliente particular'}</strong>
            </li>
            <li>
              <span>
                <Building2 size={16} /> NIT
              </span>
              <strong>{cliente.nit || 'No registrado'}</strong>
            </li>
            <li>
              <span>
                <Mail size={16} /> Correo
              </span>
              <strong>{cliente.email}</strong>
            </li>
            <li>
              <span>
                <Phone size={16} /> Teléfono
              </span>
              <strong>{cliente.telefono || 'No registrado'}</strong>
            </li>
            <li>
              <span>
                <MapPin size={16} /> Dirección
              </span>
              <strong>{cliente.direccion || 'No registrada'}</strong>
            </li>
            <li>
              <span>
                <MapPin size={16} /> Ciudad
              </span>
              <strong>{cliente.ciudad || 'No registrada'}</strong>
            </li>
          </ul>
        </section>

        <section className="cliente-form-card">
          <div className="seccion-cabecera">
            <div>
              <span className="pagina-eyebrow">Seguimiento</span>
              <h2>Actualizar cuenta</h2>
            </div>
          </div>

          <form onSubmit={guardarCambios} className="cliente-form detalle-form">
            <div className="cliente-campo">
              <label htmlFor="detalle-tipo">Tipo de cliente</label>
              <select
                id="detalle-tipo"
                value={cliente.tipo}
                onChange={cambiarCampo('tipo')}
              >
                {TIPOS_CLIENTE.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>

            <div className="cliente-campo">
              <label htmlFor="detalle-estado">Estado</label>
              <select
                id="detalle-estado"
                value={cliente.estado}
                onChange={cambiarCampo('estado')}
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>

            <div className="cliente-campo cliente-campo--ancho">
              <label htmlFor="detalle-notas">Notas internas</label>
              <textarea
                id="detalle-notas"
                rows={5}
                value={cliente.notas || ''}
                onChange={cambiarCampo('notas')}
                placeholder="Preferencias, convenios, historial de compras..."
              />
            </div>

            <button
              type="submit"
              className="boton-primario producto-boton"
              disabled={guardando}
            >
              <Save size={17} />
              {guardando ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
