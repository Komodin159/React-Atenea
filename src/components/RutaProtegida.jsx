import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RutaProtegida() {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        Cargando sesion...
      </div>
    );
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
