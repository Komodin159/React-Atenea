import mongoose from 'mongoose';

export const TIPOS_CLIENTE = ['Corporativo', 'PYME', 'Persona natural', 'VIP'];
export const ESTADOS_CLIENTE = ['Activo', 'Inactivo'];

const clienteSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    empresa: {
      type: String,
      trim: true,
      default: '',
    },
    nit: {
      type: String,
      trim: true,
      default: '',
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    telefono: {
      type: String,
      trim: true,
      default: '',
    },
    direccion: {
      type: String,
      trim: true,
      default: '',
    },
    ciudad: {
      type: String,
      trim: true,
      default: '',
    },
    tipo: {
      type: String,
      enum: TIPOS_CLIENTE,
      default: 'Persona natural',
    },
    estado: {
      type: String,
      enum: ESTADOS_CLIENTE,
      default: 'Activo',
    },
    notas: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true },
);

const Cliente = mongoose.models.Cliente || mongoose.model('Cliente', clienteSchema);

export default Cliente;
