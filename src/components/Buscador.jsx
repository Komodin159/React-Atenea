import { Search, X } from 'lucide-react';

export default function Buscador({
  valor,
  alCambiar,
  placeholder = 'Buscar...',
}) {
  return (
    <div className="buscador">
      <Search size={18} className="buscador-icono" />
      <input
        type="search"
        value={valor}
        onChange={(evento) => alCambiar(evento.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
      {valor && (
        <button
          type="button"
          className="buscador-limpiar"
          onClick={() => alCambiar('')}
          aria-label="Limpiar busqueda"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
