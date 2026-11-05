import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RutaProtegida() {
  const { cliente, cargando } = useAuth();

  if (cargando) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        Cargando sesión...
      </div>
    );
  }

  if (!cliente) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}