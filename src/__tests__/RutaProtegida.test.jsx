import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RutaProtegida from '../components/RutaProtegida';
import { useAuth } from '../context/AuthContext';

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

function renderizarRuta() {
  render(
    <MemoryRouter initialEntries=['/clientes']>
      <Routes>
        <Route element={<RutaProtegida />}>
          <Route path="/clientes" element={<p>Panel de clientes</p>} />
          <Route path="/login" element={<p>Pantalla de login</p>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe('RutaProtegida', () => {
  beforeEach(() => {
    useAuth.mockReset();
  });

  it('redirige al login cuando no hay cliente', () => {
    useAuth.mockReturnValue({ cliente: null, cargando: false });

    renderizarRuta();

    expect(screen.getByText('Pantalla de login')).toBeInTheDocument();
    expect(screen.queryByText('Panel de clientes')).not.toBeInTheDocument();
  });

  it('permite el acceso cuando hay cliente', () => {
    useAuth.mockReturnValue({
      cliente: { nombre: 'Demo' },
      cargando: false,
    });

    renderizarRuta();

    expect(screen.getByText('Panel de clientes')).toBeInTheDocument();
  });
});