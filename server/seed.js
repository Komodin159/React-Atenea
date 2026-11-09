// Datos de demostración para Atenea Cycling.
// Ejecutar desde server: npm run seed

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { MONGODB_URI } from './config.js';
import Usuario from './models/Usuario.js';
import Cliente from './models/Cliente.js';
import Producto from './models/Producto.js';

const productosDemo = [
  { nombre: 'Orbea Orca M30i', marca: 'Orbea', categoria: 'Ruta', precio: 15990000, stock: 4, talla: 'S, M, L', materialCuadro: 'Carbono OMX', transmision: 'Shimano 105 Di2 12v', peso: '8.1 kg', imagen: 'https://storage.googleapis.com/c-bikeshop-production-bucket/productimages/ororcam30i/ORORCAM30I2.jpg', descripcion: 'Bicicleta de ruta ligera para ascensos y gran fondo.' },
  { nombre: 'Trek Émonda SL 6', marca: 'Trek', categoria: 'Ruta', precio: 18400000, stock: 3, talla: '50, 52, 54, 56', materialCuadro: 'Carbono OCLV 500', transmision: 'Shimano 105 Di2 12v', peso: '8.2 kg', imagen: 'https://www.mountainmaniacycles.co.uk/content/products/trek-emonda-sl-6-pro-di2_71742638.jpg', descripcion: 'Aeroligera, precisa y diseñada para competir.' },
  { nombre: 'Specialized Tarmac SL7', marca: 'Specialized', categoria: 'Ruta', precio: 24900000, stock: 2, talla: '52, 54, 56', materialCuadro: 'Carbono FACT 10r', transmision: 'SRAM Rival eTap AXS', peso: '7.7 kg', imagen: 'https://roadbikeaction.com/wp-content/uploads/2020/07/TGTP2060_specialized_tarmac_sl7e-scaled.jpg', descripcion: 'Rendimiento de competición en cada kilómetro.' },
  { nombre: 'Canyon Ultimate CF SL', marca: 'Canyon', categoria: 'Ruta', precio: 17200000, stock: 5, talla: 'XS, S, M, L', materialCuadro: 'Carbono CF SL', transmision: 'Shimano Ultegra 12v', peso: '7.9 kg', imagen: 'https://www.canyon.com/dw/image/v2/BCML_PRD/on/demandware.static/-/Sites-canyon-master/default/dw358146ab/images/full/full_2023_/2023/full_2023_ultimate-cf-sl7_3315_P01_P5.png', descripcion: 'Equilibrio ideal entre rigidez, comodidad y velocidad.' },
  { nombre: 'Orbea Occam H30', marca: 'Orbea', categoria: 'MTB', precio: 11800000, stock: 6, talla: 'S, M, L', materialCuadro: 'Aluminio hidroformado', transmision: 'Shimano Deore 12v', peso: '14.2 kg', imagen: 'https://mtbmonster.com/product_images/uploaded_images/orbea-occam-h30-lime-green-new.jpg', descripcion: 'Trail de doble suspensión para explorar cualquier sendero.' },
  { nombre: 'Trek Fuel EX 8', marca: 'Trek', categoria: 'MTB', precio: 19500000, stock: 3, talla: 'M, L, XL', materialCuadro: 'Aluminio Alpha', transmision: 'Shimano XT 12v', peso: '14.0 kg', imagen: 'https://media.trekbikes.com/image/upload/w_1200/FuelEX8XT-24-41327-B-Portrait', descripcion: 'Suspensión activa y geometría moderna de trail.' },
  { nombre: 'Specialized Stumpjumper', marca: 'Specialized', categoria: 'MTB', precio: 21800000, stock: 2, talla: 'S2, S3, S4', materialCuadro: 'Carbono FACT 11m', transmision: 'SRAM GX Eagle', peso: '13.6 kg', imagen: 'https://flowmountainbike.com/wp-content/uploads/2024/09/2025-Specialized-Stumpjumper-15-Pro-YouTube-07371.jpg', descripcion: 'Control total en descensos y eficiencia en ascensos.' },
  { nombre: 'Canyon Neuron CF 8', marca: 'Canyon', categoria: 'MTB', precio: 20900000, stock: 4, talla: 'S, M, L', materialCuadro: 'Carbono CF', transmision: 'Shimano XT 12v', peso: '13.4 kg', imagen: 'https://enduro-mtb.com/wp-content/uploads/2019/10/Canyon-Neuron-Review-Short-Travel-Grouptest-Magazine-211A8481.jpg', descripcion: 'Mountain bike versátil para rutas largas y técnicas.' },
  { nombre: 'Orbea Terra M31e', marca: 'Orbea', categoria: 'Gravel', precio: 14800000, stock: 5, talla: 'S, M, L', materialCuadro: 'Carbono OMR', transmision: 'Shimano GRX 12v', peso: '9.3 kg', imagen: 'https://www.sport-bittl.com/images/product_images/original_images/orbea_terram31eteam_gravelbike_caramel_b_31661737315_20250820.jpg', descripcion: 'Gravel rápida para carretera, caminos y aventura.' },
  { nombre: 'Trek Checkpoint SL 5', marca: 'Trek', categoria: 'Gravel', precio: 17700000, stock: 4, talla: '52, 54, 56', materialCuadro: 'Carbono OCLV 500', transmision: 'Shimano GRX 12v', peso: '9.6 kg', imagen: 'https://thebikecellar.co.uk/content/products/trek-2025-checkpoint-sl-5-axs-gen-3_51337.jpg', descripcion: 'Comodidad de larga distancia con amplio paso de rueda.' },
  { nombre: 'Specialized Turbo Vado 4.0', marca: 'Specialized', categoria: 'Eléctrica', precio: 18900000, stock: 3, talla: 'S, M, L', materialCuadro: 'Aluminio Premium', transmision: 'Shimano Deore 10v', peso: '25.0 kg', imagen: 'https://www.pricerunner.dk/product/3245440871/Specialized-Turbo-Vado-4.0-IGH-Seafoam-Pearl.jpg', descripcion: 'E-bike urbana potente, conectada y elegante.' },
  { nombre: 'Canyon Pathlite:ON 6', marca: 'Canyon', categoria: 'Eléctrica', precio: 16400000, stock: 4, talla: 'S, M, L', materialCuadro: 'Aluminio 6061', transmision: 'Shimano Deore 11v', peso: '23.8 kg', imagen: 'https://urbanbike.news/wp-content/uploads/2024/06/Canyon-Pathlite-ON-SL-6-Test-Review-Design.jpg', descripcion: 'E-bike híbrida para ciudad, viajes y caminos de tierra.' },
];

const clientesDemo = [
  { nombre: 'Jotaro Kujo', empresa: 'Fundación Speedwagon', nit: '901245678-1', email: 'jotaro@atenea.cycling', telefono: '+57 310 456 7890', direccion: 'Cra 43A #1-50', ciudad: 'Medellín', tipo: 'VIP', estado: 'Activo', notas: 'Interesado en una bicicleta de ruta de carbono para gran fondo.', avatar: 'https://upload.wikimedia.org/wikipedia/en/9/9a/JotaroKujo.png' },
  { nombre: 'Dio Brando', empresa: '', nit: '', email: 'dio@atenea.cycling', telefono: '+57 301 222 3344', direccion: 'Cl 10 #43-12', ciudad: 'Medellín', tipo: 'Persona natural', estado: 'Activo', notas: 'Solicitó cotización de MTB doble suspensión.', avatar: 'https://upload.wikimedia.org/wikipedia/en/d/d2/Dio_Brando.jpg' },
  { nombre: 'Giorno Giovanna', empresa: 'Passione Racing', nit: '900876543-2', email: 'giorno@atenea.cycling', telefono: '+57 315 777 8899', direccion: 'Av. 80 #33-21', ciudad: 'Bogotá', tipo: 'Corporativo', estado: 'Activo', notas: 'Convenio para bicicletas corporativas y accesorios.', avatar: 'https://upload.wikimedia.org/wikipedia/en/b/b4/Giorno_Giovanna.png' },
  { nombre: 'Josuke Higashikata', empresa: '', nit: '', email: 'josuke@atenea.cycling', telefono: '+57 320 111 2233', direccion: 'Cl 100 #15-60', ciudad: 'Bogotá', tipo: 'Persona natural', estado: 'Activo', notas: 'Busca gravel para viajes de fin de semana.', avatar: 'https://upload.wikimedia.org/wikipedia/en/d/dc/Jjbagroup.jpg' },
];

async function ejecutar() {
  if (!MONGODB_URI) throw new Error('Falta MONGODB_URI en el archivo .env');
  await mongoose.connect(MONGODB_URI);
  const password = await bcrypt.hash('admin123', 10);
  await Usuario.findOneAndUpdate({ email: 'admin@atenea.com' }, { nombre: 'Administrador Atenea', email: 'admin@atenea.com', password, rol: 'admin' }, { upsert: true, setDefaultsOnInsert: true });
  await Cliente.deleteMany({});
  await Producto.deleteMany({});
  await Cliente.insertMany(clientesDemo);
  await Producto.insertMany(productosDemo);
  console.log(`✅ Atenea Cycling lista: ${productosDemo.length} bicicletas y ${clientesDemo.length} clientes.`);
  await mongoose.disconnect();
}

ejecutar().catch(async (error) => {
  console.error('❌ Error en seed:', error.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
