import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
<<<<<<< HEAD
import FavoritosProvider from ''
=======
import { FavoritosProvider } from './context/FavoritosContext.jsx'
>>>>>>> 5f570b0b1b76b8c54d8553a44c8ea1f061ede717

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <FavoritosProvider>
<<<<<<< HEAD

      <BrowserRouter>
        <App />
      </BrowserRouter>
=======
        <BrowserRouter>
          <App />
        </BrowserRouter>
>>>>>>> 5f570b0b1b76b8c54d8553a44c8ea1f061ede717
      </FavoritosProvider>
    </AuthProvider>
  </StrictMode>,
)
