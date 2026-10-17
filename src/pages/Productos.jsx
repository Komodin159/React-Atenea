import ProductoCard from "../components/ProductoCard";
export default function Productos(){

    const baseProductos = [
        {id: 1, nombre: 'Laptop Pro 15', precio:1200},
        {id: 2, nombre: 'Xbox X Series', precio:1500},
        {id: 3, nombre: 'Pc Gamer Ryzen 7', precio:4500},
        {id: 4, nombre: 'Torre de sonido', precio:1200}
    ]

    return(
        <div>
            <h1>Gestion de Productos</h1>
            <div style={{display: 'grid',
                gridTemplateColums: 'repeat(auto-fit), minmax(200px, 1fr',
                gap: '20px'}}>
                {baseProductos.map((prod)=>(
                    <ProductoCard key={prod.id} producto={prod} />
                ))}
            </div>
        </div>
    );
}