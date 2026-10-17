<<<<<<< HEAD
import {createContext, useState, useEffect} from "react";
=======
import { createContext, useState, useEffect } from "react";
>>>>>>> 5f570b0b1b76b8c54d8553a44c8ea1f061ede717

export const FavoritosContext = createContext();

export function FavoritosProvider({children}){
    const [favoritos, setFavoritos] = useState(()=>{
        const datosGuardados = localStorage.getItem('misFavoritos');
        return datosGuardados ? JSON.parse(datosGuardados) : [];
    });

    useEffect(()=>{
        localStorage.setItem('misFavoritos', JSON.stringify(favoritos));
<<<<<<< HEAD
}, {favoritos}); 

const agregarFavorito = (producto) => {
    const existe = favoritos.find(item => item.id === producto.id);
    if (!existe) {
        setFavoritos([...favoritos, producto]);
    }
};

const vaciarFavoritos = ()=> setFavoritos([]);
=======
    }, [favoritos]);

    const agregarFavorito = (producto) => {
        const existe = favoritos.find(item => item.id === producto.id);
        if (!existe) {
            setFavoritos([...favoritos, producto]);
        }
    };

    const vaciarFavoritos = ()=> setFavoritos([]);
>>>>>>> 5f570b0b1b76b8c54d8553a44c8ea1f061ede717

    return(
        <FavoritosContext.Provider value={{favoritos, agregarFavorito, vaciarFavoritos}}>
            {children}
        </FavoritosContext.Provider>
    );
<<<<<<< HEAD

=======
>>>>>>> 5f570b0b1b76b8c54d8553a44c8ea1f061ede717
}