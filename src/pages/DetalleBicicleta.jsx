import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, LoaderCircle, ShoppingCart } from 'lucide-react';
import clienteAxios from '../api/clienteAxios';
import { CarritoContext } from '../context/CarritoContext';
import './Tienda.css';

export default function DetalleBicicleta() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const [bicicleta, setBicicleta] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    clienteAxios.get(`/productos/${id}`).then(({ data }) => setBicicleta(data)).catch((err) => {
      if (err.response?.status === 401) navigate('/login', { replace: true });
      else setError('No fue posible cargar esta bicicleta.');
    });
  }, [id, navigate]);

  if (error) return <div className="estado-vacio"><h3>Bicicleta no encontrada</h3><Link to="/productos" className="boton-primario">Volver al catálogo</Link></div>;
  if (!bicicleta) return <div className="estado-carga"><LoaderCircle size={20} /> Cargando bicicleta...</div>;

  return <div className="pagina tienda-detalle">
    <Link to="/productos" className="detalle-volver"><ArrowLeft size={16} /> Volver al catálogo</Link>
    <section className="bicicleta-detalle">
      <img src={bicicleta.imagen} alt={bicicleta.nombre} />
      <div>
        <span className="pagina-eyebrow">{bicicleta.marca} · {bicicleta.categoria}</span>
        <h1>{bicicleta.nombre}</h1>
        <p className="detalle-precio">${Number(bicicleta.precio).toLocaleString('es-CO')}</p>
        <p className="pagina-descripcion">{bicicleta.descripcion}</p>
        <div className="ficha-tecnica">
          <span><strong>Cuadro</strong>{bicicleta.materialCuadro || 'Por confirmar'}</span>
          <span><strong>Transmisión</strong>{bicicleta.transmision || 'Por confirmar'}</span>
          <span><strong>Tallas</strong>{bicicleta.talla || 'Por confirmar'}</span>
          <span><strong>Peso</strong>{bicicleta.peso || 'Por confirmar'}</span>
          <span><strong>Disponibilidad</strong>{bicicleta.stock} unidades</span>
        </div>
        <button className="boton-primario" onClick={() => agregarAlCarrito(bicicleta)}><ShoppingCart size={17} /> Añadir a cotización</button>
      </div>
    </section>
  </div>;
}
