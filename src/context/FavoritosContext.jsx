import { createContext, useEffect, useState } from 'react';

export const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState(() => {
    const datosGuardados = localStorage.getItem('misFavoritos');
    return datosGuardados ? JSON.parse(datosGuardados) : [];
  });

  useEffect(() => {
    localStorage.setItem('misFavoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  const agregarFavorito = (producto) => {
    const idProducto = producto._id || producto.id;
    const existe = favoritos.find(
      (item) => (item._id || item.id) === idProducto,
    );

    if (!existe) {
      setFavoritos([...favoritos, producto]);
    }
  };

  const quitarFavorito = (id) => {
    setFavoritos((actuales) =>
      actuales.filter((item) => (item._id || item.id) !== id),
    );
  };

  const vaciarFavoritos = () => setFavoritos([]);

  return (
    <FavoritosContext.Provider
      value={{ favoritos, agregarFavorito, quitarFavorito, vaciarFavoritos }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}
