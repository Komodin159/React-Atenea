import mongoose from 'mongoose';
import { conectarDB } from './db.js';

try {
  await conectarDB();
  await mongoose.connection.db.admin().ping();
  console.log('Ping al servidor: OK');
} catch (error) {
  console.error('La prueba de conexión falló:', error.message);
  process.exitCode = 1;
} finally {
  await mongoose.connection.close();
}
