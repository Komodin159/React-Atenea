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
    const producto = { _id: 'abc123', nombre: 'Mouse Gamer', precio: 25 };

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
    });
  });
});
