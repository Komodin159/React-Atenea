import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

export async function conectarDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('Falta la variable MONGODB_URI en el archivo .env');
  }

  try {
    await mongoose.connect(uri);
    console.log(`Conectado a MongoDB Atlas -> base de datos: ${mongoose.connection.name}`);
    return mongoose.connection;
  } catch (error) {
    console.error('Error al conectar con MongoDB Atlas:', error.message);
    throw error;
  }
}

export default conectarDB;
