import { useState, useEffect } from "react";

export default function InventarioMongo(){
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = 'http://localhost:5000/api/productos';

    const obtenerProductos = async () => {
        try {
            const respuesta = await fetch(API_URL);

            if (!respuesta.ok) {
                throw new Error("Fallo al conectar con el servidor MongoDB");
            }

            const datosMongo = await respuesta.json();
            setProductos(datosMongo);
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    }

    useEffect(()=>{
        obtenerProductos();
    }, []);

    if (cargando) return <h3>Consultando con MongoDB...</h3>;
    if (error) return <h3 style={{color: 'red'}}>{error}</h3>;

    return (
        <div style={{background: '#f8fafc', padding: '20px', borderRadius: '10px'}}>
            <h2>Inventario desde Mongo</h2>
            <ul style={{listStyle: 'none', padding: 0}}>
                {productos.map((prod)=>(
                    <li key={prod.id || prod._id} style={{padding: '15px', 
                    borderBottom: '1px solid #cbd5e1',
                    background: 'white',
                    marginBottom: '10px',
                    borderRadius: '5px'}}>
                        <strong>{prod.nombre || prod.title}</strong>
                        <p style={{margin: '5px 0 0 0', color: '#10b981', fontWeight: 'bold'}}>
                            Precio: ${prod.precio || prod.price}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}