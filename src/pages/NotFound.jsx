import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import './NotFound.css';

export default function NotFound() {
  return (
    <main className="notfound-page">
      <section className="notfound-card">
        <div className="notfound-icono">
          <Compass size={30} />
        </div>
        <span className="notfound-codigo">404</span>
        <h1>Esta pagina se perdio</h1>
        <p>
          La ruta que buscas no existe dentro de Atenea. Regresa al panel para
          seguir trabajando.
        </p>
        <Link to="/" className="boton-primario">
          <ArrowLeft size={17} />
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}
