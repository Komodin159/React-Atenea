// Seed script para poblar MongoDB con datos de ejemplo
// Ejecutar con: node server/seed.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Cliente from './models/Usuario.js';
import Producto from './models/Producto.js';

dotenv.config();

// Validar MONGODB_URI
if (!process.env.MONGODB_URI) {
  console.error('Falta MONGODB_URI en .env');
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('🟢 Conectado a MongoDB Atlas');

    // 1. Limpiar datos existentes
    await Cliente.deleteMany({});
    await Producto.deleteMany({});

    // 2. Insertar clientes de ejemplo (estructura de ingeniería/empresarial)
    const clientes = await Cliente.insertMany([
      {
        nombre: 'Carlos Rodríguez',
        email: 'carlos.r@ingenieria.com',
        password: '123456',
        empresa: 'InTech Soluciones',
        telefono: '+57 300 123 4567',
        direccion: 'Calle 45 #12-34, Medellín',
        rol_empresa: 'propietario',
        nit: '900123456-7',
        activo: true,
      },
      {
        nombre: 'María Pérez',
        email: 'maria.p@diseno.com',
        password: '123456',
        empresa: 'Diseño Creativo',
        telefono: '+57 300 987 6543',
        direccion: 'Carrera 10 #5-12, Bogotá',
        rol_empresa: 'gerente',
        nit: '900987654-3',
        activo: true,
      },
      {
        nombre: 'Juan Camilo Gómez',
        email: 'juan.g@analitica.com',
        password: '123456',
        empresa: 'DataStream',
        telefono: '+57 300 555 7890',
        direccion: 'Cl 86 #15-20, Cali',
        rol_empresa: 'analista',
        nit: '800111222-3',
        activo: true,
      },
      {
        nombre: 'Andrea López',
        email: 'andrea.l@desarrollo.com',
        password: '123456',
        empresa: 'SoftCode',
        telefono: '+57 300 444 3332',
        direccion: 'Av. 68 #10-15, Bogotá',
        rol_empresa: 'desarrollador',
        nit: '900333444-5',
        activo: false,
      },
      {
        nombre: 'Roberto Silva',
        email: 'roberto.s@administracion.com',
        password: '123456',
        empresa: 'Grupo Administrator',
        telefono: '+57 300 222 1110',
        direccion: 'Cra 7 #23-45, Barranquilla',
        rol_empresa: 'gerente',
        nit: '900555666-7',
        activo: true,
      },
    ]);

    console.log(`📝 ${clientes.length} clientes insertados`);

    // 3. Insertar productos con campos de ingeniería
    const productos = await Producto.insertMany([
      {
        nombre: 'Licencia Software Enterprise',
        precio: 1250000,
        categoria: 'software',
        stock: 15,
        descripcion: 'Licencia anual para 50 usuarios con soporte técnico',
      },
      {
        nombre: 'Servidor Dell PowerEdge',
        precio: 8500000,
        categoria: 'hardware',
        stock: 3,
        descripcion: 'Servidor rack 2U con 2 procesadores Intel Xeon',
      },
      {
        nombre: 'Licencia Office 365',
        precio: 280000,
        categoria: 'software',
        stock: 50,
        descripcion: 'Paquete Office por usuario al mes',
      },
      {
        nombre: 'Soporte Técnico Anual',
        precio: 450000,
        categoria: 'servicio',
        stock: 999,
        descripcion: 'Soporte ilimitado para hasta 10 equipos',
      },
      {
        nombre: 'Notebook HP EliteBook',
        precio: 3200000,
        categoria: 'hardware',
        stock: 8,
        descripcion: 'Notebook 15.6" i7, 16GB RAM, 512GB SSD',
      },
      {
        nombre: 'Consultoría IT',
        precio: 5500000,
        categoria: 'servicio',
        stock: 1,
        descripcion: 'Diagnóstico y optimización de infraestructura',
      },
      {
        nombre: 'Disco Duro 4TB SSD',
        precio: 1100000,
        categoria: 'hardware',
        stock: 12,
        descripcion: 'Unidad de estado sólido NVMe 4TB',
      },
      {
        nombre: 'Migración a Cloud',
        precio: 3800000,
        categoria: 'servicio',
        stock: 1,
        descripcion: 'Migración de datos on-premise a AWS/Azure',
      },
    ]);

    console.log(`📦 ${productos.length} productos insertados`);
    console.log('✅ Seed completado exitosamente');

    // Cerrar conexión
    mongoose.connection.close();
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Error en seed:', err.message);
    process.exit(1);
  });