import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  Package,
  Plus,
  SearchX,
  Trash2,
} from 'lucide-react';
import clienteAxios from '../api/clienteAxios';
import Buscador from '../components/Buscador';
import ProductoCard from '../components/ProductoCard';
import { useAuth } from '../context/AuthContext';
import './Productos.css';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let activo = true;

    const cargarProductos = async () => {
      try {
        const { data } = await clienteAxios.get('/productos');

        if (activo) {
          setProductos(data);
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

        setError('No se pudieron cargar los productos.');
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    cargarProductos();

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

  const crearProducto = async (evento) => {
    evento.preventDefault();
    setError('');
    setMensaje('');

    if (!nombre.trim() || precio === '') {
      setError('Escribe el nombre y el precio del producto.');
      return;
    }

    const precioNumero = Number(precio);

    if (!Number.isFinite(precioNumero) || precioNumero < 0) {
      setError('El precio debe ser un numero mayor o igual a cero.');
      return;
    }

    setGuardando(true);

    try {
      const { data } = await clienteAxios.post('/productos', {
        nombre: nombre.trim(),
        precio: precioNumero,
      });

      setProductos((actuales) => [data, ...actuales]);
      setNombre('');
      setPrecio('');
      setMensaje('Producto agregado correctamente.');
    } catch (err) {
      manejarError(err, 'No se pudo agregar el producto.');
    } finally {
      setGuardando(false);
    }
  };

  const eliminarProducto = async (id) => {
    setError('');
    setMensaje('');

    try {
      await clienteAxios.delete(`/productos/${id}`);
      setProductos((actuales) =>
        actuales.filter((producto) => producto._id !== id),
      );
      setMensaje('Producto eliminado.');
    } catch (err) {
      manejarError(err, 'No se pudo eliminar el producto.');
    }
  };

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.trim().toLowerCase()),
  );

  return (
    <div className="pagina productos-pagina">
      <header className="pagina-cabecera">
        <div>
          <span className="pagina-eyebrow">Inventario</span>
          <h1>Productos</h1>
          <p className="pagina-descripcion">
            Crea, busca y elimina productos. Cada cambio se guarda directamente
            en la base de datos de Atenea.
          </p>
        </div>
        <span className="pagina-contador">
          <Package size={16} />
          {productos.length} productos
        </span>
      </header>

      <section className="producto-form-card">
        <div className="seccion-cabecera">
          <div>
            <span className="pagina-eyebrow">Nuevo producto</span>
            <h2>Agregar al inventario</h2>
          </div>
          <span className="form-ayuda">Guardado seguro en MongoDB</span>
        </div>

        <form onSubmit={crearProducto} className="producto-form">
          <div className="producto-campo">
            <label htmlFor="producto-nombre">Nombre</label>
            <input
              id="producto-nombre"
              type="text"
              value={nombre}
              onChange={(evento) => setNombre(evento.target.value)}
              placeholder="Ej: Mouse Gamer"
            />
          </div>

          <div className="producto-campo">
            <label htmlFor="producto-precio">Precio</label>
            <input
              id="producto-precio"
              type="number"
              min="0"
              step="0.01"
              value={precio}
              onChange={(evento) => setPrecio(evento.target.value)}
              placeholder="0"
            />
          </div>

          <button
            type="submit"
            className="boton-primario producto-boton"
            disabled={guardando}
          >
            <Plus size={17} />
            {guardando ? 'Guardando...' : 'Guardar producto'}
          </button>
        </form>
      </section>

      {error && (
        <p className="producto-alerta producto-alerta--error" role="alert">
          <AlertCircle size={17} />
          {error}
        </p>
      )}
      {mensaje && (
        <p className="producto-alerta producto-alerta--exito" role="status">
          <CheckCircle2 size={17} />
          {mensaje}
        </p>
      )}

      <section className="productos-lista">
        <div className="productos-barra">
          <Buscador
            valor={busqueda}
            alCambiar={setBusqueda}
            placeholder="Buscar producto por nombre"
          />
          <span className="productos-resultado">
            Mostrando {productosFiltrados.length} de {productos.length}
          </span>
        </div>

        {cargando ? (
          <div className="estado-carga">
            <LoaderCircle size={20} />
            Cargando inventario...
          </div>
        ) : productos.length === 0 ? (
          <div className="estado-vacio">
            <Package size={34} />
            <h3>Tu inventario esta vacio</h3>
            <p>Agrega el primer producto con el formulario de arriba.</p>
          </div>
        ) : productosFiltrados.length === 0 ? (
          <div className="estado-vacio">
            <SearchX size={34} />
            <h3>No encontramos coincidencias</h3>
            <p>
              Prueba con otro nombre o limpia la busqueda para ver todos los
              productos.
            </p>
          </div>
        ) : (
          <div className="productos-grid">
            {productosFiltrados.map((producto) => (
              <div key={producto._id} className="producto-item">
                <ProductoCard producto={producto} />
                <button
                  type="button"
                  className="producto-eliminar"
                  onClick={() => eliminarProducto(producto._id)}
                >
                  <Trash2 size={15} />
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
