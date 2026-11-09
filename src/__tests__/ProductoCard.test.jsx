import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ProductoCard from '../components/ProductoCard';
import { CarritoProvider } from '../context/CarritoContext';

describe('ProductoCard', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('agrega la bicicleta a la cotización al hacer clic', async () => {
    const user = userEvent.setup();
    const producto = {
      _id: 'abc123',
      nombre: 'Orbea Orca M30i',
      precio: 25,
      categoria: 'Ruta',
      descripcion: 'Bicicleta de carbono para gran fondo',
    };

    render(
      <MemoryRouter><CarritoProvider><ProductoCard producto={producto} /></CarritoProvider></MemoryRouter>,
    );

    await user.click(
      screen.getByRole('button', { name: /añadir a cotización/i }),
    );

    await waitFor(() => {
      const carrito = JSON.parse(localStorage.getItem('ateneaCarrito'));
      expect(carrito).toHaveLength(1);
      expect(carrito[0]._id).toBe('abc123');
      expect(carrito[0].nombre).toBe('Orbea Orca M30i');
    });
  });

  it('muestra la categoria y descripcion del producto', () => {
    const producto = {
      _id: 'def456',
      nombre: 'Trek Émonda SL 6',
      precio: 8500000,
      categoria: 'Ruta',
      descripcion: 'Bicicleta de competencia aeroligera',
    };

    render(
      <MemoryRouter><CarritoProvider><ProductoCard producto={producto} /></CarritoProvider></MemoryRouter>,
    );

    expect(screen.getByText(/ruta/i)).toBeInTheDocument();
    expect(screen.getByText('Trek Émonda SL 6')).toBeInTheDocument();
    expect(screen.getByText('Bicicleta de competencia aeroligera')).toBeInTheDocument();
  });
});
