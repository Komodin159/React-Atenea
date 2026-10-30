import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Trash2, X } from 'lucide-react';
import { FavoritosContext } from '../context/FavoritosContext';
import './Favoritos.css';

export default function MisFavoritos() {
  const { favoritos, quitarFavorito, vaciarFavoritos } =
    useContext(FavoritosContext);

  return (
    <div className="pagina favoritos-pagina">
      <header className="pagina-cabecera">
        <div>
          <span className="pagina-eyebrow">Tu seleccion</span>
          <h1>Favoritos</h1>
          <p className="pagina-descripcion">
            Guarda los productos que te interesan y tenlos siempre a mano.
          </p>
        </div>
        <span className="pagina-contador">
          <Heart size={16} />
          {favoritos.length} favoritos
        </span>
      </header>

      {favoritos.length === 0 ? (
        <div className="estado-vacio">
          <Heart size={36} />
          <h3>Tu lista esta vacia</h3>
          <p>
            Explora el inventario y pulsa “Agregar a Favoritos” en los productos
            que quieras guardar.
          </p>
          <Link to="/productos" className="boton-primario">
            Explorar productos
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <>
          <div className="favoritos-barra">
            <span>
              {favoritos.length}{' '}
              {favoritos.length === 1 ? 'producto guardado' : 'productos guardados'}
            </span>
            <button
              type="button"
              className="boton-peligro"
              onClick={vaciarFavoritos}
            >
              <Trash2 size={16} />
              Vaciar lista
            </button>
          </div>

          <div className="favoritos-grid">
            {favoritos.map((item) => {
              const id = item._id || item.id;

              return (
                <article key={id} className="favorito-card">
                  <div className="favorito-superior">
                    <div className="favorito-icono">
                      <Heart size={19} />
                    </div>
                    <button
                      type="button"
                      className="favorito-quitar"
                      onClick={() => quitarFavorito(id)}
                      aria-label={`Quitar ${item.nombre} de favoritos`}
                      title="Quitar de favoritos"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="favorito-info">
                    <h3>{item.nombre}</h3>
                    <span className="favorito-precio">
                      ${Number(item.precio).toLocaleString('es-CO')}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
