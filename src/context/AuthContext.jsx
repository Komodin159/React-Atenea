import { createContext, useContext, useEffect, useState } from 'react';
import clienteAxios from '../api/clienteAxios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [cargando, setCargando] = useState(() => Boolean(localStorage.getItem('token')));

  useEffect(() => {
    const tokenGuardado = localStorage.getItem('token');

    if (!tokenGuardado) {
      return undefined;
    }

    let activo = true;

    const cargarPerfil = async () => {
      try {
        const { data } = await clienteAxios.get('/auth/perfil');

        if (activo) {
          setUsuario(data);
          setToken(tokenGuardado);
        }
      } catch {
        if (activo) {
          localStorage.removeItem('token');
          setUsuario(null);
          setToken(null);
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    cargarPerfil();

    return () => {
      activo = false;
    };
  }, []);

  const guardarSesion = (datos) => {
    localStorage.setItem('token', datos.token);
    setToken(datos.token);
    setUsuario(datos.usuario);
  };

  const login = async (email, password) => {
    const { data } = await clienteAxios.post('/auth/login', { email, password });
    guardarSesion(data);
    return data.usuario;
  };

  const registro = async (nombre, email, password) => {
    const { data } = await clienteAxios.post('/auth/registro', {
      nombre,
      email,
      password,
    });
    guardarSesion(data);
    return data.usuario;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{ usuario, token, cargando, login, registro, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
