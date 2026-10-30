import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Briefcase,
  CalendarDays,
  Mail,
  MapPin,
  UserX,
} from 'lucide-react';
import { usuarios } from '../data/usuarios';
import './Usuarios.css';

export default function UsuariosDetalle() {
  const { id } = useParams();
  const [imagenFallida, setImagenFallida] = useState(false);
  const usuario = usuarios.find((item) => item.id === id);

  if (!usuario) {
    return (
      <div className="pagina usuario-detalle-pagina">
        <Link to="/usuarios" className="volver-enlace">
          <ArrowLeft size={16} />
          Volver al equipo
        </Link>
        <div className="estado-vacio">
          <UserX size={34} />
          <h3>Usuario no encontrado</h3>
          <p>El perfil que buscas no existe o fue removido del equipo.</p>
        </div>
      </div>
    );
  }

  const iniciales = usuario.nombre
    .split(' ')
    .map((parte) => parte.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="pagina usuario-detalle-pagina">
      <Link to="/usuarios" className="volver-enlace">
        <ArrowLeft size={16} />
        Volver al equipo
      </Link>

      <article className="perfil-card">
        <div className="perfil-lateral">
          {usuario.imagen && !imagenFallida ? (
            <img
              src={usuario.imagen}
              alt={`Foto de ${usuario.nombre}`}
              className="perfil-avatar"
              onError={() => setImagenFallida(true)}
            />
          ) : (
            <div className="perfil-avatar perfil-iniciales">{iniciales}</div>
          )}
          <h1>{usuario.nombre}</h1>
          <p>{usuario.rol}</p>
          <span
            className={`usuario-badge ${
              usuario.estado === 'Activo' ? 'badge-activo' : 'badge-inactivo'
            }`}
          >
            {usuario.estado}
          </span>
        </div>

        <div className="perfil-contenido">
          <span className="pagina-eyebrow">Perfil del usuario</span>
          <h2>Informacion del equipo</h2>
          <p className="perfil-descripcion">
            Detalle de contacto y ubicacion de {usuario.nombre} dentro de
            Atenea.
          </p>

          <div className="perfil-datos">
            <div className="perfil-dato">
              <span className="perfil-dato-icono">
                <Mail size={18} />
              </span>
              <div>
                <small>Correo</small>
                <strong>{usuario.email}</strong>
              </div>
            </div>

            <div className="perfil-dato">
              <span className="perfil-dato-icono">
                <MapPin size={18} />
              </span>
              <div>
                <small>Ubicacion</small>
                <strong>{usuario.ubicacion}</strong>
              </div>
            </div>

            <div className="perfil-dato">
              <span className="perfil-dato-icono">
                <Briefcase size={18} />
              </span>
              <div>
                <small>Area</small>
                <strong>{usuario.area}</strong>
              </div>
            </div>

            <div className="perfil-dato">
              <span className="perfil-dato-icono">
                <CalendarDays size={18} />
              </span>
              <div>
                <small>Ingreso</small>
                <strong>{usuario.ingreso}</strong>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
