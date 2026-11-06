import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';
import { useAuth } from '../context/AuthContext';

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

describe('Login', () => {
  const login = vi.fn();

  beforeEach(() => {
    login.mockReset();
    login.mockResolvedValue({ usuario: { nombre: 'Demo' }, token: 'token123' });
    useAuth.mockReturnValue({ usuario: null, login });
  });

  it('envia el correo y la contrasena al formulario', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(/correo/i), 'demo@test.com');
    await user.type(screen.getByLabelText(/contraseña/i), '123456');
    await user.click(screen.getByRole('button', { name: /entrar/i }));

    expect(login).toHaveBeenCalledWith('demo@test.com', '123456');
  });

  it('no muestra error cuando el login es exitoso', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText(/correo/i), 'demo@test.com');
    await user.type(screen.getByLabelText(/contraseña/i), '123456');
    await user.click(screen.getByRole('button', { name: /entrar/i }));

    await waitFor(() =>
      expect(login).toHaveBeenCalledWith('demo@test.com', '123456'),
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
