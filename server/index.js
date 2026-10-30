import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { conectarDB } from './db.js';
import { PORT, JWT_SECRET } from './config.js';
import authRoutes from './routes/auth.routes.js';
import productosRoutes from './routes/productos.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    servicio: 'react-atenea',
    baseDeDatos: mongoose.connection.readyState === 1 ? 'conectada' : 'desconectada',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);

app.use((_req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

app.use((error, _req, res, _next) => {
  console.error('Error no controlado:', error.message);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});

async function iniciar() {
  if (!JWT_SECRET) {
    console.error('Falta la variable JWT_SECRET en el archivo .env');
    process.exitCode = 1;
    return;
  }

  try {
    await conectarDB();
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar el servidor:', error.message);
    process.exitCode = 1;
  }
}

iniciar();
