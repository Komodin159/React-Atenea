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
    <MemoryRouter initialEntries={['/privada']}>
      <Routes>
        <Route element={<RutaProtegida />}>
          <Route path="/privada" element={<p>Contenido privado</p>} />
        </Route>
        <Route path="/login" element={<p>Pantalla de login</p>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('RutaProtegida', () => {
  beforeEach(() => {
    useAuth.mockReset();
  });

  it('redirige al login cuando no hay usuario', () => {
    useAuth.mockReturnValue({ usuario: null, cargando: false });

    renderizarRuta();

    expect(screen.getByText('Pantalla de login')).toBeInTheDocument();
    expect(screen.queryByText('Contenido privado')).not.toBeInTheDocument();
  });

  it('permite el acceso cuando hay usuario', () => {
    useAuth.mockReturnValue({
      usuario: { nombre: 'Demo' },
      cargando: false,
    });

    renderizarRuta();

    expect(screen.getByText('Contenido privado')).toBeInTheDocument();
  });
});
