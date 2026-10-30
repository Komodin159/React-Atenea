import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, UserCheck, UserPlus } from 'lucide-react';
import './UsuarioCard.css';

function UsuarioCard({ id, nombre, rol, estado, imagen }) {
  const [siguiendo, setSiguiendo] = useState(false);
  const [imagenFallida, setImagenFallida] = useState(false);

  const activo = estado === 'Activo';
  const iniciales = nombre
    .split(' ')
    .map((parte) => parte.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <article className="usuario-card">
      <div className="usuario-card-superior">
        {imagen && !imagenFallida ? (
          <img
            src={imagen}
            alt={`Foto de ${nombre}`}
            className="usuario-imagen"
            onError={() => setImagenFallida(true)}
          />
        ) : (
          <div className="usuario-imagen usuario-iniciales">{iniciales}</div>
        )}
        <span
          className={`usuario-badge ${
            activo ? 'badge-activo' : 'badge-inactivo'
          }`}
        >
          {estado}
        </span>
      </div>

      <div className="usuario-info">
        <h3>{nombre}</h3>
        <p className="usuario-rol">{rol}</p>
      </div>

      <div className="usuario-acciones">
        <button
          type="button"
          className={`usuario-seguir${siguiendo ? ' siguiendo' : ''}`}
          onClick={() => setSiguiendo(!siguiendo)}
        >
          {siguiendo ? <UserCheck size={16} /> : <UserPlus size={16} />}
          {siguiendo ? 'Siguiendo' : 'Seguir'}
        </button>
        <Link to={`/usuarios/${id}`} className="usuario-detalle">
          Ver perfil
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </article>
  );
}

export default UsuarioCard;
