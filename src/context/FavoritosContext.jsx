import {createContext, useState, useEffect} from "react";

export const FavoritosContext = createContext();

export function FavoritosProvider({children}){
    const [favoritos, setFavoritos] = useState(()=>{
        const datosGuardados = localStorage.getItem('misFavoritos');
        return datosGuardados ? JSON.parse(datosGuardados) : [];
    });

    useEffect(()=>{
        localStorage.setItem('misFavoritos', JSON.stringify(favoritos));
}, {favoritos}); 

const agregarFavorito = (producto) => {
    const existe = favoritos.find(item => item.id === producto.id);
    if (!existe) {
        setFavoritos([...favoritos, producto]);
    }
};

const vaciarFavoritos = ()=> setFavoritos([]);

    return(
        <FavoritosContext.Provider value={{favoritos, agregarFavorito, vaciarFavoritos}}>
            {children}
        </FavoritosContext.Provider>
    );

}