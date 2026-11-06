import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Eye,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
  Trash2,
  Users,
} from 'lucide-react';
import clienteAxios from '../api/clienteAxios';
import { useAuth } from '../context/AuthContext';
import './Clientes.css';

const TIPOS_CLIENTE = ['Corporativo', 'PYME', 'Persona natural', 'VIP'];

const FORMULARIO_VACIO = {
  nombre: '',
  empresa: '',
  nit: '',
  email: '',
  telefono: '',
  direccion: '',
  ciudad: '',
  tipo: 'Persona natural',
  notas: '',
};

function iniciales(nombre = '') {
  return nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte.charAt(0).toUpperCase())
    .join('');
}

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [formulario, setFormulario] = useState(FORMULARIO_VACIO);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let activo = true;

    const cargarClientes = async () => {
      try {
        const { data } = await clienteAxios.get('/clientes');

        if (activo) {
          setClientes(Array.isArray(data) ? data : data.clientes || []);
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

        setError('No se pudieron cargar los clientes.');
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    cargarClientes();

    return () => {
      activo = false;
    };
  }, [logout, navigate]);

  const manejarError = (err, mensajePorDefecto) => {
    if (err.response?.status === 401) {
      logout();
      navigate('/login', { replace: true });
      return;
    }

    setError(err.response?.data?.mensaje || mensajePorDefecto);
  };

  const cambiarCampo = (campo) => (evento) => {
    setFormulario((actual) => ({ ...actual, [campo]: evento.target.value }));
  };

  const crearCliente = async (evento) => {
    evento.preventDefault();
    setError('');
    setMensaje('');

    if (!formulario.nombre.trim() || !formulario.email.trim()) {
      setError('El nombre y el correo son obligatorios.');
      return;
    }

    setGuardando(true);

    try {
      const { data } = await clienteAxios.post('/clientes', formulario);
      setClientes((actuales) => [data, ...actuales]);
      setFormulario(FORMULARIO_VACIO);
      setMensaje('Cliente registrado correctamente.');
    } catch (err) {
      manejarError(err, 'No se pudo registrar el cliente.');
    } finally {
      setGuardando(false);
    }
  };

  const eliminarCliente = async (cliente) => {
    const confirmado = window.confirm(
      `¿Eliminar el cliente "${cliente.nombre}"? Esta acción no se puede deshacer.`,
    );

    if (!confirmado) {
      return;
    }

    setError('');
    setMensaje('');

    try {
      await clienteAxios.delete(`/clientes/${cliente._id}`);
      setClientes((actuales) =>
        actuales.filter((item) => item._id !== cliente._id),
      );
      setMensaje('Cliente eliminado.');
    } catch (err) {
      manejarError(err, 'No se pudo eliminar el cliente.');
    }
  };

  const termino = busqueda.trim().toLowerCase();

  const clientesFiltrados = clientes.filter((cliente) => {
    const coincideBusqueda =
      !termino ||
      [cliente.nombre, cliente.empresa, cliente.nit, cliente.email, cliente.ciudad]
        .filter(Boolean)
        .some((valor) => valor.toLowerCase().includes(termino));

    const coincideTipo = !filtroTipo || cliente.tipo === filtroTipo;

    return coincideBusqueda && coincideTipo;
  });

  return (
    <div className="pagina clientes-pagina">
      <header className="pagina-cabecera">
        <div>
          <span className="pagina-eyebrow">Relaciones</span>
          <h1>Clientes</h1>
          <p className="pagina-descripcion">
            Administra la base de clientes de la cafetería: datos de contacto,
            tipo de cuenta y estado. Cada registro se guarda en MongoDB.
          </p>
        </div>
        <span className="pagina-contador">
          <Users size={16} />
          {clientes.length} clientes
        </span>
      </header>

      <section className="cliente-form-card">
        <div className="seccion-cabecera">
          <div>
            <span className="pagina-eyebrow">Nuevo cliente</span>
            <h2>Registrar cliente</h2>
          </div>
          <span className="form-ayuda">Guardado seguro en MongoDB</span>
        </div>

        <form onSubmit={crearCliente} className="cliente-form">
          <div className="cliente-campo">
            <label htmlFor="cliente-nombre">Nombre completo *</label>
            <input
              id="cliente-nombre"
              type="text"
              value={formulario.nombre}
              onChange={cambiarCampo('nombre')}
              placeholder="Ej: Valentina Ríos"
              required
            />
          </div>

          <div className="cliente-campo">
            <label htmlFor="cliente-email">Correo electrónico *</label>
            <input
              id="cliente-email"
              type="email"
              value={formulario.email}
              onChange={cambiarCampo('email')}
              placeholder="cliente@correo.com"
              required
            />
          </div>

          <div className="cliente-campo">
            <label htmlFor="cliente-empresa">Empresa</label>
            <input
              id="cliente-empresa"
              type="text"
              value={formulario.empresa}
              onChange={cambiarCampo('empresa')}
              placeholder="Ej: Estudio Nube"
            />
          </div>

          <div className="cliente-campo">
            <label htmlFor="cliente-nit">NIT / Identificación</label>
            <input
              id="cliente-nit"
              type="text"
              value={formulario.nit}
              onChange={cambiarCampo('nit')}
              placeholder="901245678-1"
            />
          </div>

          <div className="cliente-campo">
            <label htmlFor="cliente-telefono">Teléfono</label>
            <input
              id="cliente-telefono"
              type="tel"
              value={formulario.telefono}
              onChange={cambiarCampo('telefono')}
              placeholder="+57 300 123 4567"
            />
          </div>

          <div className="cliente-campo">
            <label htmlFor="cliente-ciudad">Ciudad</label>
            <input
              id="cliente-ciudad"
              type="text"
              value={formulario.ciudad}
              onChange={cambiarCampo('ciudad')}
              placeholder="Medellín"
            />
          </div>

          <div className="cliente-campo">
            <label htmlFor="cliente-direccion">Dirección</label>
            <input
              id="cliente-direccion"
              type="text"
              value={formulario.direccion}
              onChange={cambiarCampo('direccion')}
              placeholder="Cra 43A #1-50"
            />
          </div>

          <div className="cliente-campo">
            <label htmlFor="cliente-tipo">Tipo de cliente</label>
            <select
              id="cliente-tipo"
              value={formulario.tipo}
              onChange={cambiarCampo('tipo')}
            >
              {TIPOS_CLIENTE.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>

          <div className="cliente-campo cliente-campo--ancho">
            <label htmlFor="cliente-notas">Notas</label>
            <input
              id="cliente-notas"
              type="text"
              value={formulario.notas}
              onChange={cambiarCampo('notas')}
              placeholder="Preferencias, convenios o acuerdos especiales"
            />
          </div>

          <button
            type="submit"
            className="boton-primario producto-boton"
            disabled={guardando}
          >
            <Plus size={17} />
            {guardando ? 'Guardando...' : 'Guardar cliente'}
          </button>
        </form>
      </section>

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

      <section className="clientes-lista">
        <div className="clientes-barra">
          <div className="buscador">
            <Search size={17} className="buscador-icono" />
            <input
              type="search"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
              placeholder="Buscar por nombre, empresa, NIT o ciudad"
              aria-label="Buscar cliente"
            />
          </div>

          <select
            className="clientes-filtro"
            value={filtroTipo}
            onChange={(evento) => setFiltroTipo(evento.target.value)}
            aria-label="Filtrar por tipo de cliente"
          >
            <option value="">Todos los tipos</option>
            {TIPOS_CLIENTE.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>

          <span className="productos-resultado">
            Mostrando {clientesFiltrados.length} de {clientes.length}
          </span>
        </div>

        {cargando ? (
          <div className="estado-carga">
            <LoaderCircle size={20} /> Cargando clientes...
          </div>
        ) : clientes.length === 0 ? (
          <div className="estado-vacio">
            <Users size={34} />
            <h3>No hay clientes registrados</h3>
            <p>Agrega el primer cliente con el formulario de arriba.</p>
          </div>
        ) : clientesFiltrados.length === 0 ? (
          <div className="estado-vacio">
            <Search size={34} />
            <h3>No encontramos coincidencias</h3>
            <p>Prueba con otro término de búsqueda o cambia el tipo de cliente.</p>
          </div>
        ) : (
          <div className="clientes-grid">
            {clientesFiltrados.map((cliente) => (
              <article key={cliente._id} className="cliente-card">
                <div className="cliente-superior">
                  <div className="cliente-identidad">
                    <div className="cliente-avatar">{iniciales(cliente.nombre)}</div>
                    <div className="cliente-titulo">
                      <h3>{cliente.nombre}</h3>
                      <span>{cliente.empresa || 'Cliente particular'}</span>
                    </div>
                  </div>

                  <span
                    className={`cliente-estado ${
                      cliente.estado === 'Activo'
                        ? 'cliente-estado--activo'
                        : 'cliente-estado--inactivo'
                    }`}
                  >
                    {cliente.estado}
                  </span>
                </div>

                <div className="cliente-etiquetas">
                  <span className="cliente-tipo">{cliente.tipo}</span>
                  {cliente.ciudad && (
                    <span className="cliente-ciudad">
                      <MapPin size={13} /> {cliente.ciudad}
                    </span>
                  )}
                </div>

                <div className="cliente-info">
                  <p>
                    <Mail size={15} />
                    {cliente.email}
                  </p>
                  <p>
                    <Phone size={15} />
                    {cliente.telefono || 'Sin teléfono'}
                  </p>
                  <p>
                    <Building2 size={15} />
                    {cliente.nit || 'Sin NIT registrado'}
                  </p>
                </div>

                {cliente.notas && <p className="cliente-notas">{cliente.notas}</p>}

                <div className="cliente-acciones">
                  <Link
                    to={`/clientes/${cliente._id}`}
                    className="cliente-accion cliente-accion--ver"
                  >
                    <Eye size={15} />
                    Ver ficha
                  </Link>
                  <button
                    type="button"
                    className="cliente-accion cliente-accion--eliminar"
                    onClick={() => eliminarCliente(cliente)}
                  >
                    <Trash2 size={15} />
                    Eliminar
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
