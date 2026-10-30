import { useEffect, useState } from 'react';
import { Plus, RotateCcw, TrendingUp } from 'lucide-react';
import './Metrica.css';

export default function ContadorGeneral() {
  const [ventas, setVentas] = useState(() => {
    const datoGuardado = localStorage.getItem('ventasDelDia');
    return datoGuardado ? parseInt(datoGuardado, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('ventasDelDia', ventas);
  }, [ventas]);

  const registrarVenta = () => setVentas((actuales) => actuales + 1);

  const reiniciar = () => {
    setVentas(0);
    localStorage.removeItem('ventasDelDia');
  };

  return (
    <section className="tarjeta-metrica">
      <div className="metrica-cabecera">
        <div className="metrica-icono">
          <TrendingUp size={21} />
        </div>
        <div>
          <span className="metrica-etiqueta">Ventas del dia</span>
          <strong className="metrica-valor">{ventas}</strong>
        </div>
      </div>

      <div className="metrica-acciones">
        <button type="button" className="boton-metrica" onClick={registrarVenta}>
          <Plus size={16} />
          Nueva venta
        </button>
        <button
          type="button"
          className="boton-icono"
          onClick={reiniciar}
          aria-label="Reiniciar ventas del dia"
          title="Reiniciar ventas"
        >
          <RotateCcw size={17} />
        </button>
      </div>
    </section>
  );
}
