import { useState } from 'react';

export default function NuevoProductoMongo() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [enviando, setEnviando] = useState(false);

  const API_URL = 'http://localhost:5000/api/productos';

  const manejarEnvio = async (e) => {
    e.preventDefault(); // Evitamos que la página se recargue
    setEnviando(true);

    // 1. Armamos el objeto como lo espera MongoDB
    const nuevoDocumento = {
      nombre: nombre,
      precio: Number(precio)
    };

    try {
      // 2. Usamos fetch con configuración POST
      const respuesta = await fetch(API_URL, {
        method: 'POST', // Cambiamos el verbo
        headers: {
          'Content-Type': 'application/json' // Le decimos al backend "te envío un JSON"
        },
        body: JSON.stringify(nuevoDocumento) // Convertimos el objeto a texto
      });

      if (respuesta.ok) {
        alert('✅ Documento guardado en MongoDB con éxito');
        setNombre(''); // Limpiamos el formulario
        setPrecio('');
      } else {
        alert('❌ Error al guardar en la base de datos');
      }

    } catch (error) {
      console.error("Error de red:", error);
      alert('❌ Servidor apagado o inaccesible');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={manejarEnvio} style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '300px' }}>
      <h3>➕ Nuevo Producto</h3>
      
      <input 
        type="text" 
        placeholder="Nombre del producto" 
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      
      <input 
        type="number" 
        placeholder="Precio" 
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        required
        style={{ display: 'block', width: '100%', marginBottom: '15px', padding: '8px' }}
      />
      
      <button 
        type="submit" 
        disabled={enviando}
        style={{ background: '#3b82f6', color: 'white', padding: '10px', width: '100%', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        {enviando ? 'Guardando en Mongo...' : 'Guardar Producto'}
      </button>
    </form>
  );
}