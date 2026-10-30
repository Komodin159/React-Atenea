import { useContext } from 'react';
import { Heart, Package } from 'lucide-react';
import { FavoritosContext } from '../context/FavoritosContext';
import './ProductoCard.css';

export default function ProductoCard({ producto }) {
  const { agregarFavorito } = useContext(FavoritosContext);
  const precio = Number(producto.precio).toLocaleString('es-CO');

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
        <p>Producto disponible en inventario</p>
      </div>

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
