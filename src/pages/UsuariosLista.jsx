import { Users } from 'lucide-react';
import UsuarioCard from '../components/UsuarioCard';
import { usuarios } from '../data/usuarios';
import './Usuarios.css';

export default function UsuariosLista() {
  return (
    <div className="pagina">
      <header className="pagina-cabecera">
        <div>
          <span className="pagina-eyebrow">Equipo</span>
          <h1>Equipo</h1>
          <p className="pagina-descripcion">
            Conoce a las personas que hacen parte de Atenea y consulta sus
            perfiles dentro de la organizacion.
          </p>
        </div>
        <span className="pagina-contador">
          <Users size={16} />
          {usuarios.length} personas
        </span>
      </header>

      <div className="usuarios-grid">
        {usuarios.map((usuario) => (
          <UsuarioCard key={usuario.id} {...usuario} />
        ))}
      </div>
    </div>
  );
}
