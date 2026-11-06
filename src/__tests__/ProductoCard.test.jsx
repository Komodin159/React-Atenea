import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductoCard from '../components/ProductoCard';
import { FavoritosProvider } from '../context/FavoritosContext';

describe('ProductoCard', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('agrega el producto a favoritos al hacer clic', async () => {
    const user = userEvent.setup();
    const producto = {
      _id: 'abc123',
      nombre: 'Licencia Software Enterprise',
      precio: 25,
      categoria: 'software',
      descripcion: 'Licencia anual para 50 usuarios',
    };

    render(
      <FavoritosProvider>
        <ProductoCard producto={producto} />
      </FavoritosProvider>,
    );

    await user.click(
      screen.getByRole('button', { name: /agregar a favoritos/i }),
    );

    await waitFor(() => {
      const favoritos = JSON.parse(localStorage.getItem('misFavoritos'));
      expect(favoritos).toHaveLength(1);
      expect(favoritos[0]._id).toBe('abc123');
      expect(favoritos[0].nombre).toBe('Licencia Software Enterprise');
    });
  });

  it('muestra la categoria y descripcion del producto', () => {
    const producto = {
      _id: 'def456',
      nombre: 'Servidor Dell PowerEdge',
      precio: 8500000,
      categoria: 'hardware',
      descripcion: 'Servidor rack 2U con 2 procesadores Intel Xeon',
    };

    render(
      <FavoritosProvider>
        <ProductoCard producto={producto} />
      </FavoritosProvider>,
    );

    expect(screen.getByText('hardware')).toBeInTheDocument();
    expect(screen.getByText('Servidor Dell PowerEdge')).toBeInTheDocument();
    expect(
      screen.getByText('Servidor rack 2U con 2 procesadores Intel Xeon'),
    ).toBeInTheDocument();
  });
});