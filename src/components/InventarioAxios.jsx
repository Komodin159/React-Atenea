import { useState, useEffect } from "react";
import clienteAxios from "../api/clienteAxios";

export default function InventarioAxios(){
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);

    const obtenerProductos = async ()=>{
        try {
            const respuesta = await clienteAxios.get('/productos');
            setProductos(respuesta.data);
        } catch (error) {
            console.error("Error al cargar:", error.response?.data?.mensaje || error.message); 
        } finally {
            setCargando(false);
        }
    }

    useEffect(()=>{
        obtenerProductos();
    }, []);

    const agregarProductoRapido = async () => {
    const nuevo = { nombre: "Cámara Web HD", precio: 85 }; // Objeto JS normal

    try {
      // Pasamos la URL y el objeto. ¡Axios hace el JSON.stringify por nosotros!
      const respuesta = await clienteAxios.post('/productos', nuevo);
      
      // Actualizamos UI
      setProductos([...productos, respuesta.data]);
      alert('✅ Producto agregado con Axios');
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  // --- 3. ELIMINACIÓN (DELETE) OPTIMIZADA ---
  const eliminarProducto = async (idMongo) => {
    try {
      await clienteAxios.delete(`/productos/${idMongo}`);
      // Actualizamos UI filtrando
      setProductos(productos.filter(prod => prod._id !== idMongo));
      alert('🗑️ Eliminado con éxito');
    } catch (error) {
      console.error("Error al borrar:", error);
      alert('❌ No se pudo eliminar');
    }
  };

  // --- RENDERIZADO ---
  if (cargando) return <h3>⏳ Cargando con Axios...</h3>;

  return (
    <div style={{ background: '#f0fdf4', padding: '20px', borderRadius: '8px' }}>
      <h2>🚀 Inventario con Axios</h2>
      
      <button 
        onClick={agregarProductoRapido}
        style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', marginBottom: '15px', cursor: 'pointer' }}
      >
        ➕ Agregar Cámara Web (Test POST)
      </button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {productos.map((prod) => (
          <li key={prod._id} style={{ padding: '10px', background: 'white', marginBottom: '5px', borderRadius: '5px', display: 'flex', justifyContent: 'space-between' }}>
            <span><strong>{prod.nombre}</strong> - ${prod.precio}</span>
            
            <button 
              onClick={() => eliminarProducto(prod._id)}
              style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
            >
              Borrar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
