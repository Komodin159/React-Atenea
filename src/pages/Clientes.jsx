import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import clienteAxios from '../api/clienteAxios';
import { useAuth } from '../context/AuthContext';
import './Clientes.css';

export default function Clientess() {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let activo = true;

    const cargarClientes = async () => {
      try {
        const { data } = await clienteAxios.get('/auth/perfil');

        if (activo) {
          // El perfil ya incluye los datos del cliente
          setClientes(data.cliente ? [data.cliente] : []);
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

    const [error, setError] = useState('');

    cargarClientes();

    return () => {
      activo = false;
    };
  }, [logout, navigate]);

  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(busqueda.trim().toLowerCase()) ||
      cliente.empresa.toLowerCase().includes(busqueda.trim().toLowerCase()) ||
      cliente.nit.toLowerCase().includes(busqueda.trim().toLowerCase())
  );

  return (
    <div className="pagina clientes-pagina">
      <header className="pagina-cabecera">
        <div>
          <span className="pagina-eyebrow">Clientes</span>
          <h1>Gestión de Clientes</h1>
          <p className="pagina-descripcion">
            Lista de clientes registrados en el sistema. Cada cliente tiene su
            información de contacto y datos empresariales.
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
            <h2>Agregar cliente al sistema</h2>
          </div>
          <span className="form-ayuda">Datos guardados en la base de datos</span>
        </div>

        <form className="cliente-form">
          <div className="cliente-campo">
            <label htmlFor="cliente-nombre">Nombre completo</label>
            <input
              id="cliente-nombre"
              type="text"
              placeholder="Carlos Rodríguez"
              required
            />
          </div>

          <div className="cliente-campo">
            <label htmlFor="cliente-empresa">Empresa</label>
            <input
              id="cliente-empresa"
              type="text"
              placeholder="InTech Soluciones"
            />
          </div>

          <div className="cliente-campo">
            <label htmlFor="cliente-nit">NIT/Número Identificación</label>
            <input
              id="cliente-nit"
              type="text"
              placeholder="900123456-7"
            />
          </div>

          <div className="cliente-campo">
            <label htmlFor="cliente-telefono">Teléfono</label>
            <input
              id="cliente-telefono"
              type="tel"
              placeholder="+57 300 123 4567"
            />
          </div>

          <div className="cliente-campo">
            <label htmlFor="cliente-direccion">Dirección</label>
            <input
              id="cliente-direccion"
              type="text"
              placeholder="Calle 45 #12-34, Medellín"
            />
          </div>

          <div className="cliente-campo">
            <label htmlFor="cliente-rol">Rol en empresa</label>
            <select id="cliente-rol">
              <option value="propietario">Propietario</option>
              <option value="gerente">Gerente</option>
              <option value="analista">Analista</option>
              <option value="desarrollador">Desarrollador</option>
              <option value="disenador">Diseñador</option>
            </select>
          </div>

          <button
            type="submit"
            className="boton-primario producto-boton"
          >
            <i className="lucide-plus" /> Guardar cliente
          </button>
        </form>
      </section>

      {error && (
        <p className="producto-alerta producto-alerta--error" role="alert">
          <i className="lucide-alert-circle" size={17} /> {error}
        </p>
      )}

      <section className="clientes-lista">
        <div className="clientes-barra">
          <input
            type="search"
            className="buscador"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar cliente por nombre o NIT"
            aria-label="Buscar cliente"
          />
          {clientesFiltrados.length > 0 ? (
            <span className="productos-resultado">
              Mostrando {clientesFiltrados.length} de {clientes.length}
            </span>
          ) : (
            <span className="productos-resultado">
              No se encontraron clientes
            </span>
          )}
        </div>

        {cargando ? (
          <div className="estado-carga">
            <i className="lucide-loader" size={20} /> Cargando clientes...
          </div>
        ) : clientes.length === 0 ? (
          <div className="estado-vacio">
            <i className="lucide-users" size={34} />
            <h3>No hay clientes registrados</h3>
            <p>
              Agrega tu primer cliente usando el formulario de arriba para
              comenzar a gestionar tu base de datos.
            </p>
          </div>
        ) : (

          <div className="clientes-grid">
            {clientesFiltrados.map((cliente) => (
              <div
                key={cliente._id}
                className="cliente-card"
              >
                <div className="cliente-superior">
                  <div className="cliente-icono">
                    <Users size={19} />
                  </div>
                  <div>
                    <h3>{cliente.nombre}</h3>
                    <small>{cliente.empresa}</small>
                  </div>
                </div>

                <div className="cliente-info">
                  <p>
                    <strong>NIT:</strong> {cliente.nit || 'No informado'}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {cliente.telefono || 'No informado'}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {cliente.direccion || 'No informada'}
                  </p>
                  <p>
                    <strong>Rol:</strong> {cliente.rol_empresa || 'Usuario'}
                  </p>
                </div>

                <div className="cliente-acciones">
                  <button
                    type="button"
                    className="boton-metrica"
                    onClick={() => navigator.clipboard.writeText(cliente.nit || '')}
                    title="Copiar NIT"
                  >
                    <i className="lucide-copy" size={14} /> Copiar NIT
                  </button>
                  <Link
                    to={`/clientes/${cliente._id}`}
                    className="boton-icono"
                    title="Ver perfil completo"
                  >
                    <i className="lucide-eye" size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}