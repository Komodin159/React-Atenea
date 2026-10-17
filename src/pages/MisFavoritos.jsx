import { useContext } from 'react';
<<<<<<< HEAD

import { FavoritosContext } from '../context/FavoritosContext';
 
export default function MisFavoritos() {

=======
import { FavoritosContext } from '../context/FavoritosContext';
 
export default function MisFavoritos() {
>>>>>>> 5f570b0b1b76b8c54d8553a44c8ea1f061ede717
  const { favoritos, vaciarFavoritos } = useContext(FavoritosContext);
 
  return (
<div>
<h1>⭐ Mis Favoritos</h1>
<<<<<<< HEAD

      {favoritos.length === 0 ? (
<p>No tienes ningún producto en tu lista.</p>

=======
      {favoritos.length === 0 ? (
<p>No tienes ningún producto en tu lista.</p>
>>>>>>> 5f570b0b1b76b8c54d8553a44c8ea1f061ede717
      ) : (
<>
<button onClick={vaciarFavoritos} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px', borderRadius: '5px', marginBottom: '20px', cursor: 'pointer' }}>
🗑️ Vaciar Lista
</button>
<ul style={{ listStyle: 'none', padding: 0 }}>
<<<<<<< HEAD

=======
>>>>>>> 5f570b0b1b76b8c54d8553a44c8ea1f061ede717
            {favoritos.map((item) => (
<li key={item.id} style={{ background: 'white', padding: '15px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
<strong>{item.nombre}</strong> - ${item.precio}
</li>
<<<<<<< HEAD

            ))}
</ul>
</>

      )}
</div>

  );

}
 
=======
            ))}
</ul>
</>
      )}
</div>
  );
}
>>>>>>> 5f570b0b1b76b8c54d8553a44c8ea1f061ede717
