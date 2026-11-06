import { useContext } from 'react';
import { Heart, Package } from 'lucide-react';
import { FavoritosContext } from '../context/FavoritosContext';
import './ProductoCard.css';

export default function ProductoCard({ producto }) {
  const { agregarFavorito } = useContext(FavoritosContext);
  const precio = Number(producto.precio).toLocaleString('es-CO');
  const categoria = producto.categoria || 'Sin categoría';
  const stock = Number(producto.stock ?? 0);
  const stockBajo = stock <= 5;

  return (
    <article className="producto-card">
      <div className="producto-card-superior">
        <div className="producto-icono">
          <Package size={20} />
        </div>
        <span className="producto-precio">${precio}</span>
      </div>

      <div className="producto-card-info">
        <h3>{producto.nombre}</h3>
        <p>{categoria}</p>
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
        onClick={() => agregarFavorito(producto)}
      >
        <Heart size={16} />
        Agregar a Favoritos
      </button>
    </article>
  );
}