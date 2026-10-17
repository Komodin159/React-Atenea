<<<<<<< HEAD
import {useContext} from "react";
import {FavoritosContext} from "../context/FavoritosContext";

export default function ProductoCard({producto}){
    const{agregarFavorito} = useContext(FavoritosContext);
=======
import { useContext } from "react";
import { FavoritosContext } from "../context/FavoritosContext";

export default function ProductoCard({producto}){
    const {agregarFavorito} = useContext(FavoritosContext);
>>>>>>> 5f570b0b1b76b8c54d8553a44c8ea1f061ede717

    return(
        <div style={{border: '1px solid #e2e8f0',
            padding: '15px',
            borderRadius: '10px',
            background: 'white'
        }}>
            <h3>{producto.nombre}</h3>
            <p style={{color: '#2ed573', fontWeight: 'bold'}}>${producto.precio}</p>

            <button
                onClick={()=> agregarFavorito(producto)}
                style={{background: '#3b82f6', color: 'white', border: 'none',
                    padding: '8px 15px', borderRadius: '5px', cursor: 'pointer',
<<<<<<< HEAD
                    widh: '100%'
=======
                    width: '100%'
>>>>>>> 5f570b0b1b76b8c54d8553a44c8ea1f061ede717
                }}
            >
                Agregar a Favoritos
            </button>
        </div>
    );
}