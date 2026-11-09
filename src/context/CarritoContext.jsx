import { createContext, useEffect, useMemo, useState } from 'react';

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('ateneaCarrito');
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('ateneaCarrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (bicicleta) => {
    setCarrito((actual) => {
      const existe = actual.find((item) => item._id === bicicleta._id);
      return existe
        ? actual.map((item) => item._id === bicicleta._id ? { ...item, cantidad: item.cantidad + 1 } : item)
        : [...actual, { ...bicicleta, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (id, cantidad) => {
    setCarrito((actual) => actual.map((item) => item._id === id ? { ...item, cantidad: Math.max(1, cantidad) } : item));
  };

  const eliminarDelCarrito = (id) => setCarrito((actual) => actual.filter((item) => item._id !== id));
  const cantidadTotal = useMemo(() => carrito.reduce((total, item) => total + item.cantidad, 0), [carrito]);
  const total = useMemo(() => carrito.reduce((acumulado, item) => acumulado + item.precio * item.cantidad, 0), [carrito]);

  return <CarritoContext.Provider value={{ carrito, agregarAlCarrito, cambiarCantidad, eliminarDelCarrito, cantidadTotal, total }}>{children}</CarritoContext.Provider>;
}
