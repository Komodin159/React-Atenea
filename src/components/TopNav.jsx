import './TopNav.css';
import Buscardor from './Buscardor';
import RelojDigital from './RelojDigital';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
<<<<<<< HEAD
import {Link } from 'react-router-dom';
import {FavoritosContext} from '../context/FavoritosContext';
=======
import { Link } from 'react-router-dom';
import { FavoritosContext } from '../context/FavoritosContext';
>>>>>>> 5f570b0b1b76b8c54d8553a44c8ea1f061ede717

function TopNav() {
    // const usuarioActual = "Juan Perez";
    const { usuario } = useContext(AuthContext);
<<<<<<< HEAD
    const {favoritos} = useContext(FavoritosContext);
=======
    const { favoritos } = useContext(FavoritosContext);
>>>>>>> 5f570b0b1b76b8c54d8553a44c8ea1f061ede717

    return (
        <header className='topnav'>
            <div className='buscador'>
                {/* <input type="text" placeholder='Buscar...' className='input-buscar'/>  */}
                <Buscardor clase="input-buscar"/>
            </div>
            <div className='perfil-usuario'>
<<<<<<< HEAD
                <Link to= "/mis-favoritos" style= {{textDecoration: 'none',
=======
                <Link to="/mis-favoritos" style={{textDecoration: 'none',
>>>>>>> 5f570b0b1b76b8c54d8553a44c8ea1f061ede717
                    background: '#f1f5f9', padding: '8px 15px',
                    borderRadius: '20px', color: '#0f172a', fontWeight: 'bold'
                }}>
                    Favoritos: <span style={{color: '#ef4444'}}>{favoritos.length}</span>
                </Link>
                {usuario.conectado ? (
                    <>
                        <div className='avatar'>{usuario.nombre.charAt(0)}</div>
                        <span className='nombre-usuario'>Hola, {usuario.nombre}</span>
                        <span className='rol-badge' style={{fontSize: '0.8rem', background: '#e2e8f0', padding: '3px', borderRadius: '5px'}}>
                            {usuario.rol}
                        </span>
                    </>
                ) : (
                    <span className='nombre-usuario' style={{ color: 'red' }}>Desconectado</span>
                ) }
            </div>
            {/* <RelojDigital /> */}
        </header>
    );
}

export default TopNav;