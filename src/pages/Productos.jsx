<<<<<<< HEAD
import ProductoCard from "../components/ProductoCard";
export default function Productos(){

    const baseProductos = [
        {id: 1, nombre: 'Laptop Pro 15', precio:1200},
        {id: 2, nombre: 'Xbox X Series', precio:1500},
        {id: 3, nombre: 'Pc Gamer Ryzen 7', precio:4500},
        {id: 4, nombre: 'Torre de sonido', precio:1200}
=======
import InventarioAxios from "../components/InventarioAxios";
import InventarioMongo from "../components/InventarioMongo";
import NuevoProductoMongo from "../components/NuevoProductoMongo";
import ProductoCard from "../components/ProductoCard";

export default function Productos(){

    const baseProductos = [
        {id: 1, nombre: 'Laptop Pro 15', precio: 1200},
        {id: 2, nombre: 'Auriculares Inalambricos', precio: 150},
        {id: 3, nombre: 'Teclado Mecanico', precio: 95},
        {id: 4, nombre: 'Monitor 4K', precio: 400}
>>>>>>> 5f570b0b1b76b8c54d8553a44c8ea1f061ede717
    ]

    return(
        <div>
            <h1>Gestion de Productos</h1>
<<<<<<< HEAD
            <div style={{display: 'grid',
                gridTemplateColums: 'repeat(auto-fit), minmax(200px, 1fr',
                gap: '20px'}}>
                {baseProductos.map((prod)=>(
                    <ProductoCard key={prod.id} producto={prod} />
                ))}
=======
            <div style={{display: 'flex', marginTop: '20px', gap: '20px'}}>
                <div>
                    <NuevoProductoMongo />
                </div>
                <div style={{flexGrow: 1}}>
                    <InventarioAxios />
                </div>
>>>>>>> 5f570b0b1b76b8c54d8553a44c8ea1f061ede717
            </div>
        </div>
    );
}