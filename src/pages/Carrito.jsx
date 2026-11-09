import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { CarritoContext } from '../context/CarritoContext';
import './Tienda.css';

export default function Carrito() {
  const { carrito, cambiarCantidad, eliminarDelCarrito, total } = useContext(CarritoContext);
  if (!carrito.length) return <div className="pagina"><div className="estado-vacio"><ShoppingCart size={36} /><h3>Tu cotización está vacía</h3><p>Explora el catálogo y añade las bicicletas que te interesen.</p><Link className="boton-primario" to="/productos">Explorar bicicletas</Link></div></div>;
  return <div className="pagina carrito-pagina"><header className="pagina-cabecera"><div><span className="pagina-eyebrow">Selección premium</span><h1>Mi cotización</h1><p className="pagina-descripcion">Ajusta las unidades y envía esta selección al asesor comercial.</p></div></header><section className="carrito-lista-tienda">{carrito.map((item) => <article key={item._id} className="carrito-bici"><img src={item.imagen} alt="" /><div><strong>{item.marca}</strong><h2>{item.nombre}</h2><span>${Number(item.precio).toLocaleString('es-CO')}</span></div><div className="control-cantidad"><button onClick={() => cambiarCantidad(item._id, item.cantidad - 1)} aria-label="Disminuir"><Minus size={15} /></button><b>{item.cantidad}</b><button onClick={() => cambiarCantidad(item._id, item.cantidad + 1)} aria-label="Aumentar"><Plus size={15} /></button></div><button className="carrito-eliminar-tienda" onClick={() => eliminarDelCarrito(item._id)}><Trash2 size={17} /> Quitar</button></article>)}</section><section className="total-cotizacion"><span>Total estimado</span><strong>${total.toLocaleString('es-CO')}</strong><a className="boton-primario" href="https://example.com/asesoria-atenea-cycling" target="_blank" rel="noreferrer">Solicitar asesoría</a></section></div>;
}
