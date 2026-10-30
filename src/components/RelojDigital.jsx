import { useState, useEffect } from 'react';
import { Clock3 } from 'lucide-react';
import './Metrica.css';

export default function RelojDigital() {
  const [hora, setHora] = useState(() => new Date());

  useEffect(() => {
    const intervalo = setInterval(() => setHora(new Date()), 1000);
    return () => clearInterval(intervalo);
  }, []);

  const horaFormateada = hora.toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const fechaFormateada = hora.toLocaleDateString('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <section className="tarjeta-metrica tarjeta-reloj">
      <div className="metrica-cabecera">
        <div className="metrica-icono">
          <Clock3 size={21} />
        </div>
        <div>
          <span className="metrica-etiqueta">Hora local</span>
          <strong className="reloj-hora">{horaFormateada}</strong>
        </div>
      </div>
      <p className="reloj-fecha">{fechaFormateada}</p>
    </section>
  );
}
