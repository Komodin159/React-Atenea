import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);
  const { usuario, registro } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario) {
      navigate('/', { replace: true });
    }
  }, [usuario, navigate]);

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('La contrasena debe tener al menos 6 caracteres.');
      return;
    }

    setEnviando(true);

    try {
      await registro(nombre, email, password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.mensaje ||
          'No se pudo crear la cuenta. Intenta de nuevo.',
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <span className="auth-marca">React Atenea</span>
        <h1>Crear cuenta</h1>
        <p className="auth-descripcion">
          Registrate para acceder al panel de administracion.
        </p>

        <form onSubmit={manejarEnvio} className="auth-form">
          <div className="auth-field">
            <label htmlFor="registro-nombre">Nombre completo</label>
            <input
              id="registro-nombre"
              type="text"
              value={nombre}
              onChange={(evento) => setNombre(evento.target.value)}
              placeholder="Juan Perez"
              autoComplete="name"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="registro-email">Correo electronico</label>
            <input
              id="registro-email"
              type="email"
              value={email}
              onChange={(evento) => setEmail(evento.target.value)}
              placeholder="tu@correo.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="registro-password">Contrasena</label>
            <input
              id="registro-password"
              type="password"
              value={password}
              onChange={(evento) => setPassword(evento.target.value)}
              placeholder="Minimo 6 caracteres"
              autoComplete="new-password"
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-button" disabled={enviando}>
            {enviando ? 'Creando cuenta...' : 'Registrarme'}
          </button>
        </form>

        <p className="auth-link">
          Ya tienes cuenta? <Link to="/login">Inicia sesion</Link>
        </p>
      </section>
    </main>
  );
}
