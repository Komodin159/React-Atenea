import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);
  const { usuario, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario) {
      navigate('/', { replace: true });
    }
  }, [usuario, navigate]);

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    setError('');
    setEnviando(true);

    try {
      await login(email, password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.mensaje ||
          'No se pudo iniciar sesion. Verifica tus datos.',
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <span className="auth-marca">React Atenea</span>
        <h1>Iniciar sesion</h1>
        <p className="auth-descripcion">
          Ingresa con tu cuenta para administrar los productos.
        </p>

        <form onSubmit={manejarEnvio} className="auth-form">
          <div className="auth-field">
            <label htmlFor="login-email">Correo electronico</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
              placeholder="tu@correo.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="login-password">Contrasena</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(evento) => setPassword(evento.target.value)}
              placeholder="Minimo 6 caracteres"
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-button" disabled={enviando}>
            {enviando ? 'Ingresando...' : 'Entrar'}
          </button>
        </form>

        <p className="auth-link">
          No tienes cuenta? <Link to="/registro">Registrate aqui</Link>
        </p>
      </section>
    </main>
  );
}
