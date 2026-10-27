import mongoose from 'mongoose';
import { MONGODB_URI } from './config.js';

export async function conectarDB() {
  if (!MONGODB_URI) {
    throw new Error('Falta la variable MONGODB_URI en el archivo .env');
  }

  if (!/^mongodb(\+srv)?:\/\//.test(MONGODB_URI)) {
    throw new Error('MONGODB_URI debe empezar por mongodb:// o mongodb+srv://');
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`Conectado a MongoDB Atlas -> base de datos: ${mongoose.connection.name}`);
    return mongoose.connection;
  } catch (error) {
    console.error('Error al conectar con MongoDB Atlas:', error.message);
    throw error;
  }
}

export default conectarDB;
