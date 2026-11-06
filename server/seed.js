// Seed script: puebla MongoDB con datos de ejemplo de Atenea Café
// Ejecutar desde la carpeta server con: npm run seed

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { MONGODB_URI } from './config.js';
import Usuario from './models/Usuario.js';
import Cliente from './models/Cliente.js';
import Producto from './models/Producto.js';

if (!MONGODB_URI) {
  console.error('Falta MONGODB_URI en el archivo .env (raíz del proyecto o carpeta server)');
  process.exit(1);
}

const clientesDemo = [
  {
    nombre: 'Valentina Ríos',
    empresa: 'Estudio Nube',
    nit: '901245678-1',
    email: 'valentina.rios@estudionube.co',
    telefono: '+57 310 456 7890',
    direccion: 'Cra 43A #1-50',
    ciudad: 'Medellín',
    tipo: 'Corporativo',
    estado: 'Activo',
    notas: 'Cuenta corporativa con facturación mensual y 20 bebidas de cortesía.',
  },
  {
    nombre: 'Mateo Salazar',
    empresa: '',
    nit: '',
    email: 'mateo.salazar@correo.com',
    telefono: '+57 301 222 3344',
    direccion: 'Cl 10 #43-12',
    ciudad: 'Medellín',
    tipo: 'VIP',
    estado: 'Activo',
    notas: 'Cliente frecuente de la mañana. Prefiere latte de vainilla sin azúcar.',
  },
  {
    nombre: 'Camila Ospina',
    empresa: 'Panadería La Espiga',
    nit: '900876543-2',
    email: 'camila@laespiga.co',
    telefono: '+57 315 777 8899',
    direccion: 'Av. 80 #33-21',
    ciudad: 'Bogotá',
    tipo: 'PYME',
    estado: 'Activo',
    notas: 'Compra repostería al por mayor los martes y jueves.',
  },
  {
    nombre: 'Santiago Herrera',
    empresa: 'Herrera & Asociados',
    nit: '800555444-9',
    email: 'santiago@herreralegal.co',
    telefono: '+57 320 111 2233',
    direccion: 'Cl 100 #15-60',
    ciudad: 'Bogotá',
    tipo: 'Corporativo',
    estado: 'Activo',
    notas: 'Reserva la sala del segundo piso para reuniones cada viernes.',
  },
  {
    nombre: 'Isabella Cardona',
    empresa: '',
    nit: '',
    email: 'isabella.cardona@correo.com',
    telefono: '+57 312 909 1010',
    direccion: 'Cra 68 #26-40',
    ciudad: 'Cali',
    tipo: 'Persona natural',
    estado: 'Inactivo',
    notas: 'No ha realizado pedidos en los últimos tres meses.',
  },
  {
    nombre: 'Andrés Mejía',
    empresa: 'Café & Datos SAS',
    nit: '901777888-4',
    email: 'andres.mejia@cafeydatos.co',
    telefono: '+57 318 654 3210',
    direccion: 'Cl 9 #51-33',
    ciudad: 'Medellín',
    tipo: 'PYME',
    estado: 'Activo',
    notas: 'Pide catering para eventos de tecnología una vez al mes.',
  },
  {
    nombre: 'Daniela Torres',
    empresa: 'Fundación Semilla',
    nit: '900123987-6',
    email: 'daniela.torres@fundacionsemilla.org',
    telefono: '+57 305 888 7766',
    direccion: 'Cra 35 #7-89',
    ciudad: 'Pereira',
    tipo: 'Corporativo',
    estado: 'Activo',
    notas: 'Convenio de descuento del 15% para voluntarios.',
  },
  {
    nombre: 'Sebastián Vargas',
    empresa: '',
    nit: '',
    email: 'sebastian.vargas@correo.com',
    telefono: '+57 300 333 4455',
    direccion: 'Cl 45 #22-10',
    ciudad: 'Barranquilla',
    tipo: 'VIP',
    estado: 'Activo',
    notas: 'Cliente nuevo con tarjeta de fidelidad. Le gusta el cold brew.',
  },
];

const productosDemo = [
  {
    nombre: 'Espresso doble',
    precio: 6500,
    categoria: 'Café caliente',
    stock: 40,
    descripcion: 'Doble shot de espresso con grano de origen Huila.',
  },
  {
    nombre: 'Cappuccino clásico',
    precio: 9500,
    categoria: 'Café caliente',
    stock: 32,
    descripcion: 'Espresso con leche vaporizada y espuma cremosa.',
  },
  {
    nombre: 'Latte de vainilla',
    precio: 10500,
    categoria: 'Café caliente',
    stock: 25,
    descripcion: 'Latte suave con jarabe de vainilla natural.',
  },
  {
    nombre: 'Mocaccino',
    precio: 11500,
    categoria: 'Café caliente',
    stock: 18,
    descripcion: 'Café, chocolate y leche coronado con crema batida.',
  },
  {
    nombre: 'Cold brew',
    precio: 10000,
    categoria: 'Bebidas frías',
    stock: 22,
    descripcion: 'Café extraído en frío durante 16 horas, servido con hielo.',
  },
  {
    nombre: 'Frappé de caramelo',
    precio: 13500,
    categoria: 'Bebidas frías',
    stock: 15,
    descripcion: 'Bebida helada de café con caramelo y crema.',
  },
  {
    nombre: 'Limonada de coco',
    precio: 9000,
    categoria: 'Bebidas frías',
    stock: 28,
    descripcion: 'Limonada natural con crema de coco.',
  },
  {
    nombre: 'Matcha latte helado',
    precio: 12500,
    categoria: 'Bebidas frías',
    stock: 12,
    descripcion: 'Té matcha ceremonial con leche y hielo.',
  },
  {
    nombre: 'Croissant de almendra',
    precio: 7500,
    categoria: 'Repostería',
    stock: 20,
    descripcion: 'Croissant hojaldrado relleno de crema de almendra.',
  },
  {
    nombre: 'Torta de zanahoria',
    precio: 8500,
    categoria: 'Repostería',
    stock: 10,
    descripcion: 'Porción de torta húmeda con frosting de queso crema.',
  },
  {
    nombre: 'Cheesecake de maracuyá',
    precio: 11000,
    categoria: 'Repostería',
    stock: 8,
    descripcion: 'Cheesecake cremoso con coulis de maracuyá.',
  },
  {
    nombre: 'Brownie con helado',
    precio: 12000,
    categoria: 'Repostería',
    stock: 6,
    descripcion: 'Brownie tibio de chocolate con bola de helado de vainilla.',
  },
  {
    nombre: 'Sándwich de pollo',
    precio: 16500,
    categoria: 'Comidas',
    stock: 14,
    descripcion: 'Pan artesanal, pollo desmechado, lechuga y salsa de la casa.',
  },
  {
    nombre: 'Bowl de quinoa',
    precio: 19500,
    categoria: 'Comidas',
    stock: 9,
    descripcion: 'Quinoa, vegetales asados, aguacate y aderezo de limón.',
  },
  {
    nombre: 'Bagel de salmón',
    precio: 21000,
    categoria: 'Comidas',
    stock: 5,
    descripcion: 'Bagel con salmón ahumado, queso crema y alcaparras.',
  },
  {
    nombre: 'Granola con yogur',
    precio: 9500,
    categoria: 'Snacks',
    stock: 16,
    descripcion: 'Yogur griego con granola artesanal y frutos rojos.',
  },
  {
    nombre: 'Galletas de avena',
    precio: 4500,
    categoria: 'Snacks',
    stock: 30,
    descripcion: 'Paquete de tres galletas de avena y chocolate.',
  },
  {
    nombre: 'Barra de chocolate',
    precio: 6000,
    categoria: 'Snacks',
    stock: 24,
    descripcion: 'Barra de chocolate 70% cacao de origen colombiano.',
  },
];

async function ejecutar() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('🟢 Conectado a MongoDB Atlas');

    // Usuario demo para iniciar sesión
    const passwordCifrado = await bcrypt.hash('admin123', 10);
    await Usuario.findOneAndUpdate(
      { email: 'admin@atenea.com' },
      { nombre: 'Administrador Atenea', email: 'admin@atenea.com', password: passwordCifrado, rol: 'admin' },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    console.log('👤 Usuario demo listo -> admin@atenea.com / admin123');

    await Cliente.deleteMany({});
    const clientes = await Cliente.insertMany(clientesDemo);
    console.log(`📝 ${clientes.length} clientes insertados`);

    await Producto.deleteMany({});
    const productos = await Producto.insertMany(productosDemo);
    console.log(`📦 ${productos.length} productos insertados`);

    console.log('✅ Seed completado exitosamente');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en seed:', error.message);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
}

ejecutar();
