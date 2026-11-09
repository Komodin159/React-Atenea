import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart } from 'lucide-react';
import { CarritoContext } from '../context/CarritoContext';
import './ProductoCard.css';

export default function ProductoCard({ producto }) {
  const { agregarAlCarrito } = useContext(CarritoContext);
  const precio = Number(producto.precio).toLocaleString('es-CO');
  const categoria = producto.categoria || 'Sin categoría';
  const stock = Number(producto.stock ?? 0);
  const stockBajo = stock <= 5;

  return (
    <article className="producto-card">
      {producto.imagen && <img className="producto-imagen" src={producto.imagen} alt={producto.nombre} />}
      <div className="producto-card-superior">
        <div className="producto-icono">
          <Package size={20} />
        </div>
        <span className="producto-precio">${precio}</span>
      </div>

      <div className="producto-card-info">
        <h3>{producto.nombre}</h3>
        <p>{producto.marca || 'Atenea Cycling'} · {categoria}</p>
        {producto.descripcion && (
          <p className="producto-desc">{producto.descripcion}</p>
        )}
      </div>

      <span
        className={`producto-stock${stockBajo ? ' producto-stock--bajo' : ''}`}
      >
        {stockBajo ? 'Stock bajo' : 'Disponible'}: {stock} unidades
      </span>

      <button
        type="button"
        className="producto-favorito"
        onClick={() => agregarAlCarrito(producto)}
      >
        <ShoppingCart size={16} />
        Añadir a cotización
      </button>
      <Link className="producto-detalle" to={`/bicicletas/${producto._id}`}>Ver ficha técnica</Link>
    </article>
  );
}
